import React, { Component } from "react";
import httpService from './../../../service/HttpService';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

class About extends Component {

    constructor() {
        super()
        this.httpService = new httpService();
        this.state = { classConfirmPassword: 'none' }
    };

    appearConfirmPassword = () =>
    {
        this.password.input.value.length >= 4 ?
        (this.setState({classConfirmPassword: ''})) : ((this.setState({classConfirmPassword: 'none'})));
    };

    render() {
        return (
            <div>
                <TextField
                    disabled={true}
                    hintText="Email"
                    floatingLabelText="Email"
                    fullWidth={true}
                    ref={(input) => { this.email = input; }}
                />
                <TextField
                    hintText="Nome"
                    floatingLabelText="Nome"
                    fullWidth={true}
                    errorText={''}
                    ref={(input) => { this.name = input; }}
                />
                <TextField
                    hintText="Senha"
                    floatingLabelText="Senha"
                    type="password"
                    fullWidth={true}
                    errorText={''}
                    ref={(input) => { this.password = input; }}
                    onChange={this.appearConfirmPassword}
                />
                <TextField
                    hintText="Confirmar senha"
                    floatingLabelText="Confirmar senha"
                    type="password"
                    fullWidth={true}
                    errorText={''}
                    style={{display: this.state.classConfirmPassword}}
                    ref={(input) => { this.confirmPassword = input; }}
                />
                <RaisedButton
                    label="salvar"
                    backgroundColor="#0ac752"
                    labelStyle={{color: 'white'}}
                    keyboardFocused={true}
                    style={{float: 'right', margin: '20px 0 20px 20px'}}/>
                <br/>
            </div>
        )
    }
}
export default About;
