import React, {Component} from 'react';
import PubSub from 'pubsub-js';

export default class Information extends Component {

    constructor() {
        super();
        this.state = { open: true};
    }

    handleClose = () => {
        this.setState({open: false});
        PubSub.publish('close-home-model', true);
    };

    render() {

        return (
            <div>

            </div>
        );
    }
}