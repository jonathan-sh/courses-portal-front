import React, {Component} from "react";
import PubSub from 'pubsub-js';

class Financial extends Component {

    constructor() {
        super()
    };

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
