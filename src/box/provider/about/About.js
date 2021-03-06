import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import providerService from '../../../service/repository/ProviderService';
import PubSub from 'pubsub-js';
import Dropzone from '../../../service/Dropzone';

class About extends Component
{
    constructor()
    {
        super();
        this.state =
        {
            provider: JSON.parse(localStorage.getItem('provider')),
            classConfirmPassword: 'none',
            errorText:{name:'', password:'', confirmPassword: ''},
            passwords: {password: '', confirmPassword: ''}
        };

        PubSub.publish('header-label','Sobre');
    };

    makeUpdateProvider = (message) =>
    {
        providerService
            .update(this.state.provider)
            .then(success =>this.responseUpdate(success, message))
            .catch(error => PubSub.publish('show-message', error));

    };

    responseUpdate = (response, message) =>
    {
        response.password = null;
        this.setState({'provider':response});
        PubSub.publish('show-message', message);
        localStorage.setItem('provider', JSON.stringify(response));
        this.clearPasswords();
    };

    clearPasswords = () =>
    {
        let passwords = this.state.passwords;
        passwords.password = '';
        passwords.confirmPassword = '';
        this.setState({'passwords': passwords});
        this.setState({classConfirmPassword: 'none'});
    };

    setData = (event, value, attribute) =>
    {
        let provider = this.state.provider;
        provider[attribute] = value;
        this.setState(provider);

        if(attribute === 'password' || attribute === 'confirmPassword')
        {
            let passwords = this.state.passwords;
            passwords[attribute] = value;
            this.setState({'passwords': passwords});

            this.isValidationFields();

            if(attribute === 'password')
            {
                value.length >= 4 ?
                (this.setState({classConfirmPassword: ''})) : ((this.setState({classConfirmPassword: 'none'})));
            }
        }
    };

    isValidationFields = () =>
    {
        const errorName = 'Informe o nome';
        const errorPassword = 'A senha deve conter quatro caracteres ou mais caso queria altera-lá';
        const errorConfirmPassword = 'As senhas devem ser iguais';
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

    fncHandleSave = () =>
    {
        if(this.isValidationFields())
        {
            const message = 'Perfil atualizado com sucesso!';
            this.makeUpdateProvider(message);
        }
    };

    uploadFile = () =>
    {
        PubSub.publish('dropzone-make-upload');
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
                    value={this.state.passwords.password}
                />
                <TextField
                    id="password1"
                    hintText="Confirmar senha"
                    floatingLabelText="Confirmar senha"
                    type="password"
                    fullWidth={true}
                    errorText={this.state.errorText.confirmPassword}
                    style={{display: this.state.classConfirmPassword}}
                    onChange={(event, value) =>  this.setData(event, value, 'confirmPassword')}
                    ref={(input) => { this.confirmPassword = input; }}
                    value={this.state.passwords.confirmPassword}
                />
                <RaisedButton
                    label="salvar"
                    backgroundColor="#0ac752"
                    labelStyle={{color: 'white'}}
                    keyboardFocused={true}
                    onTouchTap={this.fncHandleSave}
                    style={{float: 'right', margin: '20px 0 20px 20px'}}/>

                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <Dropzone limitFile={true}/>

                <RaisedButton
                    label="salvar"
                    backgroundColor="#0ac752"
                    labelStyle={{color: 'white'}}
                    keyboardFocused={true}
                    onTouchTap={this.uploadFile}
                    style={{float: 'right', margin: '20px 0 20px 20px'}}/>
            </div>
        )
    }
}
export default About;
