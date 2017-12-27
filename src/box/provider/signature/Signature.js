import React, {Component} from "react";
import PubSub from 'pubsub-js';
import Table from './Table';

class Signature extends Component {

    componentDidMount()
    {
        PubSub.publish('header-label',"Matriculas")
    };

    render()
    {
        return (
            <div>
                <Table/>
            </div>
        )
    };
}

export default Signature;
