import React, {Component} from "react";
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import NewIco from 'material-ui/svg-icons/content/add';
import Dialog from 'material-ui/Dialog';
import Question from './Question';

import {Step, StepLabel, Stepper,} from 'material-ui/Stepper';
import ArrowForwardIcon from 'material-ui/svg-icons/navigation/arrow-forward';

class Steps extends Component {
    constructor(props) {
        super(props);
        this.state = {showStep: true,
                      showQuestion: false,
                      stepIndex: 0};
    }

    fncCanStep = () => this.setState({showStep: false});
    fncShowQuestion = () => this.setState({showQuestion: true});
    fncHandleNext = () => {
        const {stepIndex} = this.state;

        if (stepIndex < 2) {
            this.setState({stepIndex: stepIndex + 1});
        }
    };
    fncHandlePrev = () => {
        const {stepIndex} = this.state;

        if (stepIndex > 0) {
            this.setState({stepIndex: stepIndex - 1});
        }
    };

    materials = [1, 2, 3];
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

    questions = [1, 2, 3];
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

    getStepContent(stepIndex) {
        switch (stepIndex) {
            case 0:
                return (
                    <div>
                        <div style={{overflow: 'auto', height: '200px'}}>
                            {this.material}
                        </div>
                        <RaisedButton
                            label="material"
                            backgroundColor="#0ac752"
                            icon={<NewIco color="#FFF"/>}
                            labelStyle={{color: 'white'}}
                            keyboardFocused={true}
                            style={{float: 'right', margin: '20px 0 20px 20px'}}/>

                    </div>
                );

            case 1:
                return (
                    <div>
                        {this.state.showQuestion? (<Question/>):null}
                        <div style={{overflow: 'auto', height: '200px'}}>
                            {this.question}
                        </div>
                        <RaisedButton
                            label="questão"
                            backgroundColor="#0ac752"
                            icon={<NewIco color="#FFF"/>}
                            labelStyle={{color: 'white'}}
                            keyboardFocused={true}
                            onTouchTap={this.fncShowQuestion}
                            style={{float: 'right', margin: '20px 0 20px 20px'}}/>
                    </div>
                );

            case 2:
                return (
                    <p>
                        {'prova'}
                    </p>
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
                label={stepIndex === 2 ? 'Concluir' : 'Proximo'}
                primary={true}
                onTouchTap={this.fncHandleNext}
                style={{float: 'right', marginRight: '10px'}}/>
            ,
        ];

        return (
            <div>
                <Dialog
                    title="Adicionando uma etapa"
                    actions={actions}
                    modal={true}
                    contentStyle={{width: '80%', maxWidth: 'none'}}
                    open={this.state.showStep}
                >
                    <Stepper activeStep={stepIndex} connector={<ArrowForwardIcon/>}>
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