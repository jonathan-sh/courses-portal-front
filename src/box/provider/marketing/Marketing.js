import React, {Component} from "react";
import PubSub from 'pubsub-js';
import SendEmail from './SendEmail';
class Marketing extends Component {

    constructor(props)
    {
        super(props);
        this.state = {sendEmail: false};
    };

    componentDidMount()
    {
        PubSub.publish('header-label',"Marketing");
        PubSub.subscribe('close-send-email', this.fncCloseSendEmail);
    };

    fncCloseSendEmail = () => this.setState({sendEmail: false});

    fncShowSendEmail =  () => this.setState({sendEmail: true});

    render()
    {
        return (
            <div>
                <br/>
                <SendEmail/>
            </div>
        )
    };
}

export default Marketing;
