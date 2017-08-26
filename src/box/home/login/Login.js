import React, {Component} from 'react';
import './../../../style/font/font-awesome-4.7.0/css/font-awesome.min.css';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import PubSub from 'pubsub-js';

export default class Login extends Component {


    constructor(props) {
        super(props);
        this.state = {open: true,slideIndex: 0,};
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
            <RaisedButton label="Entrar"
                          primary={true}  />,
        ];


        const style = {title:{fontFamily: 'Roboto',fontWeight: 300, textAlign:'center'}};

        return (
            <div>
                <Dialog
                    titleStyle={style.title}
                    title="Olha quem voltou :D"
                    actions={actions}
                    bodyStyle={{minHeight: '180px'}}
                    modal={true}
                    autoScrollBodyContent={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}>

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
                    <br/>
                    <br/>
                    <div style={{textAlign:'center'}}>
                        <h4 className="title">ou</h4>
                        <FlatButton
                            label="Facebook"
                            labelPosition="after"
                            primary={true}
                            style={{marginRight:'5%'}}
                            icon={<i className="fa fa-facebook"/>}
                        />
                        <FlatButton
                            label="Google"
                            labelPosition="after"
                            primary={true}
                            icon={<i className="fa fa-google"/>}
                        />
                    </div>

                </Dialog>
            </div>
        );
    }
}