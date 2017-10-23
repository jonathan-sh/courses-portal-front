import React, {Component} from "react";
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import httpService from '../../../service/HttpService';
import RaisedButton from 'material-ui/RaisedButton';
import _ from 'lodash';
import PubSub from 'pubsub-js';
import LinearProgress from 'material-ui/LinearProgress';
import Toggle from 'material-ui/Toggle';

class Information extends Component {

    constructor(props) {
        super(props);
        this.httpService = new httpService();
        this.state = {
            open: true,
            isUpdate: false,
            makeSave:false,
            errorText: {name: '',
                        description: '',
                        objective: '',
                        price: '',
                        hours: ''},
            course:{_id:null,
                    name:'',
                    description:'',
                    objective:'',
                    price:'',
                    hours:'',
                    status:false}};

    }

    componentWillMount(){
       this.fncFillInformation();
    }

    fncFillInformation =()=>{
        if (this.props.course !== undefined){
            this.setState({'course':this.props.course,'isUpdate':true});
        }
    };

    fncHandleClose = () =>  {
       if(!this.state.isUpdate){ PubSub.publish('switch-to-crud', false);}
        this.setState({open: false});
    };

    makeSave = () => {
        if (this.fncValidData())
        {
           this.setState({makeSave: true});

           this.httpService.post('/course',this.fncGetDataCourse(),localStorage.getItem('auth-token'))
               .then(response => {
                   if (response.status !== 501 )
                   {
                       return response.json();
                   }
                   throw new Error('Falha de autenticação.');
               })
               .then(success => {
                   PubSub.publish('switch-to-crud', false);
                   PubSub.publish('search-courses');
                   this.setState({crud: true, open: false});
               })
               .catch(error => {this.setState({msg:error.message});});
        }
    };

    makeUpdate = () => {
        if (this.fncValidData())
        {
            this.setState({makeSave: true});

            this.httpService.put('/course',this.state.course,localStorage.getItem('auth-token'))
                .then(response => {
                    if (response.status !== 501 )
                    {
                        return response.json();
                    }
                    throw new Error('Falha de autenticação.');
                })
                .then(success => {
                    this.setState({open: false});
                    PubSub.publish('switch-to-crud',false);
                    PubSub.publish('switch-to-crud',success);

                })
                .catch(error => {this.setState({msg:error.message});});
        }
    };

    fncGetDataCourse = () => {
        let course = { name: this.name.input.value,
                       description: this.description.input.value,
                       objective: this.objective.input.value,
                       price: this.price.input.value,
                       hours: this.hours.input.value,
                       status:this.state.course.status};
        return course;
    };

    fncValidData = () => {
        let status = true;
        let course = this.fncGetDataCourse();

        let errorText = {name: '',
                         description: '',
                         objective: '',
                         price: '',
                         hours: '' };

        this.setState({'errorText': errorText});

        _.forEach(course, (value, key) => {
            if (!this.fncValidValue(value)) {
                status = false;
                errorText[key] = 'Informe este campo';
            }
        });

        this.setState({'errorText': errorText});

        return status;

    };

    fncValidValue = (value) => { return value !== undefined && value !== ""};

    setData = (event, value, attribute) =>
    {
        let course = this.state.course;
        course[attribute] = value;
        this.setState(course);
    };

    isValid = (obj)=>{
        return obj!==undefined && obj !==null;
    };

    handleChange = () => {
        let course = this.state.course;
        course['status'] = !this.state.course.status;
        this.setState(course);
    };

    render()
    {

       let actions = [
            <FlatButton
                label="Cancelar"
                primary={true}
                onTouchTap={this.fncHandleClose}
            />,
            <RaisedButton
                label={(this.isValid(this.state.course._id))?'Atualizar':'Salvar'}
                backgroundColor="#0ac752"
                labelStyle={{color: 'white'}}
                onTouchTap={(this.isValid(this.state.course._id))?this.makeUpdate:this.makeSave}
                style={{float: 'right', marginRight: '10px'}}/>
            ,
        ];

        return (
            <div>
                <Dialog
                    title='Informações básicas do curso'
                    actions={actions}
                    modal={true}
                    contentStyle={{width: '80%', maxWidth: 'none'}}
                    open={this.state.open}>
                    {this.state.makeSave?  <LinearProgress mode="indeterminate" /> : null}

                    <Toggle
                        label="Ativo (visivel na plataforma)"
                        defaultToggled={this.state.course.status}
                        onToggle={this.handleChange}
                        labelPosition="right"/>
                    <TextField
                        hintText="Nome do curso"
                        floatingLabelText="Nome"
                        type="text"
                        disabled={this.state.makeSave}
                        errorText={this.state.errorText.name}
                        fullWidth={true}
                        ref={(input) => this.name = input}
                        onChange={ (event, value) =>  this.setData(event, value, 'name')}
                        value= {this.state.course.name}/>
                    <TextField
                        hintText="Informe a descrição do curso"
                        floatingLabelText="Descrição"
                        type="text"
                        disabled={this.state.makeSave}
                        errorText={this.state.errorText.description}
                        fullWidth={true}
                        ref={(input) => this.description = input}
                        onChange={ (event, value) =>  this.setData(event, value, 'description')}
                        value= {this.state.course.description}/>
                    <TextField
                        hintText="Informe o objetivo do curso"
                        floatingLabelText="Objetivo"
                        type="text"
                        disabled={this.state.makeSave}
                        errorText={this.state.errorText.objective}
                        fullWidth={true}
                        ref={(input) => this.objective = input}
                        onChange={ (event, value) =>  this.setData(event, value, 'objective')}
                        value= {this.state.course.objective}/>
                    <TextField
                        hintText="Informe o preço do curso. Exemplo de mil reais (1000.00)"
                        floatingLabelText="Preço"
                        type="number"
                        disabled={this.state.makeSave}
                        errorText={this.state.errorText.price}
                        style={{width: '49%', float: 'left'}}
                        ref={(input) => this.price = input}
                        onChange={ (event, value) =>  this.setData(event, value, 'price')}
                        value= {this.state.course.price}>
                    </TextField>
                    <TextField
                        hintText="Informe a carga horária do curso"
                        floatingLabelText="Carga hora"
                        type="number"
                        disabled={this.state.makeSave}
                        errorText={this.state.errorText.hours}
                        style={{width: '49%', float: 'right'}}
                        ref={(input) => this.hours = input}
                        value= {this.state.course.hours}
                        onChange={ (event, value) =>  this.setData(event, value, 'hours')}>
                    </TextField>

                </Dialog>

            </div>
        );
    }
}

export default Information;