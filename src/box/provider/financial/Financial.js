import React, {Component} from "react";
import PubSub from 'pubsub-js';

class Financial extends Component {

    componentDidMount(){
        PubSub.publish('header-label',"Financeiro")
    }

    render() {
        return (
            <div>

            </div>
        )
    }
}

export default Financial;
