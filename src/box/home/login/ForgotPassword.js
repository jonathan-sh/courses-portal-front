import React, {Component} from 'react';
import './../../../style/font/font-awesome-4.7.0/css/font-awesome.min.css';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import PubSub from 'pubsub-js';
import httpService from '../../../service/HttpService';

export default class ForgotPassword extends Component {


    constructor() {
        super();
        this.state = {open: true};
        this.httpService = new httpService();
    }

    handleClose = () => {
        this.setState({open: false});
        PubSub.publish('close-home-model', false);
    };

    render() {
        const actions = [
            <FlatButton
                label="Cancelar"
                primary={false}
                style={{color:"#767676"}}
                onClick={this.handleClose}
            />,
            <RaisedButton label="Solicitar recuperação"
                          primary={true}  />,
        ];


        const style = {title:{fontFamily: 'Roboto',fontWeight: 300, textAlign:'center'}};

        return (
            <div>
                <Dialog
                    titleStyle={style.title}
                    title="Esqueci minha senha"
                    actions={actions}
                    bodyStyle={{minHeight: '80px'}}
                    modal={true}
                    autoScrollBodyContent={false}
                    open={this.state.open}
                    onRequestClose={() => this.handleClose(false)}>

                    <TextField
                        hintText="Email"
                        floatingLabelText="Email"
                        type="text"
                        fullWidth={true}
                        ref={(input) => { this.password = input; }}
                    />
                </Dialog>
            </div>
        );
    }
}