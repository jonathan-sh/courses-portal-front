/**
 * Created by Igor Martucelli on 26/08/2017.
 */
import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import ProviderRepository from './../../../repository/ProviderRepository';
import PubSub from 'pubsub-js';

class Footer extends Component
{
    constructor(props) {
        super(props);
        this.providerRepository = new ProviderRepository();
        this.state =
        {
            errorText: '',
            provider: JSON.parse(localStorage.getItem('provider'))
        };
    }

    getData = () =>
    {
       let id = this.state.provider._id;
       let welcome = this.state.provider.welcome;
       let data = {'_id':id,'welcome':welcome};
       return data;
    };

    fncUpdate = () =>
    {
        if(this.isValidationField())
        {
            let data = this.getData();
            this.providerRepository.update(data)
                .then(success => {PubSub.publish('show-message', 'Home face alterada com sucesso!');})
                .catch(error => {PubSub.publish('show-message', error);});
        }
    };

    setData = (event, value, attribute) =>
    {
        let provider = this.state.provider;
        provider[attribute] = value;
        this.setState({'provider':provider});
    };

    isValidationField = () =>
    {
        const errorWelcome = 'Informe a frase de boas vindas';
        let errorText = '';

        this.welcome.input.value === '' ?
            (errorText = errorWelcome) : (errorText = '');

        this.setState({'errorText': errorText});

        if(errorText === '')
        {
            return true;
        }
        return false;
    };

    render()
    {
        return(
            <div>
                <TextField
                    id="welcome"
                    hintText="Esse frase sera apresentada na sua página principal"
                    floatingLabelText="Frase de boas vindas"
                    fullWidth={true}
                    value={this.state.provider.welcome}
                    errorText={this.state.errorText}
                    ref={(input) => this.welcome = input}
                    onChange={(event, value) =>  this.setData(event, value, 'welcome')}
                />
                <RaisedButton
                    label='Salvar'
                    backgroundColor="#0ac752"
                    labelStyle={{color: 'white'}}
                    style={{float: 'right',  margin: '20px 0 20px 10px', width:'19%'}}
                    onTouchTap={() => this.fncUpdate()}
                />
            </div>
        );
    };
}

export default Footer;