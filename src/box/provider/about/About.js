import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import httpService from './../../../service/HttpService';
import PubSub from 'pubsub-js';

class About extends Component {

    constructor() {
        super()
        this.httpService = new httpService();
        this.state = { provider: {name:'', email:'',} }
    };

    componentDidMount(){
        PubSub.publish('header-label','Sobre');
        this.findProvider();
    }

    findProvider = ()=>{
        this.httpService.get('/provider', localStorage.getItem('auth-token'))
            .then(response => {
                if (response.status !== 501 )
                {
                    return response.json();
                }
                throw new Error('Falha de autenticação.');
            })
            .then(success => {
                this.setState({"provider":success});
            })
            .catch(error => { console.log(error);});

    };

    setData = (event, value, attribute)=>{
        this.setState({"provider":{[attribute]:value}});
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
                    ref={(input) => { this.password = input; }}
                    onChange={this.appearConfirmPassword}
                />
                <TextField
                    id="password1"
                    hintText="Confirmar senha"
                    floatingLabelText="Confirmar senha"
                    type="password"
                    fullWidth={true}
                    errorText={''}
                    ref={(input) => { this.confirmPassword = input; }}
                />
                <RaisedButton
                    label="salvar"
                    backgroundColor="#0ac752"
                    labelStyle={{color: 'white'}}
                    keyboardFocused={true}
                    onTouchTap={this.fncFindCourse}
                    style={{float: 'right', margin: '20px 0 20px 20px'}}/>

                <br/>
            </div>
        )
    }
}
export default About;
