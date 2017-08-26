import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import httpService from './../../../service/HttpService';
import PubSub from 'pubsub-js';

class About extends Component
{
    constructor()
    {
        super();
        this.httpService = new httpService();
        this.state =
        {
            provider: JSON.parse(localStorage.getItem('provider')),
            classConfirmPassword: 'none',
            errorText:{name:'', password:'', confirmPassword: ''}
        };
    };

    componentWillMount()
    {
        PubSub.publish('header-label','Sobre');
        console.log(this.state.provider)
    };

    updateProvider = () =>
    {
        this.httpService.put('/provider', this.state.provider, localStorage.getItem('auth-token'))
            .then(response => {
                if (response.status !== 501 )
                {
                    return response.json();
                }
                throw new Error('Falha de autenticação.');
            })
            .then(success => {
                this.responseUpdate(success);
            })
            .catch(error => { console.log(error);});

    };

    responseUpdate = (response) =>
    {
        response.password = '';
        this.setState({"provider":response});
        localStorage.setItem('provider', JSON.stringify(response));
        this.clearPasswords();
        console.log('Success');
    };

    clearPasswords = () =>
    {
        this.password.setState({ value: "" });
        this.setState({classConfirmPassword: 'none'});
    };

    setData = (event, value, attribute) =>
    {
        let provider = this.state.provider;
        provider[attribute] = value;
        this.setState(provider);

        if(attribute === 'password')
        {
            value.length >= 4 ?
            (this.setState({classConfirmPassword: ''})) : ((this.setState({classConfirmPassword: 'none'})));
        }
    };

    isValidationFields = () =>
    {
        const errorName = 'Informe o nome';
        const errorPassword = 'A senha deve conter mais de quatro caracteres caso queria altera-lá';
        const errorConfirmPassword = 'As senhas não conferem';
        let errors =
        {
            name:'',
            password:'',
            confirmPassword:''
        };

        this.setState({'errorText':errors});

        this.password.input.value.length <= 3 ?
        (
            this.password.input.value !== '' ?
                errors.password = errorPassword : errors.password = ''
        )
            :
        (
            this.password.input.value !== this.confirmPassword.input.value ?
                errors.confirmPassword = errorConfirmPassword :  errors.confirmPassword = ''
        );

        this.name.input.value === '' ?
            (errors.name = errorName) : (errors.name = '');

        this.setState({'errorsText': errors});

        if(errors.name === '' && errors.password === '' && errors.confirmPassword === '')
        {
            return true;
        }
        return false;

    };

    fncMakeUpdateProvider = () =>
    {
        if(this.isValidationFields())
        {
            this.updateProvider();
        }
    };

    render()
    {
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
                    errorText={this.state.errorText.name}
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
                    errorText={this.state.errorText.password}
                    onChange={ (event, value) =>  this.setData(event, value, 'password')}
                    ref={(input) => { this.password = input; }}
                    value= {this.state.provider.password}
                />
                <TextField
                    id="password1"
                    hintText="Confirmar senha"
                    floatingLabelText="Confirmar senha"
                    type="password"
                    fullWidth={true}
                    errorText={this.state.errorText.confirmPassword}
                    style={{display: this.state.classConfirmPassword}}
                    ref={(input) => { this.confirmPassword = input; }}
                />
                <RaisedButton
                    label="salvar"
                    backgroundColor="#0ac752"
                    labelStyle={{color: 'white'}}
                    keyboardFocused={true}
                    onTouchTap={this.fncMakeUpdateProvider}
                    style={{float: 'right', margin: '20px 0 20px 20px'}}/>

                <br/>
            </div>
        )
    }
}
export default About;
