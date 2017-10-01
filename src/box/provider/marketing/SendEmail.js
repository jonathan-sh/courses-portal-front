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

class SendEmail extends Component {

    constructor(props) {
        super(props);
        this.httpService = new httpService();
        this.state = {
            email:{subject:"",html:"",text:"",destinations:[]},
            open: true,
            makeSend:false};

    }

    componentWillMount(){
        this.fncFillInformation();
    }

    fncSetData = (event, value, attribute) =>
    {
        let email = this.state.course;
        email[attribute] = value;
        this.setState(email);
    };


    fncHandleClose = () =>  {this.setState({open: false}); };

    fncSendEmail = () =>  {alert("Enviando..."); };

    render()
    {

        let actions = [
            <FlatButton
                label="Cancelar"
                primary={true}
                onTouchTap={this.fncHandleClose}
            />,
            <RaisedButton
                label={'Enviar'}
                backgroundColor="#0ac752"
                labelStyle={{color: 'white'}}
                onTouchTap={()=>this.fncSendEmail()}
                style={{float: 'right', marginRight: '10px'}}/>
            ,
        ];

        return (
            <div>
                <Dialog
                    title='Enviando email'
                    actions={actions}
                    modal={true}
                    contentStyle={{width: '80%', maxWidth: 'none'}}
                    open={this.state.open}>
                    {this.state.makeSend?  <LinearProgress mode="indeterminate" /> : null}

                    <TextField
                        hintText="Informe o assunto do email"
                        floatingLabelText="Assundo"
                        type="text"
                        disabled={this.state.makeSend}
                        fullWidth={true}
                        ref={(input) => this.subject = input}
                        onChange={ (event, value) =>  this.fncSetData(event, value, 'subject')}
                        value= {this.state.email.subject}/>
                    <TextField
                        hintText="Informe o corpo do email (caso o html não carregue)"
                        floatingLabelText="Texto"
                        type="text"
                        disabled={this.state.makeSend}
                        fullWidth={true}
                        ref={(input) => this.text = input}
                        onChange={ (event, value) =>  this.setData(event, value, 'text')}
                        value= {this.state.email.text}/>
                    <TextField
                        hintText="Informe o html do email"
                        floatingLabelText="HTML"
                        type="text"
                        disabled={this.state.makeSend}
                        fullWidth={true}
                        ref={(input) => this.html = input}
                        onChange={ (event, value) =>  this.setData(event, value, 'html')}
                        value= {this.state.email.html}/>

                </Dialog>

            </div>
        );
    }
}

export default SendEmail;