import React, {Component} from "react";
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';
import PubSub from 'pubsub-js';
import array from '../../../service/Array';
import _ from 'lodash';

class SubGrade extends Component {

    constructor(props) {
        super(props);
        this.array = new array();
        this.state =
        {
            open: true,
            courses: '',
            subGrade: this.fncControlSubGrade(props.subGrade),
            errorText: {description:'', courses:''}
        };
    };

    componentDidMount()
    {
        this.fncListCourses();
    }

    fncControlSubGrade = (subGrade) =>
    {
        const noData = {description: '', courses:[]};
        const withData = subGrade;

        if(subGrade === undefined)
        {
            return noData;
        }
        return withData;
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

    fncHandleClose = () =>
    {
        PubSub.publish('show-sub-grade', false);
        this.setState({'open': false});
    };

    fncHandleSave = () =>
    {
        if(this.isValidationFields())
        {
            PubSub.publish('sub-grade',this.state.subGrade);
            PubSub.publish('show-sub-grade', false);
            this.setState({'open': false});
        }
    };

    setData = (event, value, attribute) =>
    {
        let subGrade = this.state.subGrade;
        subGrade[attribute] = value;
        this.setState({'subGrade':subGrade});
    };

    fncHandleCheck = (event, attribute) =>
    {
        let subGrade = this.state.subGrade;
        let value = event.target.id;
        subGrade[attribute] = this.array.control(subGrade.courses, value);
        this.setState({'subGrade':subGrade});
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

        this.state.subGrade.courses.length === 0 ?
            (errors.courses = errorCourses) : (errors.courses = '');

        this.setState({'errorsText': errors});

        if(errors.description === '' && errors.courses === '')
        {
            return true;
        }
        return false;

    };

    fncValidChecked = (value) =>
    {
        const courses = this.state.subGrade.courses;
        let found = _.find(courses, (item)=> { return item === value });

        if(found !== null && found !== undefined)
        {
            return true;
        }
        return false;
    };

    actions = [
        <FlatButton
            label="Cancelar"
            primary={true}
            onTouchTap={this.fncHandleClose}
        />,
        <RaisedButton
            label="Salvar"
            backgroundColor="#0ac752"
            labelStyle={{color: 'white'}}
            onTouchTap={this.fncHandleSave}
            style={{float: 'right', marginRight: '10px'}}/>
    ];

    render() {
        return (
            <Dialog
                title="Adicionando sub categotia"
                autoScrollBodyContent={true}
                actions={this.actions}
                modal={true}
                style={{margin:'0'}}
                titleStyle={{padding:'15px'}}
                contentStyle={{width: '80%', maxWidth: 'none', marginTop:'-40px'}}
                open={this.state.open}>

                <TextField
                    id="grade"
                    hintText="Nome da sub categoria"
                    floatingLabelText="Nome da sub categoria"
                    fullWidth={true}
                    errorText={this.state.errorText.description}
                    value={this.state.subGrade.description}
                    ref={(input) => { this.description = input; }}
                    onChange={(event, value) =>  this.setData(event, value, 'description')}
                />
                <h3 className="title" style={{marginBottom: '0px', color:'#000'}}>Cursos</h3>
                <h5 style={{color:'#f44335', fontFamily: 'Roboto', fontWeight: '500', marginTop:'0%'}}>{this.state.errorText.courses}</h5>
                <div style={{overflow: 'auto', height: '200px'}}>
                    {this.state.courses}
                </div>
                <br/>

            </Dialog>

        );
    }
}

export default SubGrade;