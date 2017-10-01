import React, {Component} from "react";
import PubSub from 'pubsub-js';
import SendEmail from './SendEmail';
import RaisedButton from 'material-ui/RaisedButton';
import SendIco from 'material-ui/svg-icons/content/send';



class Marketing extends Component {

    constructor(props) {
        super(props);
        this.state = {sendEmail: false};
    }
    componentDidMount(){
        PubSub.publish('header-label',"Marketing");
        PubSub.subscribe('close-send-email', this.fncCloseSendEmail);
    }

    fncCloseSendEmail = () =>  {this.setState({sendEmail: false}); };
    fncShowSendEmail = () =>  {this.setState({sendEmail: true}); };

    render() {
        return (
            <div>
                <br/>
                <RaisedButton
                    label={'Enviar email'}
                    backgroundColor={'#0ac752'}
                    icon={<SendIco color='#FFF'/>}
                    onTouchTap={() => this.fncShowSendEmail()}
                    fullWidth={true}
                    labelStyle={{color: 'white'}}
                />

                { this.state.sendEmail? <SendEmail/> : null}
            </div>
        )
    }
}

export default Marketing;
