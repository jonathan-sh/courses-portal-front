import React, {Component} from "react";
import RaisedButton from 'material-ui/RaisedButton';
import NewIco from 'material-ui/svg-icons/content/add';
import Information from './Information';
import AddStep from './AddStep';
import PubSub from 'pubsub-js';

class Crud extends Component {

    constructor(pros) {
        super(pros);
        this.state = {showInformationCourse: false,
                      showNewStep: false,
                      course: (this.props.course !== undefined)? this.props.course : []};
        this.steps = [];
        this.mapSteps();
    }

    componentDidMount() {
        PubSub.publish('header-label', 'Editando curso');
        PubSub.subscribe('close-new-step', this.closeNewStep);
        PubSub.subscribe('crud-get-course', this.getCourse);

    }

    closeNewStep = () => {
        this.setState({showNewStep: false});
    };

    getCourse = (key, course) => {
        if (course !== undefined) {
            this.setState({'course': course});
            this.mapSteps();
        }
    };

    mapSteps = () => {
        console.log(this.state);
        if (this.state.course.steps !== undefined && this.state.course.steps !== null)
        {
            this.steps = this.state.course.steps.map((step) =>
                <RaisedButton
                    key={step.order}
                    label={step.name}
                    fullWidth={true}
                    backgroundColor="#2dc7a2"
                    labelStyle={{color: '#FFF'}}
                    style={{marginTop: '5px'}}>
                </RaisedButton>
            );
        }
        console.log(this.steps);
    };

    fncInfoCourse = () => this.setState({showInformationCourse: true});

    fncNewStep = () => this.setState({showNewStep: true});

    render() {
        return (
            <div>
                <br/>
                <br/>
                <span className="subTopic">Informações:</span>
                <RaisedButton
                    label={"INFORMAÇÕES BÁSICAS DO CURSO - [ " + this.state.course.name + " ]"}
                    fullWidth={true}
                    labelStyle={{color: '#0ac752'}}
                    onTouchTap={this.fncInfoCourse}
                    style={{marginTop: '20px'}}/>

                <br/>
                <br/>
                <span className="subTopic">Etapas: </span>

                {this.steps}

                <RaisedButton
                    label="etapa"
                    backgroundColor="#0ac752"
                    icon={<NewIco color="#FFF"/>}
                    labelStyle={{color: 'white'}}
                    keyboardFocused={true}
                    onTouchTap={this.fncNewStep}
                    style={{float: 'right', margin: '20px 0 20px 20px'}}/>

                {this.state.showInformationCourse ? (<Information course={this.state.course}/>) : null}


                {this.state.showNewStep ? (<AddStep course={this.state.course}/>) : null}

            </div>
        );
    }
}

export default Crud;