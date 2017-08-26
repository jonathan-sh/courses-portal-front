import React, {Component} from 'react';
import './../../../style/font/font-awesome-4.7.0/css/font-awesome.min.css';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import PubSub from 'pubsub-js';
import history from '../../../service/router/History';

export default class LoginStudent extends Component {


    constructor(props) {
        super(props);
        this.state = {open: true};
    }

    handleClose = (value) => {
        this.setState({open: false});
        PubSub.publish('close-home-model', value);
        history.push('/');
    };

    render() {
        const actions = [
            <FlatButton
                label="Cancelar"
                primary={false}
                style={{color:"#767676"}}
                onClick={() => this.handleClose(false)}
            />,
            <FlatButton
                label="Esqueci a senha"
                primary={true}
                onClick={() => this.handleClose(true)}
            />,
            <RaisedButton label="Fazer login"
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
                    onRequestClose={() => this.handleClose(false)}>

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
                            style={{marginRight:'5%',color:"#4267b2"}}
                            icon={<i className="fa fa-facebook"/>}
                        />
                        <FlatButton
                            label="Google"
                            labelPosition="after"
                            primary={true}
                            style={{color:"#ea4335"}}
                            icon={<i className="fa fa-google"/>}
                        />
                    </div>

                </Dialog>
            </div>
        );
    }
}