import React, {Component} from 'react';
import './../../../style/font/font-awesome-4.7.0/css/font-awesome.min.css';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import PubSub from 'pubsub-js';
import HttpService from '../../../service/http/HttpService';
import history from '../../../service/router/History';

export default class LoginProvider extends Component {

    constructor() {
        super();
        this.state = { open: true, msg: '' };
    };

    setItemsLocalStorage = (objects) =>
    {
        objects.entity.provider.password = null;
        localStorage.setItem('auth-token', objects.token);
        localStorage.setItem('provider', JSON.stringify(objects.entity.provider));
        localStorage.setItem('courses', JSON.stringify(objects.entity.courses));
        localStorage.setItem('entity', JSON.stringify(this.createEntity(objects.entity.provider)));
        PubSub.publish('logged');
    };

    createEntity = (object) =>
    {
        const entity = {id: object._id, name: object.name, entity: 'provider'};
        return entity;
    };


    fncLogoff = () =>
    {
        localStorage.removeItem('entity');
        localStorage.removeItem('student');
        localStorage.removeItem('auth-token');
    };


    makeLogin = () =>
    {
        this.fncLogoff();
        HttpService.make().post('/login', this.makeDataForLogin())
            .then(success =>
            {
                this.setItemsLocalStorage(success);
                history.push('/provider/about', success);
            })
            .catch(error =>
            {
                this.setState({'msg': 'Usuário ou senha incorreto'});
            });
    };

    makeDataForLogin= () => {
        return {email:this.email.input.value,
            password:this.password.input.value,
            entity:'provider'}
    };


    handleClose = (value) => {
        this.setState({'open': false});
        PubSub.publish('close-home-model', value);
        history.push('/');
    };

    onEnter = (event) =>
    {
        switch(event.key)
        {
            case 'Enter':
                this.makeLogin(event);
                break;
            default:
                break;
        }
    };

    render() {
        const actions = [
            <FlatButton
                label="Cancelar"
                primary={false}
                style={{color:"#767676"}}
                onClick={() => this.handleClose(false)}
            />,
            <FlatButton
                label="Esqueci a senha"
                primary={true}
                onClick={() => this.handleClose(true)}
            />,
            <RaisedButton onClick={this.makeLogin}
                          label="Fazer login"
                          primary={true}  />,
        ];


        const style = {title:{fontFamily: 'Roboto',fontWeight: 300, textAlign:'center'},
                       body:{paddingBottom: '0px', minHeight: '180px'},
                       error:{textAlign:'center'}};

        return (
            <div>
                <Dialog
                    titleStyle={style.title}
                    title="Login empresarial"
                    actions={actions}
                    bodyStyle={style.body}
                    modal={true}
                    autoScrollBodyContent={false}
                    open={this.state.open}
                    onRequestClose={() => this.handleClose(false)}>
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
                        onKeyDown={this.onEnter}
                    />
                    <p style={style.error}>&nbsp;{this.state.msg}</p>
                </Dialog>
            </div>
        );
    }
}