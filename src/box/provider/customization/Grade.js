import React, {Component} from "react";
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';
import SubGrade from './SubGrade';
import PubSub from 'pubsub-js';
import array from '../../../service/Array';
import providerService from '../../../service/repository/ProviderService';
import _ from 'lodash';
import DeleteIco from 'material-ui/svg-icons/content/delete-sweep';
import NewIco from 'material-ui/svg-icons/content/add';

class Grade extends Component
{
    constructor(props)
    {
        super(props);
        this.array = new array();
        this.state =
        {
            open: true,
            showSubGrade: false,
            provider: JSON.parse(localStorage.getItem('provider')),
            grade: this.fncControlGrade(props.grade),
            indexGrade: props.index,
            indexSubGrade:'',
            whatSubGrade:'',
            subGrades:'',
            courses:'',
            errorText: {description:''},
            isUpdate: this.isUpdate(props)
        };
    };

    componentDidMount()
    {
        PubSub.subscribe('sub-grade', this.fncListSubGrade);
        PubSub.subscribe('show-sub-grade', this.fncControlSubGrade);
        this.fncListSubGrade();
        this.fncListCourses();
    };

    isUpdate = (data) =>
    {
        if(data.index !== undefined)
        {
            return true;
        }
        return false;
    };

    fncControlGrade = (grade) =>
    {
        const noData = {description: '', courses:[], subGrades:[]};
        const withData = grade;

        if(grade === undefined)
        {
            return noData;
        }
        return withData;
    };

    fncControlSubGrade = (topic, showSubGrade) =>
    {
        this.setState({'showSubGrade':showSubGrade});
    };

    fncListSubGrade = (topic, subGrade) =>
    {
        if(subGrade !== undefined)
        {
            let grade = this.state.grade;
            if(this.state.indexSubGrade === undefined)
            {
                grade.subGrades.push(subGrade);
                PubSub.publish('show-message', 'Sub categoria ' + subGrade.description + ' adicionada com sucesso!');
            }
            else
            {
                if(this.state.indexSubGrade !== "")
                {
                    grade.subGrades[this.state.indexSubGrade] = subGrade;
                    PubSub.publish('show-message', 'Sub categoria ' + subGrade.description + ' alterada com sucesso!')
                }
            }

            this.setState({'grade': grade});
        }

        if (this.state.grade.subGrades !== null)
        {
            let subGrades = this.state.grade.subGrades.map((subGrade, index) =>
            <div key={index} style={{textAlign: 'center'}}>
                <RaisedButton
                    label={subGrade.description}
                    backgroundColor="#2dc7a2"
                    labelStyle={{color: '#FFF'}}
                    style={{marginTop: '10px',  width: '80%'}}
                    onTouchTap = {(object, position) => this.fncShowSubGrade(subGrade, index)}
                />
                <RaisedButton
                    label="delete"
                    backgroundColor="#ff2930"
                    icon={<DeleteIco color="#FFF"/>}
                    style={{marginLeft: '1%', width: '19%'}}
                    labelStyle={{color: 'white'}}
                    onTouchTap = {(position, attribute, object) => this.fncDeleteSubGrade(index, 'subGrades', subGrade)}
                />
            </div>
            );
            this.setState({'subGrades':subGrades});
        }
    };

    fncListCourses = () =>
    {
        const courses = JSON.parse(localStorage.getItem('courses'));
        if(courses !== null && courses !== undefined)
        {
            const components = courses.map((course) =>
                <Checkbox
                    key={course.id}
                    id={course._id}
                    label={course.name}
                    defaultChecked={this.fncValidChecked(course._id)}
                    onCheck={(event, attribute) => this.fncHandleCheck(event, 'courses')}
                />
            );

            this.setState({'courses': components});
        }
    };

    isValidationFields = () =>
    {
        const errorDescription = 'Informe a descrição';
        let errors =
        {
            description:''
        };

        this.setState({'errorText':errors});

        this.description.input.value === '' ?
            (errors.description = errorDescription) : (errors.description = '');

        this.setState({'errorsText': errors});

        if(errors.description === '')
        {
            return true;
        }
        return false;

    };

    fncHandleClose = () =>
    {
        localStorage.removeItem('sub-grade');
        PubSub.publish('show-grade', {showGrade: false, message: null});
        PubSub.publish('list-grade', null);
        this.setState({'open': false});
    };

    makeUpdateProvider = (message) =>
    {
        providerService
            .update(this.state.provider)
            .then(success =>this.responseUpdate(success, message))
            .catch(error => PubSub.publish('show-message', error));

    };

    responseUpdate = (response, message) =>
    {
        response.password = null;
        this.setState({'provider':response});
        localStorage.setItem('provider', JSON.stringify(response));
        PubSub.publish('show-grade', {'showGrade': false, 'message': message});
        PubSub.publish('list-grade', this.state.provider);
        this.setState({'open': false});
    };

    fncHandleSave = () =>
    {
        if(this.isValidationFields())
        {
            let provider = this.state.provider;
            let grade = this.state.grade;
            let message = '';

            if(!this.state.isUpdate)
            {
                localStorage.removeItem('sub-grade');
                message = 'Grade ' + grade.description + ' adicionada com sucesso!';
                provider.grades.push(grade);
                this.makeUpdateProvider(message);
            }
            else
            {
                localStorage.removeItem('sub-grade');
                message = 'Grade ' + grade.description + ' alterada com sucesso!';
                provider.grades[this.state.indexGrade] = grade;
                this.makeUpdateProvider(message);
            }
        }
    };

    fncShowSubGrade = (object, position) =>
    {
        this.setState({'whatSubGrade': object});
        this.setState({'indexSubGrade': position});
        this.setState({'showSubGrade': true});
    };

    setData = (event, value, attribute) =>
    {
        let grade = this.state.grade;
        grade[attribute] = value;
        this.setState({'grade':grade});
    };

    fncHandleCheck = (event, attribute) =>
    {
        let grade = this.state.grade;
        let value = event.target.id;
        grade[attribute] = this.array.control(grade.courses, value);
        this.setState({'grade':grade});
    };

    fncValidChecked = (value) =>
    {
        const courses = this.state.grade.courses;
        let found = _.find(courses, (item)=> { return item === value });

        if(found !== null && found !== undefined)
        {
            return true;
        }
        return false;
    };

    fncDeleteSubGrade = (index, attribute, subGrade) =>
    {
        let grade = this.state.grade;
        PubSub.publish('show-message', 'Sub categoria ' + subGrade.description + ' deletada com sucesso!');
        grade[attribute].splice(index, 1);
        this.setState({'grade': grade, 'indexSubGrade': ''});
        PubSub.publish('sub-grade', null);
    };

    titleActionGrade()
    {
        if(!this.state.isUpdate)
        {
            return "Adicionando categoria";
        }
        return "Alterando categoria";
    };

    actions = [
        <FlatButton
            label="Cancelar"
            primary={true}
            onTouchTap={this.fncHandleClose} />,
        <RaisedButton
            label="Salvar"
            backgroundColor="#0ac752"
            labelStyle={{color: 'white'}}
            onTouchTap={this.fncHandleSave}
            style={{float: 'right', marginRight: '10px'}} />
    ];

    render() {
        return (
            <Dialog
                title={this.titleActionGrade()}
                autoScrollBodyContent={true}
                actions={this.actions}
                modal={true}
                style={{margin:'0'}}
                titleStyle={{padding:'15px'}}
                contentStyle={{width: '80%', maxWidth: 'none', marginTop:'-40px'}}
                open={this.state.open}>

                <TextField
                    id="grade"
                    hintText="Nome da categoria"
                    floatingLabelText="Nome da categoria"
                    fullWidth={true}
                    errorText={this.state.errorText.description}
                    ref={(input) => { this.description = input; }}
                    onChange={(event, value) => this.setData(event, value, 'description')}
                    value={this.state.grade.description}
                />
                <h3 className="title" style={{marginBottom: '0px', color:'#000'}}>Cursos</h3>
                <div style={{overflow: 'auto', height: '100px'}}>
                    {this.state.courses}
                </div>
                <br/>
                {this.state.subGrades}
                <RaisedButton
                    onTouchTap={() => this.fncShowSubGrade()}
                    label="adicinar sub categoria"
                    backgroundColor="#0ac752"
                    icon={<NewIco color="#FFF"/>}
                    labelStyle={{color: 'white'}}
                    style={{float: 'right', margin: '20px 0 20px 20px', width: '19%'}} />
                <br/>

                {this.state.showSubGrade ? <SubGrade subGrade={this.state.whatSubGrade}/>  : null}

            </Dialog>

        );
    };
}

export default Grade;