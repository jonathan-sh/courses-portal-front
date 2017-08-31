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

class Grade extends Component
{

    constructor()
    {
        super();
        this.httpService = new httpService();
        this.array = new array();
        this.state =
        {
            open: true,
            showSubGrade: false,
            provider: JSON.parse(localStorage.getItem('provider')),
            grade: {description:'', courses:[], subGrades: []},
            subGrades:'',
            errorText: {description:'', courses:''}
        };

    };

    componentDidMount()
    {
        PubSub.subscribe('sub-grade', this.fncListSubGrade);
        PubSub.subscribe('show-sub-grade', this.fncControlSubGrade);
    }

    fncControlSubGrade = (topic, showSubGrade) =>
    {
        this.setState({'showSubGrade':showSubGrade});
    };

    fncListSubGrade = (topic, subGrade) =>
    {
        this.state.grade.subGrades.push(subGrade);

        let subGrades = this.state.grade.subGrades.map((subGrade, index) =>
            <RaisedButton
                key={index += 1}
                label={subGrade.description}
                fullWidth={true}
                backgroundColor="#2dc7a2"
                labelStyle={{color: '#FFF'}}
                style={{marginTop: '10px'}}
            />
        );
        this.setState({'subGrades':subGrades});
    };

    isValidationFields = () =>
    {
        const errorDescription = 'Informe a descrição';
        const errorCourses = 'Informe pelo menos um curso';
        let errors =
            {
                description:'',
                courses:'',
            };

        this.setState({'errorText':errors});

        this.description.input.value === '' ?
            (errors.description = errorDescription) : (errors.description = '');

        this.state.grade.courses.length === 0 ?
            (errors.courses = errorCourses) : (errors.courses = '');

        this.setState({'errorsText': errors});

        if(errors.description === '' && errors.courses === '')
        {
            return true;
        }
        return false;

    };

    fncHandleClose = () =>
    {
        localStorage.removeItem('sub-grade');
        this.setState({open: false});
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
        this.setState({"provider":response});
        localStorage.setItem('provider', JSON.stringify(response));
        PubSub.publish('new-grade', this.state.provider);
        console.log('Success');
    };

    fncHandleSave = () =>
    {
        if(this.isValidationFields())
        {
            localStorage.removeItem('sub-grade');
            this.state.provider.grades.push(this.state.grade);
            this.makeUpdateProvider();
            this.setState({open: false});
        }
    };

    fncShowSubGrade = () => this.setState({showSubGrade: true});

    setData = (event, value, attribute) =>
    {
        let grade = this.state.grade;
        grade[attribute] = value;
        this.setState({'grade':grade});
    };

    fncHandleCheck = (event) =>
    {
        let courses = this.state.grade.courses;
        let value = event.target.id;
        courses = this.array.control(courses, value);
        this.setState(courses);
    };

    courses = JSON.parse(localStorage.getItem('courses'));
    course = this.courses.map((course) =>
        <Checkbox id={course._id} key={course.id} label={course.name} onCheck={this.fncHandleCheck.bind(this)}/>
    );

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
                    onChange={(event, value) => this.setData(event, value, 'description')}/>
                <h4 className="title" style={{marginBottom: '0px'}}>Cursos</h4>
                <h5 style={{color:'#f44335', fontFamily: 'Roboto', fontWeight: '500', marginTop:'0%'}}>{this.state.errorText.courses}</h5>
                <div style={{overflow: 'auto', height: '100px'}}>
                    {this.course}
                </div>
                <br/>
                {this.state.subGrades}
                <RaisedButton
                    onTouchTap={() => this.fncShowSubGrade()}
                    label="adicinar sub categoria"
                    backgroundColor="#0ac752"
                    labelStyle={{color: 'white'}}
                    style={{float: 'right', margin: '20px 0 20px 20px'}} />
                <br/>

                {this.state.showSubGrade ? <SubGrade/>  : null}

            </Dialog>

        );
    };
}

export default Grade;