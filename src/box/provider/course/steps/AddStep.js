import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import LinearProgress from 'material-ui/LinearProgress';
import courseStepService from '../../../../service/repository/CourseStepService';
import NewIco from 'material-ui/svg-icons/content/add';
import PubSub from 'pubsub-js';

class Material extends Component {

    constructor(props) {
        super(props);
        this.state =
        {
            open: false,
            step: {name: '', description: ''},
            errorText: {name: '', description: ''}
        };
    };

    componentWillMount()
    {
        this.fncFillInformation();
    };

    fncFillInformation = () =>
    {
        if (this.props.course !== undefined)
        {
            this.setState({'course': this.props.course});
            this.cleanData();
        }
    };

    cleanData = ()=>
    {
        let step = {name: '', description: ''};
        let errorTex = {name: '', description: ''};
        this.setState({'step': step});
        this.setState({'errorTex': errorTex});
    };

    fncHandleOpen = () =>
    {
        this.cleanData();
        this.setState({open: true});
    };

    fncHandleClose = () => {this.setState({open: false})};

    fncHandleSave = () =>
    {
        this.fncGetDataStep();
        if (this.fncValidData()) {
            this.setState({makeSave: true});
            courseStepService.save(this.fncGetDataStep())
                             .then(success =>
                             {
                                 PubSub.publish('reload-course' , success);
                                 this.setState({makeSave: false});
                                 this.fncHandleClose();
                             })
                             .catch(error =>
                             {
                                 console.log(error);
                             });

        }
    };

    fncGetDataStep = () =>
    {
        let step =
        {
            'courseId': this.state.course._id,
            'name': this.state.step.name,
            'description': this.state.step.description
        };
        return step;
    };

    setData = (event, value, attribute) =>
    {
        let step = this.state.step;
        step[attribute] = value;
        this.setState(step);
    };

    fncValidData = () =>
    {
        let status = true;

        let errorText = {name: '', description: ''};

        this.setState({'errorText': errorText});

        if (this.name === undefined || this.name.input.value === '')
        {
            errorText.name = 'Informe um nome';
            status = false;
        }
        if (this.description === undefined || this.description.input.value === '')
        {
            errorText.description = 'Informe uma descrição';
            status = false;
        }

        this.setState({'errorText': errorText});

        return status;
    };

    render()
    {
        const actions =
        [
            <FlatButton
                label="Cancelar"
                primary={true}
                onTouchTap={this.fncHandleClose}
            />,
            <RaisedButton label="Salvar etapa"
                          primary={true}
                          onTouchTap={this.fncHandleSave}/>
        ];

        return (
            <div>
                <RaisedButton
                    label="etapa"
                    backgroundColor="#0ac752"
                    icon={<NewIco color="#FFF"/>}
                    labelStyle={{color: 'white'}}
                    keyboardFocused={true}
                    onTouchTap={this.fncHandleOpen}
                    style={{float: 'right', margin: '20px 0 20px 20px', width:'10%'}}/>
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
    };
}

export default Material;