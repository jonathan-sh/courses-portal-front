import React, {Component} from "react";
import RaisedButton from 'material-ui/RaisedButton';
import NewIco from 'material-ui/svg-icons/content/add';
import Information from './Information';
import AddStep from './AddStep';
import PubSub from 'pubsub-js';
import Step from './Step';

class Crud extends Component {

    constructor(props) {
        super(props);
        this.state = {showInformationCourse: false,
                      showNewStep: false,
                      showEditStep: false,
                      step:[],
                      course: (this.props.course !== undefined)? this.props.course : []};
        this.steps = [];
        this.mapSteps();
        console.log(this.state);
    }

    componentDidMount() {
        PubSub.publish('header-label', 'Editando curso');
        PubSub.subscribe('close-new-step', this.closeNewStep);
        PubSub.subscribe('close-edit-step', this.closeEditStep);
        PubSub.subscribe('crud-get-course', this.getCourse);

    }

    closeNewStep = () => {
        this.setState({showNewStep: false});
    };

    closeEditStep = () => {
        this.setState({showEditStep: false});
    };

    getCourse = (key, course) => {
        if (course !== undefined) {
            this.setState({'course': course});
            this.mapSteps();
        }
    };

    fncEditSep = (step) => {
        step._id = this.state.course._id;
        this.setState({'step': step});
        this.setState({showEditStep: true});
    };

    mapSteps = () => {
        if (this.state.course.steps !== undefined && this.state.course.steps !== null)
        {
            this.steps = this.state.course.steps.map((step) =>
                <RaisedButton
                    key={step.order}
                    label={step.name}
                    fullWidth={true}
                    backgroundColor="#2dc7a2"
                    onTouchTap={() =>this.fncEditSep(step)}
                    labelStyle={{color: '#FFF'}}
                    style={{marginTop: '5px'}}>
                </RaisedButton>
            );
        }
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
                    labelStyle={{color: '#FFF'}}
                    backgroundColor="#2dc7a2"
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

                {this.state.showEditStep ? <Step step={this.state.step}/>  : null}
            </div>
        );
    }
}

export default Crud;