import React, {Component} from 'react';
import './../../../style/font/font-awesome-4.7.0/css/font-awesome.min.css';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import PubSub from 'pubsub-js';
import Toggle from 'material-ui/Toggle';
import httpService from '../../../service/HttpService';

export default class ForgotPassword extends Component {


    constructor() {
        super();
        this.state = {open: true, isProvider : false, entity:'student', getResponse:false, title:'Esqueci minha senha'};
        this.httpService = new httpService();
    };



    makeRequest = (event) => {
        event.preventDefault();
        this.httpService.post('/forgot-password', this.makeDataForForgotPassword())
            .then(response => {
                if (response.status === 200 )
                {
                    return response.json();
                }
                this.setState({title:'Solicitação negada',
                               getResponse:true,
                               responseMsg:'Sua conta não foi localizada.'});

            })
            .then(success => {
                console.log(success);
                this.setState({title:'Solicitação aceita',
                               getResponse:true,
                               responseMsg:'Por favor verifique sua caixa de email.'});
            })
            .catch(error => {this.setState({msg:error.message});});
    };

    makeDataForForgotPassword= () => {
        return {email:this.email.input.value,
                entity:this.state.entity}
    };


    handleClose = () => {
        this.setState({open: false});
        PubSub.publish('close-home-model', false);
    };

    onChange = () => {
        let isProvider = this.state.isProvider;
        isProvider = !isProvider;
        this.setState({entity: (isProvider)? 'provider':'student',
                       isProvider : isProvider });
    };

    render() {

        const actions = ((!this.state.getResponse) ?
            [
                <FlatButton
                    label="Cancelar"
                    primary={false}
                    style={{color:"#767676"}}
                    onClick={() => this.handleClose()}
                />,
                <RaisedButton label="Solicitar recuperação"
                              primary={true}
                              onClick={(event) => this.makeRequest(event)}/>,
            ]
            :
            [
                <RaisedButton label="Sair"
                              primary={true}
                              onClick={() => this.handleClose()}/>

            ]);



        const style = {
                        title:{fontFamily: 'Roboto',fontWeight: 300, textAlign:'center'},
                        toggle:{marginTop:'25px'}
                      };

        return (
            <div>
                <Dialog
                    titleStyle={style.title}
                    title={this.state.title}
                    actions={actions}
                    bodyStyle={{minHeight: '80px'}}
                    modal={true}
                    autoScrollBodyContent={false}
                    open={this.state.open}
                    onRequestClose={() => this.handleClose(false)}>

                    {(this.state.getResponse) ?
                        <div>
                            <br/>
                            <h4 className="title">{this.state.responseMsg}</h4>
                        </div>
                        :
                        <div>
                            <TextField
                                hintText="Email"
                                floatingLabelText="Email"
                                type="text"
                                fullWidth={true}
                                ref={(input) => {
                                    this.email = input;
                                }}
                            />
                            <Toggle
                                style={style.toggle}
                                labelPosition="right"
                                label="Eu sou uma empresa"
                                onToggle={() => this.onChange()}
                            />
                        </div>
                    }
                </Dialog>
            </div>
        );
    }
}