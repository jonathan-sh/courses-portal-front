import React, {Component} from "react";
import PubSub from 'pubsub-js';

class Marketing extends Component {

    constructor() {
        super()
    };

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
