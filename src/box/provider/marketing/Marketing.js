import React, {Component} from "react";
import PubSub from 'pubsub-js';
import SendEmail from './SendEmail';


class Marketing extends Component {

    constructor(props) {
        super(props);
        this.state = {sendEmail: false};
    }
    componentDidMount(){
        PubSub.publish('header-label',"Marketing")
    }

    render() {
        return (
            <div>

            </div>
        )
    }
}

export default Marketing;
