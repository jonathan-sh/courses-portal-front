import React, {Component} from 'react';
import './../../../style/font/font-awesome-4.7.0/css/font-awesome.min.css';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import PubSub from 'pubsub-js';
import httpService from '../../../service/HttpService';
import history from '../../../service/router/History';

export default class LoginProvider extends Component {

    constructor() {
        super();
        this.state = { open: true, msg: '' };
        this.httpService = new httpService();
    };

    setItemsLocalStorage = (objects) =>
    {
        objects.entity.provider.password = null;
        localStorage.setItem('auth-token', objects.token);
        localStorage.setItem('provider', JSON.stringify(objects.entity.provider));
        localStorage.setItem('courses', JSON.stringify(objects.entity.courses));
    };

    makeLogin = (event) => {
        event.preventDefault();
        this.httpService.post('/login', this.makeDataForLogin())
            .then(response => {
                if (response.status !== 501 )
                {
                    return response.json();
                }
                throw new Error('Usuário ou senha incorreto!');
            })
            .then(success => {
                console.log(success);
                this.setItemsLocalStorage(success);
                history.push('/provider/about', success);
            })
            .catch(error => {this.setState({msg:error.message});});
    };

    makeDataForLogin= () => {
        return {email:this.email.input.value,
            password:this.password.input.value,
            entity:'provider'}
    };


    handleClose = () => {
        this.setState({open: false});
        PubSub.publish('close-home-model', true);
        history.push('/');
    };

    render() {
        const actions = [
            <FlatButton
                label="Cancelar"
                primary={false}
                style={{color:"#767676"}}
                onClick={this.handleClose}
            />,
            <FlatButton
                label="Equeci a senha"
                primary={true}
                onClick={this.handleClose}
            />,
            <RaisedButton onClick={this.makeLogin.bind(this)}
                          label="Fazer login"
                          primary={true}  />,
        ];


        const style = {title:{fontFamily: 'Roboto',fontWeight: 300, textAlign:'center'}};

        return (
            <div>
                <Dialog
                    titleStyle={style.title}
                    title="Login empresarial"
                    actions={actions}
                    bodyStyle={{minHeight: '180px'}}
                    modal={true}
                    autoScrollBodyContent={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}>
                    <TextField
                        hintText="Email"
                        floatingLabelText="Email"
                        type="email"
                        fullWidth={true}
                        ref={(input) => { this.email = input; }}
                    />
                    <TextField
                        hintText="Senha"
                        floatingLabelText="Senha"
                        type="password"
                        fullWidth={true}
                        ref={(input) => { this.password = input; }}
                    />
                </Dialog>
            </div>
        );
    }
}