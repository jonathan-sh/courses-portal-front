import React, {Component} from "react";
import PubSub from 'pubsub-js';

class Registration extends Component {

    componentDidMount(){
        PubSub.publish('header-label',"Matriculas")
    }

    render() {
        return (
            <div>

            </div>
        )
    }
}

export default Registration;
