import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import PubSub from 'pubsub-js';

export default class SingIn extends Component {


    constructor() {
        super();
        this.state = { open: true};
    }

    handleClose = () => {
        this.setState({open: false});
        PubSub.publish('close-home-model', true);
    };

    render() {
        const actions = [
            <FlatButton
                label="Cancelar"
                primary={true}
                onClick={this.handleClose}
            />,
            <RaisedButton label="Criar conta"
                          primary={true}  />,
        ];

        const style = {title:{fontFamily: 'Roboto',fontWeight: 300, textAlign:'center'}};

        return (
            <div>
                <Dialog
                    titleStyle={style.title}
                    title="Seja bem vindo :)"
                    actions={actions}
                    modal={true}
                    open={this.state.open}
                    onRequestClose={this.handleClose}>
                    <TextField
                        hintText="Nome"
                        floatingLabelText="Nome"
                        type="text"
                        fullWidth={true}
                        ref={(input) => { this.name = input; }}
                    />

                    <TextField
                        hintText="Email"
                        floatingLabelText="Email"
                        type="email"
                        fullWidth={true}
                        ref={(input) => { this.email = input; }}
                    />
                    <TextField
                        hintText="Senha"
                        floatingLabelText="Senha"
                        type="password"
                        fullWidth={true}
                        ref={(input) => { this.password = input; }}
                    />
                </Dialog>
            </div>
        );
    }
}