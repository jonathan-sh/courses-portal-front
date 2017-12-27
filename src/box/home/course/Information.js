import React, {Component} from 'react';
import { Step, Stepper, StepButton, StepContent,} from 'material-ui/Stepper';
import HeaderBar from './../bar/HeaderBar';
import HttpService from '../../../service/http/HttpService';
import history from '../../../service/router/History';
import _ from 'lodash';


export default class Information extends Component {

    constructor(props) {
        super(props);
        this.state = {course: {name: '-'}, stepIndex: 0,steps: []};
        this.fncGetInformation();
    };


    fncGetInformation = () => {

        HttpService.make().get('/course/information/' + this.props.match.params.id)
            .then(success =>
            {
                this.setState({course: success});
                this.mountSteps(success.steps);
            })
            .catch(error =>
            {
                history.push('/not-found/course');
            });


    };


    mountSteps = (newSteps) =>
    {
        let steps = _.sortBy(newSteps, ['order']).map((step, index) =>
            <Step key={index}>
                <StepButton onClick={() => this.setState({stepIndex: index})}>
                    <div style={{color:'rgba(255, 255, 255, 1)'}}>{step.name}</div>
                </StepButton>
                <StepContent>
                    <p>
                        {step.description}
                    </p>

                </StepContent>
            </Step>
        );

        this.setState({'steps': steps});
    };



    render() {

        return (
            <div>
                <div>
                    <HeaderBar/>
                </div>
                <div className="curse-home">
                    <div style={{backgroundColor: "rgba(0,0,0,0.5)", color: "#fff", padding: '5% 0 5% 0'}}>
                        <h3 className="title">{this.state.course.name}</h3>
                        <div style={{width: '80%', margin: 'auto'}}>
                            {/*ABOUT*/}
                            <div>
                                <h3 className="headerInfoCurse">Descritivo do curso</h3>
                                <div className="pagraf">
                                    {this.state.course.description}
                                </div>

                            </div>
                            <div>
                                <h3 className="headerInfoCurse">Objetivo do curso</h3>
                                <div className="pagraf">
                                    {this.state.course.objective}
                                </div>

                            </div>
                            <div>
                                <h3 className="headerInfoCurse">Carga horária</h3>

                                <h3 className="title">{this.state.course.hours} horas</h3>

                            </div>
                            {/*STEPS*/}
                            <h3 className="headerInfoCurse">Confira a grade do curso</h3>
                            <div style={{width: '100%', margin: 'auto'}}>
                                <Stepper
                                    activeStep={this.state.stepIndex}
                                    linear={false}
                                    orientation="vertical">
                                    {this.state.steps}
                                </Stepper>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}