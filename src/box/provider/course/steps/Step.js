import React, {Component} from "react";
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import AddQuestion from './Question';
import AddProve from './Prove';
import AddMaterial from './Material';
import PubSub from 'pubsub-js';
import TextField from 'material-ui/TextField';
import CourseRepository from '../../../../service/repository/CourseService';

import {Step, StepLabel, Stepper,} from 'material-ui/Stepper';
import ArrowForwardIcon from 'material-ui/svg-icons/navigation/arrow-forward';

class Steps extends Component {
    constructor(props) {
        super(props);
        this.courseRepository = new CourseRepository();
        this.state = {
             showStep: true,
             stepIndex: 0,
             open: false,
             step: {_id: props.step._id, order: props.step.order, name: props.step.name, description: props.step.description},
             errorText: {name: '', description: ''},
             course:''
        };
    }

    fncMakeSave = () =>
    {
        if (this.fncValidData())
        {
            this.courseRepository.update(this.fncGetDataStep())
                .then(success =>
                {
                    this.setState({'course': success});
                })
                .catch(error =>
                {
                    console.log(error);
                });
        }

    };

    fncHandleOpen = () =>  this.setState({open: true});

    fncGetDataStep = () =>
    {
        let course =
        {
            '_id': this.state.step._id,
            'steps': [{'order': this.state.step.order, 'name': this.state.step.name, 'description': this.state.step.description}]
        };
        return course;
    };

    fncCanStep = () =>
    {
        PubSub.publish('close-edit-step');
        PubSub.publish('go-crud',this.state.course);
        this.setState({open: false});
    };

    fncHandleNext = () =>
    {
        const {stepIndex} = this.state;

        if (stepIndex < 3)
        {
            if (stepIndex===0)
            {
                this.fncMakeSave();
            }

            this.setState({stepIndex: stepIndex + 1});
        }
    };

    fncHandlePrev = () =>
    {
        const {stepIndex} = this.state;

        if (stepIndex > 0) {
            this.setState({stepIndex: stepIndex - 1});
        }
    };

    materials = [1];
    material = this.materials.map((material) =>
        <RaisedButton
            key={material}
            label={"MATERIAL " + material}
            fullWidth={true}
            backgroundColor="#2dc7a2"
            labelStyle={{color: '#FFF'}}
            style={{marginTop: '5px'}}>
        </RaisedButton>
    );

    questions = [1];
    question = this.questions.map((question) =>
        <RaisedButton
            key={question}
            label={"QUESTÃO " + question}
            fullWidth={true}
            backgroundColor="#2dc7a2"
            labelStyle={{color: '#FFF'}}
            style={{marginTop: '5px'}}>
        </RaisedButton>
    );


    proves = [1];
    prove = this.proves.map((prove) =>
        <RaisedButton
            key={prove}
            label={"PROVA " + prove}
            fullWidth={true}
            backgroundColor="#2dc7a2"
            labelStyle={{color: '#FFF'}}
            style={{marginTop: '5px'}}>
        </RaisedButton>
    );

    fncValidData = () =>
    {
        let status = true;

        let errorText = {name: '', description: ''};

        this.setState({'errorText': errorText});

        if (this.name === undefined || this.state.step.name === '') {
            errorText.name = 'Informe um nome';
            status = false;
        }
        if (this.description === undefined || this.state.step.description === '') {
            errorText.description = 'Informe uma descrição';
            status = false;
        }

        this.setState({'errorText': errorText});

        return status;
    };

    setData = (event, value, attribute) =>
    {
        let step = this.state.step;
        step[attribute] = value;
        this.setState({'step':step});
    };

    getStepContent(stepIndex) {
        switch (stepIndex) {

            case 0:
                return (
                    <div>
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

                    </div>
                );
            case 1:
                return (
                    <div>
                        <div style={{overflow: 'auto', height: '200px'}}>
                            {this.material}
                        </div>
                        <AddMaterial/>
                    </div>
                );

            case 2:
                return (
                    <div>
                        <div style={{overflow: 'auto', height: '200px'}}>
                            {this.question}
                        </div>
                        <AddQuestion/>
                    </div>
                );

            case 3:
                return (
                   <div>
                       <div style={{overflow: 'auto', height: '200px'}}>
                           {this.prove}
                       </div>
                       <AddProve/>
                   </div>
                );
            default:
                return ((<span>error</span>))
        }
    }

    render() {
        const {stepIndex} = this.state;

        const actions = [
            <FlatButton
                label={stepIndex === 0 ? 'Cancelar' : 'Voltar'}
                primary={true}
                onTouchTap={stepIndex === 0 ? this.fncCanStep : this.fncHandlePrev}
            />,
            <RaisedButton
                backgroundColor="#0ac752"
                labelStyle={{color: 'white'}}
                label={stepIndex === 3 ? 'Concluir' : 'Salvar e Continuar'}
                primary={true}
                onTouchTap={stepIndex === 3 ? this.fncCanStep : this.fncHandleNext}
                style={{float: 'right', marginRight: '10px'}}/>
            ,
        ];

        return (
            <div>
                <RaisedButton
                    label={this.state.step.name}
                    backgroundColor="#2dc7a2"
                    onTouchTap={() =>this.fncHandleOpen()}
                    labelStyle={{color: '#FFF'}}
                    style={{marginTop: '5px',width:'89%'}}>
                </RaisedButton>
                <Dialog
                    title="Adicionando uma etapa"
                    actions={actions}
                    modal={true}
                    contentStyle={{width: '80%', maxWidth: 'none'}}
                    open={this.state.open}
                >
                    <Stepper activeStep={stepIndex} connector={<ArrowForwardIcon/>}>
                        <Step>
                            <StepLabel>Informações básicas</StepLabel>
                        </Step>
                        <Step>
                            <StepLabel>Conteúdo didático</StepLabel>
                        </Step>

                        <Step>
                            <StepLabel>Questoes</StepLabel>
                        </Step>

                        <Step>
                            <StepLabel>Provas</StepLabel>
                        </Step>
                    </Stepper>
                    {this.getStepContent(stepIndex)}
                </Dialog>
            </div>
        );
    }
}

export default Steps;