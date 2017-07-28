import React, { Component } from "react";
import httpService from '../../../service/HttpService';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

class Login extends Component {

    constructor() {
        super()
        this.state = { msg: '' }
        this.httpService = new httpService();
    }


    makeLogin = (event) => {
        event.preventDefault();
        this.httpService.post('/login', this.makeDataForLogin())
            .then(response => {
                if (response.status !== 501 )
                {
                    return response.json();
                }
                this.setState({msg:'falha no login'});
            })
            .then(sucess => this.setState({msg:'vosso token madame: '+ sucess.token}))
            .catch(error => console.log(error));
    }

    makeDataForLogin= () => {
        return {email:this.email.input.value,
                password:this.password.input.value,
                entity:'provider'}
    }


    render() {
        return (
            <div>
                <TextField
                    hintText="Email"
                    floatingLabelText="Email"
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
                <RaisedButton

                    onTouchTap={this.makeLogin.bind(this)}
                    label="Default" style={{ margin: 12,}} />
                <br/>
                <span style={{fontFamily: 'Roboto', fontSize: '20px',}}>
                    {this.state.msg}
                </span>
            </div>
        );
    }
}

export default Login;


