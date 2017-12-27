import React, {Component} from "react";

import Information from './Information';
import AddStep from './steps/AddStep';
import PubSub from 'pubsub-js';
import DeleteIco from 'material-ui/svg-icons/content/delete-sweep';
import GetResponseYesNo from '../../../component/GetResponseYesNo';
import courseStepService from '../../../service/repository/CourseStepService';
import _ from 'lodash';
import Step from "./steps/Step";

class CrudCourse extends Component {

    constructor(props)
    {
        super(props);
        this.state = {course: [],steps:[]};
        this.isUpdate = false;
    };

    componentWillMount()
    {
        PubSub.publish('header-label', 'Editando curso');
        PubSub.subscribe('reload-course',this.fncReload);
        if (this.props.course && this.props.course._id)
        {
            this.fncReload(null, this.props.course);
        }
    };

    fncReload = (key, course) =>
    {
        this.setState({'course': course});
        this.label = 'Editando curso';
        this.isUpdate = true;
        this.fncMapSteps(course.steps);
    };

    fncMapSteps = (steps) =>
    {
        let st = _.sortBy(steps, ['order']);
        this.steps = st.map((step, index) =>
            <div key={index} style={{marginBottom: '0.5%', display:'flex'}}>


                <div style={{width:'89%'}}>
                    <Step step={step} courseId ={this.props.course._id}/>
                </div>

                <div style={{marginLeft: '1%',minWidth:'10%', marginTop:'6px'}}>
                    <GetResponseYesNo
                        fncOnYesCase={() => courseStepService.delete(step,this.state.course._id)
                                                             .then((success) => this.fncReload(null, success))
                                                             .catch((error) => console.log(error))
                                     }
                        title={"Antenção, deletando etapa"}
                        question={"Você realmente deseja deletar a etapa [ " + step.name + " ] ?"}
                        btLabel="delete"
                        btBackgroundColor="#ff2930"
                        btIcon={<DeleteIco color="#FFF"/>}
                        btStyle={{width:'100%'}}
                        btLabelStyle={{color: 'white'}}/>
                </div>
            </div>
        );
        this.setState({steps: steps});

    };

    render()
    {
        return (
            <div>
                {
                    (this.isUpdate) ?
                        <div>

                            <br/>
                            <br/>
                            <span className="subTopic">Informações:</span>
                            <Information course={this.state.course}/>
                            <br/>
                            <span className="subTopic">Etapas: </span>
                            <br/>
                            <br/>
                            {this.steps}
                            <AddStep course={this.state.course}/>

                        </div>
                        :
                        <Information/>
                }

            </div>
        );
    };
}

export default CrudCourse;