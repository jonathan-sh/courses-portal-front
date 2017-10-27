/**
 * Created by Igor Martucelli on 26/08/2017.
 */
import React, {Component} from 'react';
import Snackbar from 'material-ui/Snackbar';
import PubSub from 'pubsub-js';

class ActionMessage extends Component
{
    constructor()
    {
        super();
        this.state =
        {
            show: false,
            message: ''
        };

        PubSub.subscribe('show-message', this.makeMessage);
    };

    makeMessage = (topic, message) =>
    {
        this.setState({'show': true, 'message': message});
    };

    handleRequestClose = () => this.setState({'show': false, 'message': ''});

    render()
    {
        return(
            <div>
                <Snackbar
                    open={this.state.show}
                    message={this.state.message}
                    autoHideDuration={2500}
                    style={{zIndex: '9'}}
                    onRequestClose={this.handleRequestClose}
                />
            </div>
        );
    };
}

export default ActionMessage;