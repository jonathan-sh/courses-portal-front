/**
 * Created by Igor Martucelli on 26/08/2017.
 */
import React, {Component} from 'react';
import providerService from '../../../service/repository/ProviderService';
import TextField from 'material-ui/TextField';
import NewIco from 'material-ui/svg-icons/content/add';
import DeleteIco from 'material-ui/svg-icons/content/delete-sweep';
import EditIco from 'material-ui/svg-icons/content/create';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import PubSub from 'pubsub-js';
import GetResponseYesNo from '../../../component/GetResponseYesNo';

class Body extends Component
{
    constructor()
    {
        super();
        this.state =
        {
            provider: JSON.parse(localStorage.getItem('provider')),
            topic: {header: '', description: ''},
            topics: '',
            update: false,
            errorsText: '',
            labelButton: 'Adicionar tópico',
            iconButton: <NewIco color="#FFF"/>,
            btn: false,
            indexTopic: null
        };
    }

    componentDidMount()
    {
        this.fncListTopic();
    }

    fncListTopic = () =>
    {
        this.setState({'provider': JSON.parse(localStorage.getItem('provider'))});
        let provider = this.state.provider;

        if(provider.topics !== null)
        {
            let topics = provider.topics.map((topic, index) =>
                <div key={index} style={{textAlign: 'center'}}>
                    <RaisedButton
                        label={topic.header}
                        backgroundColor="#2dc7a2"
                        disabled={this.state.btn}
                        labelStyle={{color: '#FFF'}}
                        style={{marginTop: '10px', width: '80%'}}
                        onTouchTap= {(object, position) => this.switchAction(topic, index)}
                    />
                    <GetResponseYesNo
                        fncOnYesCase={(object, position, attribute) => this.fncHandleDelete(topic, index, 'topics')}
                        title={"Atenção, deletando tópico"}
                        question={"Você realmente deseja deletar o tópico [ "+topic.header +" ] ?"}
                        btLabel="delete"
                        btBackgroundColor="#ff2930"
                        btIcon={<DeleteIco color="#FFF"/>}
                        btStyle={{marginLeft:'1%',width: '19%'}}
                        btLabelStyle={{color: 'white'}}/>
                </div>
            );

            this.setState({'topics':topics});
        }
    };

    switchAction = (object, position) =>
    {
        this.clearFields();
        const label = 'Editar tópico';
        const icon = <EditIco color="#FFF"/>;

        this.setState({'topic': object, 'labelButton': label, 'update':true, 'iconButton': icon, 'indexTopic': position});
        this.fncListTopic();
    };

    isValidationFields = () =>
    {
        const errorHeader = 'Informe o título';
        const errorDescription = 'Informe o conteúdo';
        let errors =
            {
                header:'',
                description:'',
            };

        this.setState({'errorText':errors});

        this.header.input.value === '' ?
            (errors.header = errorHeader) : (errors.header = '');

        this.description.props.value === '' ?
            (errors.description = errorDescription) : (errors.description = '');

        this.setState({'errorsText': errors});

        if(errors.header === '' && errors.description === '')
        {
            return true;
        }
        return false;

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
        this.clearFields();
    };

    setData = (event, value, attribute) =>
    {
        let topic = this.state.topic;
        topic[attribute] = value;
        this.setState({'topic':topic});
    };

    fncHandleSave = (event, attribute, position) =>
    {
        if(this.isValidationFields())
        {
            let provider = this.state.provider;
            const topic = this.state.topic;
            let message = '';

            if(!this.state.update && position === null)
            {
                if (provider[attribute] === null || provider[attribute] === undefined)
                {
                    provider[attribute] = [];
                }
                provider[attribute].push(topic);
                message = 'Tópico ' + topic.header + ' adicionado com sucesso!';
                this.setState({'provider': provider});
                this.makeUpdateProvider(message);
            }
            else
            {
                provider[attribute][position] = topic;
                message = 'Tópico ' + topic.header + ' alterado com sucesso!';
                this.setState({'provider': provider});
                this.makeUpdateProvider(message);
            }
        }
    };

    fncHandleDelete = (object, position, attribute) =>
    {
        let message = 'Tópico ' + object.header + ' deletada com sucesso!';

        let provider = this.state.provider;
        provider[attribute].splice(position , 1);
        this.setState({'provider': provider});
        this.makeUpdateProvider(message);
    };

    fncHandleCancel = () => this.clearFields();

    clearFields = () =>
    {
        const label = 'Adicionar tópico';
        const topic = {header: '', description: ''};
        const icon = <NewIco color="#FFF"/>;
        let errors =
        {
            header:'',
            description:'',
        };

        this.setState({'topic': topic, 'labelButton': label, 'update':false, 'iconButton': icon, 'indexTopic': null, 'errorsText': errors});
        this.fncListTopic();
    };

    render()
    {
        return(
            <div style={{textAlign: 'left'}}>
                <TextField
                    id="header"
                    hintText="Título"
                    floatingLabelText="Título"
                    fullWidth={true}
                    errorText={this.state.errorsText.header}
                    value={this.state.topic.header}
                    ref={(input) => { this.header = input; }}
                    onChange={ (event, value) =>  this.setData(event, value, 'header')}
                />
                <TextField
                    id="description"
                    hintText="Conteúdo"
                    floatingLabelText="Conteúdo"
                    fullWidth={true}
                    multiLine={true}
                    rowsMax={5}
                    errorText={this.state.errorsText.description}
                    value={this.state.topic.description}
                    ref={(input) => { this.description = input; }}
                    onChange={ (event, value) =>  this.setData(event, value, 'description')}
                />
                <RaisedButton
                    label={this.state.labelButton}
                    backgroundColor="#0ac752"
                    icon={this.state.iconButton}
                    labelStyle={{color: 'white'}}
                    style={{float: 'right',  margin: '20px 0 20px 10px', width:'19%'}}
                    onTouchTap={(event, attribute, position) => this.fncHandleSave(event, 'topics', this.state.indexTopic)}
                />
                <FlatButton
                    label="Cancelar"
                    primary={true}
                    onTouchTap={this.fncHandleCancel}
                    style={{float: 'right', margin: '20px 0 20px 20px'}}
                />
                {this.state.topics}
            </div>
        );
    };
}

export default Body;