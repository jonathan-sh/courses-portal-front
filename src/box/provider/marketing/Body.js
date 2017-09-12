/**
 * Created by Igor Martucelli on 26/08/2017.
 */
import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import httpService from './../../../service/HttpService';
import NewIco from 'material-ui/svg-icons/content/add';
import DeleteIco from 'material-ui/svg-icons/content/delete-sweep';
import RaisedButton from 'material-ui/RaisedButton';

class Body extends Component
{
    constructor()
    {
        super();
        this.httpService = new httpService();
        this.state =
        {
            provider: JSON.parse(localStorage.getItem('provider')),
            topic: {title: '', content: ''},
            topics: '',
            update: false,
            errorsText: ''
        }
    }

    isValidationFields = () =>
    {
        const errorTitle = 'Informe o título';
        const errorContent = 'Informe o conteúdo';
        let errors =
            {
                title:'',
                content:'',
            };

        this.setState({'errorText':errors});

        this.title.input.value === '' ?
            (errors.title = errorTitle) : (errors.title = '');

        this.content.input.value === '' ?
            (errors.content = errorContent) : (errors.content = '');

        this.setState({'errorsText': errors});

        if(errors.title === '' && errors.content === '')
        {
            return true;
        }
        return false;

    };

    makeUpdateProvider = () =>
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
        response.password = null;
        this.setState({'provider':response});
        localStorage.setItem('provider', JSON.stringify(response));
        console.log('Success');
    };

    setData = (event, value, attribute) =>
    {
        let topic = this.state.topic;
        topic[attribute] = value;
        this.setState({'topic':topic});
    };

    fncHandleSave = () =>
    {
        if(this.isValidationFields())
        {
            this.clearFields();
        }
    };

    clearFields = () =>
    {
        this.setState({ 'topic': {title:'', content: ''} });
    };

    render()
    {
        return(
            <div style={{textAlign: 'left'}}>
                <TextField
                    id="title"
                    hintText="Título"
                    floatingLabelText="Título"
                    fullWidth={true}
                    errorText={this.state.errorsText.title}
                    value={this.state.topic.title}
                    ref={(input) => { this.title = input; }}
                    onChange={ (event, value) =>  this.setData(event, value, 'title')}
                />
                <TextField
                    id="content"
                    hintText="Conteúdo"
                    floatingLabelText="Conteúdo"
                    fullWidth={true}
                    errorText={this.state.errorsText.content}
                    value={this.state.topic.content}
                    ref={(input) => { this.content = input; }}
                    onChange={ (event, value) =>  this.setData(event, value, 'content')}
                />
                <RaisedButton
                    label="adicinar tópico"
                    backgroundColor="#0ac752"
                    icon={<NewIco color="#FFF"/>}
                    labelStyle={{color: 'white'}}
                    style={{float: 'right', margin: '20px 0 20px 20px'}}
                    onTouchTap={() => this.fncHandleSave()}
                />

                <RaisedButton
                    label="Titulo topico"
                    backgroundColor="#2dc7a2"
                    labelStyle={{color: '#FFF'}}
                    style={{marginTop: '10px', width: '92.1%'}}
                />
                <RaisedButton
                    label="delete"
                    backgroundColor="#ff2930"
                    icon={<DeleteIco color="#FFF"/>}
                    style={{marginLeft:'0.7%'}}
                    labelStyle={{color: 'white'}}
                />
            </div>
        );
    };
}

export default Body;