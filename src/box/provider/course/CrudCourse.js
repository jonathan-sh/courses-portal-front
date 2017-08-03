import React, {Component} from "react";
import RaisedButton from 'material-ui/RaisedButton';
import NewIco from 'material-ui/svg-icons/content/add';
import InformationCourse from './InformationCourse';
import Steps from './StepCourse';

class NewCourse extends Component {

    constructor() {
        super();
        this.state={showInformationCourse:false, showStep:false}
    }

    fncInfoCourse = ()=> this.setState({showInformationCourse: true});
    fncInfoStep = ()=> this.setState({showStep: true});

    render() {
        return (
            <div>
                <RaisedButton
                    label="INFORMAÇÕES BÁSICAS DO CURSO"
                    fullWidth={true}
                    labelStyle={{color: '#0ac752'}}
                    onTouchTap={this.fncInfoCourse}
                    style={{marginTop: '20px'}}/>
                <RaisedButton
                    label="etapa"
                    backgroundColor="#0ac752"
                    icon={<NewIco color="#FFF"/>}
                    labelStyle={{color: 'white'}}
                    keyboardFocused={true}
                    onTouchTap={this.fncInfoStep}
                    style={{float: 'right', margin: '20px 0 20px 20px'}}/>

                {this.state.showInformationCourse ? (<InformationCourse/>) : null}

                {this.state.showStep ? (<Steps/>) : null}

            </div>
        );
    }
}
export default NewCourse;