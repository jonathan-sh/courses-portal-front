import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import LinearProgress from 'material-ui/LinearProgress';
import PubSub from 'pubsub-js';
import httpService from '../../../service/HttpService';

class Material extends Component {
    constructor(props) {
        super(props);
        this.httpService = new httpService();
        this.state = {
            open: true,
            step: {name: '', description: ''},
            errorText: {name: '', description: ''}
        };
    };

    componentWillMount() {
        this.fncFillInformation();
    }

    fncFillInformation = () => {
        if (this.props.course !== undefined) {
            this.setState({'course': this.props.course});

        }
    };

    handleClose = () => {
        PubSub.publish('close-new-step', true);
        this.setState({open: false});
    };

    fncHandleSave = () => {
        this.fncGetDataStep();
        if (this.fncValidData()) {
            this.setState({makeSave: true});
            this.httpService.put('/course', this.fncGetDataStep(), localStorage.getItem('auth-token'))
                .then(response => {
                    if (response.status !== 501) {
                        return response.json();
                    }
                    throw new Error('Falha de autenticação.');
                })
                .then(success => {
                    PubSub.publish('crud-get-course',success);
                    this.handleClose();
                })
                .catch(error => {
                    this.setState({msg: error.message});
                });
        }
    };

    fncGetDataStep = () => {
        let course = {
            '_id': this.state.course._id,
            'steps': [{'name': this.state.step.name, 'description': this.state.step.description}]
        };
        return course;
    };


    setData = (event, value, attribute) => {
        let step = this.state.step;
        step[attribute] = value;
        this.setState(step);
    };

    fncValidData = () => {
        let status = true;

        let errorText = {name: '', description: ''};

        this.setState({'errorText': errorText});

        if (this.name === undefined || this.name.input.value === '') {
            errorText.name = 'Informe um nome';
            status = false;
        }
        if (this.description === undefined || this.description.input.value === '') {
            errorText.description = 'Informe uma descrição';
            status = false;
        }

        this.setState({'errorText': errorText});

        return status;
    };


    render() {
        const actions = [
            <FlatButton
                label="Cancelar"
                primary={true}
                onTouchTap={this.handleClose}
            />,
            <RaisedButton label="Salvar etapa"
                          primary={true}
                          onTouchTap={this.fncHandleSave}/>
        ];

        return (
            <div>
                <Dialog
                    title="Adicionando etapa"
                    actions={actions}
                    modal={true}
                    contentStyle={{width: '80%', maxWidth: 'none'}}
                    open={this.state.open}>
                    {this.state.makeSave ? <LinearProgress mode="indeterminate"/> : null}

                    <TextField
                        hintText="Nome"
                        floatingLabelText="Nome"
                        fullWidth={true}
                        errorText={this.state.errorText.name}
                        ref={(input) => this.name = input}
                        onChange={(event, value) => this.setData(event, value, 'name')}
                        value={this.state.step.name}/>

                    <TextField
                        hintText="Descrição"
                        floatingLabelText="Descrição"
                        fullWidth={true}
                        errorText={this.state.errorText.description}
                        ref={(input) => this.description = input}
                        onChange={(event, value) => this.setData(event, value, 'description')}
                        value={this.state.step.description}/>

                </Dialog>
            </div>
        );
    }
}

export default Material;