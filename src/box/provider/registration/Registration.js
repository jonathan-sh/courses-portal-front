import React, {Component} from "react";
import PubSub from 'pubsub-js';
import Table from './TableRegistration';

class Registration extends Component {

    componentDidMount(){
        PubSub.publish('header-label',"Matriculas")
    }

    render() {
        return (
            <div>
                <Table/>
            </div>
        )
    }
}

export default Registration;
