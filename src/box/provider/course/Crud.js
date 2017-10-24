import React, {Component} from "react";
import RaisedButton from 'material-ui/RaisedButton';
import Information from './Information';
import AddStep from './AddStep';
import Step from './Step';
import PubSub from 'pubsub-js';
import DeleteIco from 'material-ui/svg-icons/content/delete-sweep';
import _ from 'lodash';

class Crud extends Component {

    constructor(props) {
        super(props);
        this.state = {course: (props.course)? props.course : []};
        this.steps = [];
        this.fncMapSteps();

    }

    componentWillMount() {
        PubSub.publish('header-label', 'Editando curso');
        PubSub.subscribe('crud-get-course', this.getCourse);
        this.fncMapSteps();
    }

    getCourse = (key, course) => {
        if (course !== undefined) {
            this.setState({'course': course});
            this.fncMapSteps();
        }
    };

    fncEditSep = (step) => {
        step._id = this.state.course._id;
        this.setState({'step': step});
        this.setState({showEditStep: true});
    };

    fncMapSteps = () => {
        if (this.state.course.steps)
        {
            let st = _.sortBy(this.state.course.steps, ['order']);
            this.steps = st.map((step) =>
                <div key={step.order}>
                    <RaisedButton
                        label={step.name}
                        backgroundColor="#2dc7a2"
                        onTouchTap={() =>this.fncEditSep(step)}
                        labelStyle={{color: '#FFF'}}
                        style={{marginTop: '5px',width:'89%'}}>
                    </RaisedButton>
                    <RaisedButton
                        label={"delete"}
                        backgroundColor="#ff2930"
                        labelStyle={{color: '#FFF'}}
                        style={{marginLeft: '1%',width:'10%'}}
                        icon={<DeleteIco color="#FFF"/>}>
                    </RaisedButton>
                </div>

            );
        }
    };


    render() {
        return (
            <div>
                {
                    (this.state.course.length>0) ?
                        <div>
                            <br/>
                            <br/>
                            <span className="subTopic">Informações:</span>
                            <Information course={this.state.course}/>
                            <br/>
                            <br/>
                            <span className="subTopic">Etapas: </span>
                            {this.steps}
                            <AddStep course={this.state.course}/>
                            {this.state.showEditStep ? <Step step={this.state.step}/>  : null}
                        </div>
                    :
                        <Information course={false}/>
                }

            </div>
        );
    }
}

export default Crud;