import React, {Component} from "react";
import RaisedButton from 'material-ui/RaisedButton';
import NewIco from 'material-ui/svg-icons/content/add';
import Information from './Information';
import Steps from './Step';
import PubSub from 'pubsub-js';

class Crud extends Component {

    constructor() {
        super();
        this.state={showInformationCourse:false, showStep:false}
    }


    componentDidMount(){
        PubSub.publish('header-label','Editando curso');
        PubSub.publish('switch-to-crud', true);
    }


    componentWillMount(){
        this.fncFillInformation();
    }

    fncFillInformation =()=>{
        console.log(this.props.course);
        if (this.props.course !== undefined){
            this.setState({'course':this.props.course})
        }
    };


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

                {this.state.showInformationCourse ? (<Information/>) : null}

                {this.state.showStep ? (<Steps/>) : null}

            </div>
        );
    }
}
export default Crud;