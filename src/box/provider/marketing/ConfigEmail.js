import React, {Component} from "react";
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import GearIco from 'material-ui/svg-icons/action/gavel';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import PubSub from 'pubsub-js';
import providerService from '../../../service/repository/ProviderService';
import treatsValue from '../../../service/TreatsValue';


class ConfigEmail extends Component {
    constructor(props)
    {
        super(props);
        this.state =
        {
            open: false,
            provider:
            {
                _id:'',
                configEmail:{email:'',password:'',port:'', hostname:''}
            }
        };
    };


    componentWillMount()
    {
        this.fncFillData();
    }

    fncFillData = () =>
    {
       let provider =  providerService.getProvider();
       let thisProvider = this.state.provider;
       thisProvider._id = provider._id;
       thisProvider.configEmail.email = treatsValue.notNull(provider.configEmail.email);
       thisProvider.configEmail.password = treatsValue.notNull(provider.configEmail.password);
       thisProvider.configEmail.port = treatsValue.notNull(provider.configEmail.port);
       thisProvider.configEmail.hostname = treatsValue.notNull(provider.configEmail.hostname);
       this.setState({provider: thisProvider});

    };

    fncSave = () =>
    {
        console.log(this.state.provider);
        providerService
            .update(this.state.provider)
            .then(success =>
            {
                PubSub.publish('show-message', "REGISTRO ATUALIZADO");
                providerService.setProvider(success);
                this.fncHandleClose();
            })
            .catch(error =>  PubSub.publish('show-message', error));
    };

    fncHandleOpen = () =>
    {
        this.setState({open: true});
    };

    fncHandleClose = () =>
    {
        this.setState({open: false})
    };

    fncSetData = (event, value, attribute) =>
    {
        let topic = this.state.provider.configEmail;
        topic[attribute] = value;
        let config = {'configEmail':topic};
        this.setState({'provider.configEmail':config});
    };

    render()
    {
        const actions = [
            <FlatButton
                label={'Cancelar'}
                primary={true}
                onTouchTap={this.fncHandleClose}
            />,
            <RaisedButton
                backgroundColor="#0ac752"
                labelStyle={{color: 'white'}}
                label={'Enviar'}
                primary={true}
                onTouchTap={this.fncSave}
                style={{float: 'right', marginRight: '10px'}}/>
            ,
        ];

        return (
            <div>
                <RaisedButton
                    label={'Configuração email'}
                    backgroundColor={'#f2862d'}
                    icon={<GearIco color='#FFF'/>}
                    onTouchTap={() => this.fncHandleOpen()}
                    style={{width:'18%'}}
                    labelStyle={{color: 'white'}}
                />

                <Dialog
                    title="Configurando email"
                    autoScrollBodyContent={true}
                    actions={actions}
                    modal={true}
                    style={{margin:'0',minHeight: '450px', maxHeight: '450px'}}
                    titleStyle={{padding:'30px', marginTop:'-40px'}}
                    contentStyle={{width: '80%', maxWidth: 'none',minHeight: '450px', maxHeight: '450px'}}
                    bodyStyle={{minHeight: 'auto', maxHeight: '400px'}}
                    open={this.state.open}
                >

                    <TextField
                        hintText="Informe o email remetente"
                        floatingLabelText="Email"
                        type="text"
                        fullWidth={true}
                        onChange={(event, value) => this.fncSetData(event, value, 'email')}
                        value={this.state.provider.configEmail.email}/>
                    <TextField
                        hintText="Informe a senha do email"
                        floatingLabelText="Senha"
                        type="text"
                        fullWidth={true}
                        onChange={(event, value) => this.fncSetData(event, value, 'password')}
                        value={this.state.provider.configEmail.password}/>
                    <TextField
                        hintText="Informe a porta"
                        floatingLabelText="Porta"
                        type="number"
                        fullWidth={true}
                        onChange={(event, value) => this.fncSetData(event, value, 'port')}
                        value={this.state.provider.configEmail.port}/>
                    <TextField
                        hintText="Informe o servidor"
                        floatingLabelText="Servidor"
                        type="text"
                        fullWidth={true}
                        onChange={(event, value) => this.fncSetData(event, value, 'hostname')}
                        value={this.state.provider.configEmail.hostname}/>

                </Dialog>
            </div>
        );
    };

}
export default ConfigEmail;