import React, {Component} from "react";
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';
import SubGrade from './SubGrade';
import PubSub from 'pubsub-js';
import array from '../../../service/Array';
import httpService from './../../../service/HttpService';
import _ from 'lodash';
import DeleteIco from 'material-ui/svg-icons/content/delete-sweep';
import NewIco from 'material-ui/svg-icons/content/add';

class Grade extends Component
{
    constructor(props)
    {
        super(props);
        this.httpService = new httpService();
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
            }
            else
            {
                grade.subGrades[this.state.indexSubGrade] = subGrade;
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
                    style={{marginTop: '10px',  width: '87%'}}
                    onTouchTap = {(object, position) => this.fncShowSubGrade(subGrade, index)}
                />
                <RaisedButton
                    label="delete"
                    backgroundColor="#ff2930"
                    icon={<DeleteIco color="#FFF"/>}
                    style={{marginLeft:'0.7%'}}
                    labelStyle={{color: 'white'}}
                    onTouchTap = {(position, attribute) => this.fncDeleteGrade(index, 'subGrades')}
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
        this.setState({'open': false});
    };

    makeUpdateProvider = () =>
    {
        this.httpService.put('/provider', this.state.provider, localStorage.getItem('auth-token'))
            .then(response => {
                if (response.status !== 501 )
                {
                    return response.json();
                }
                throw new Error('Falha de autenticação.');
            })
            .then(success => {
                this.responseUpdate(success);
            })
            .catch(error => { console.log(error);});

    };

    responseUpdate = (response) =>
    {
        response.password = null;
        this.setState({'provider':response});
        localStorage.setItem('provider', JSON.stringify(response));
        PubSub.publish('list-grade', this.state.provider);
    };

    fncHandleSave = () =>
    {
        if(this.isValidationFields())
        {
            let provider = this.state.provider;
            let grade = this.state.grade;

            if(!this.state.isUpdate)
            {
                localStorage.removeItem('sub-grade');
                provider.grades.push(grade);
                this.makeUpdateProvider();
                PubSub.publish('show-grade', {'showGrade': false, 'message': 'Grade ' + grade.description + ' adicionada com sucesso!'});
                this.setState({'open': false});
            }
            else
            {
                localStorage.removeItem('sub-grade');
                provider.grades[this.state.indexGrade] = grade;
                this.makeUpdateProvider();
                PubSub.publish('show-grade', {'showGrade': false, 'message': 'Grade ' + grade.description + ' alterada com sucesso!'});
                this.setState({'open': false});
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

    fncDeleteGrade = (index, attribute) =>
    {
        let grade = this.state.grade;
        grade[attribute].splice(index, 1);
        this.setState({'grade': grade});
        PubSub.publish('sub-grade', grade.subGrades);
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
                title="Adicionando categotia"
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
                    style={{float: 'right', margin: '20px 0 20px 20px'}} />
                <br/>

                {this.state.showSubGrade ? <SubGrade subGrade={this.state.whatSubGrade}/>  : null}

            </Dialog>

        );
    };
}

export default Grade;