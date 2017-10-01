import React, {Component} from 'react';
import './../../../style/font/font-awesome-4.7.0/css/font-awesome.min.css';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import PubSub from 'pubsub-js';
import httpService from '../../../service/HttpService';
import history from '../../../service/router/History';
import LinearProgress from 'material-ui/LinearProgress';

export default class ResettingPassword extends Component {


    constructor(props) {
        super(props);
        this.state = {open: true,
                      ctrlInput:false,
                      isProvider : false,
                      isValid: false,
                      getResponse:false,
                      errorPassword:'',
                      responseMsg:'',
                      title:'Redefinindo senha'};
        this.httpService = new httpService();
        this.login = {entity : props.match.params.v1,
                      password:''
            };
        this.url = '/forgot-password/'+props.match.params.v2+'/'+props.match.params.v3;
    };

    makeUpdate = (event) => {
        event.preventDefault();
        this.setState({title:'Solicitação em andamento...',isValid:false, ctrlInput:true});
        this.httpService.put(this.url, this.login)
            .then(response => {

                if (response.status === 200 )
                {
                    this.setState({title:'Senha atualizada',
                                  ctrlInput:false,
                                  getResponse:true,
                                  responseMsg:'Senha atualizada com sucesso.'});

                }
                if (response.status === 406 )
                {
                    this.setState({title:'Senha não atualizada',
                                   ctrlInput:false,
                                   getResponse:true,
                                   responseMsg:'Aparentemente sua solicitação não é mais válida. Por favor tente novamente.'});
                }

            })
            .catch(error => {this.setState({msg:error.message});});
    };

    setData= (event, value) => {
        if (this.passwordNew.input.value === this.passwordNow.input.value)
        {
            this.login.password = value;
            this.setState({isValid:true, errorPassword:''});
        }
        else
        {
            this.setState({errorPassword:'As senhas devem ser iguais', isValid:false});
        }
    };

    handleClose = () => {
        this.setState({open: false});
        PubSub.publish('close-home-model', false);
        history.push('/');
    };

    render() {

        const actions = ((!this.state.getResponse) ?
        [
            <FlatButton
                label="Cancelar"
                primary={false}
                style={{color: "#767676"}}
                onClick={() => this.handleClose()}
            />,
            <RaisedButton label={"Atualizar minha senha"}
                          primary={true}
                          disabled={!this.state.isValid}
                          onClick={(event) => this.makeUpdate(event)}/>
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
            <div className="home">
                <Dialog
                    titleStyle={style.title}
                    title={this.state.title}
                    actions={actions}
                    bodyStyle={{minHeight: '80px'}}
                    modal={true}
                    autoScrollBodyContent={false}
                    open={this.state.open}
                    onRequestClose={() => this.handleClose(false)}>
                    {(this.state.ctrlInput)? <LinearProgress mode="indeterminate" /> : null}

                    {(this.state.getResponse) ?
                        <div>
                            <br/>
                            <br/>
                            <h4 className="title">{this.state.responseMsg}</h4>
                        </div>
                        :
                        <div>
                            <TextField
                                hintText="Nova senha"
                                floatingLabelText="Nova senha"
                                type="password"
                                disabled={this.state.ctrlInput}
                                fullWidth={true}
                                ref={(input) => {
                                    this.passwordNew = input;
                                }}
                            />
                            < TextField
                                hintText = "Confirme a senha"
                                floatingLabelText="Confirme a senha"
                                type="password"
                                disabled={this.state.ctrlInput}
                                fullWidth={true}
                                errorText={this.state.errorPassword}
                                onChange={(event, value) =>  this.setData(event, value)}
                                ref={(input) => {this.passwordNow = input;}}
                            />
                        </div>
                    }
                    <br/>
                    <br/>
                </Dialog>
            </div>
        );
    }
}