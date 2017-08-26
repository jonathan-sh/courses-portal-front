import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import httpService from './../../../service/HttpService';
import PubSub from 'pubsub-js';

class About extends Component {

    constructor() {
        super()
        this.httpService = new httpService();
        this.state = { provider: JSON.parse(localStorage.getItem('provider')), classConfirmPassword: 'none' };

    };

    componentDidMount(){
        PubSub.publish('header-label','Sobre');
        console.log(this.state.provider)
    }

    updateProvider = ()=>{
        this.httpService.put('/provider', this.state.provider, localStorage.getItem('auth-token'))
            .then(response => {
                if (response.status !== 501 )
                {
                    return response.json();
                }
                throw new Error('Falha de autenticação.');
            })
            .then(success => {
                success.password = null;
                this.setState({"provider":success});
                localStorage.setItem('provider', JSON.stringify(success));
            })
            .catch(error => { console.log(error);});

    };

    setData = (event, value, attribute)=>{
        let provider = this.state.provider;
        provider[attribute] = value;
        this.setState(provider);
        console.log(provider)

        if(attribute === 'password')
        {
            value.length >= 4 ?
            (this.setState({classConfirmPassword: ''})) : ((this.setState({classConfirmPassword: 'none'})));
        }
    };

    render() {
        return (
            <div>
                <TextField
                    id="email"
                    disabled={true}
                    hintText="Email"
                    floatingLabelText="Email"
                    fullWidth={true}
                    value= {this.state.provider.email}
                />
                <TextField
                    id="name"
                    hintText="Nome"
                    floatingLabelText="Nome"
                    fullWidth={true}
                    errorText={''}
                    onChange={ (event, value) =>  this.setData(event, value, 'name')}
                    ref={(input) => { this.name = input; }}
                    value= {this.state.provider.name}
                />
                <TextField
                    id="password0"
                    hintText="Senha"
                    floatingLabelText="Senha"
                    type="password"
                    fullWidth={true}
                    errorText={''}
                    onChange={ (event, value) =>  this.setData(event, value, 'password')}
                    ref={(input) => { this.password = input; }}
                />
                <TextField
                    id="password1"
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
                    onTouchTap={this.updateProvider}
                    style={{float: 'right', margin: '20px 0 20px 20px'}}/>

                <br/>
            </div>
        )
    }
}
export default About;
