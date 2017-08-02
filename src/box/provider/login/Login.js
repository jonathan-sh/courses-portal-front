import React, { Component } from "react";
import httpService from '../../../service/HttpService';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {Card} from 'material-ui/Card';
import {Link} from 'react-router-dom';
import history from '../../../service/router/History';
import '../../../style/css/provider/login.css';

class Login extends Component {

    constructor() {
        super()
        this.state = { msg: '' }
        this.httpService = new httpService();
    }


    makeLogin = (event) => {
        event.preventDefault();
        this.httpService.post('/login', this.makeDataForLogin())
            .then(response => {
                if (response.status !== 501 )
                {
                    return response.json();
                }
                this.setState({msg:'falha ao realizar login!'});
            })
            .then(success => {
                    localStorage.setItem('auth-token', success.token);
                    history.push('/provider/about');
            })
            .catch(error => console.log(error));
    }

    makeDataForLogin= () => {
        return {email:this.email.input.value,
                password:this.password.input.value,
                entity:'provider'}
    }

    render() {
        return (
            <div>
                <div className="div-dad">
                    <Card className="div-login">
                        <div>
                            <h2 className="font">Bem vindo professor!</h2>
                            <p className="font">Vamos começar a aula?</p>
                            <TextField
                            hintText="Email"
                            floatingLabelText="Email"
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
                            <div className="div-action">
                                <RaisedButton
                                    onTouchTap={this.makeLogin.bind(this)}
                                    label="Login" className="button" 
                                />
                                <RaisedButton
                                    label="Login Facebook" className="button"
                                />
                            </div>
                            <p className="font forgot-password">
                                <Link to={"/"} className="forgot-password">Esqueci minha senha</Link>
                            </p>
                            <span className="font">
                                {this.state.msg}
                            </span>
                        </div>
                    </Card>
                    <div className="div-info">
                        Lorem ipsum elementum aliquet laoreet tempor lectus nullam, senectus ornare accumsan inceptos tempor leo suspendisse, sit augue hendrerit potenti per dolor. sit aenean vulputate porttitor tempus aliquam himenaeos primis augue lobortis, sapien iaculis blandit ipsum vulputate id iaculis suspendisse lobortis, rhoncus quisque lacus lobortis ipsum lorem nec aliquam. vestibulum dictumst potenti a mauris consectetur himenaeos eget cursus, quam id nisi praesent luctus adipiscing posuere, velit nec orci ornare tortor dictum at. amet laoreet lacus porttitor enim gravida fringilla orci senectus luctus, ligula tempus ut senectus fringilla accumsan quis semper nostra neque, nostra himenaeos nullam elementum fames curabitur metus et. 

                        Pharetra nullam curabitur cubilia urna lorem lobortis blandit donec, aenean etiam risus arcu nunc interdum ornare. fusce feugiat aliquam ac habitant nunc platea magna laoreet vehicula, quisque consequat semper taciti justo auctor aptent aenean ut quis, aliquam mi posuere primis phasellus lacinia nam conubia. massa metus consequat curabitur semper faucibus mollis etiam litora lacus bibendum, nunc arcu aliquam velit molestie imperdiet leo auctor vitae, sodales cursus varius justo interdum felis luctus scelerisque laoreet. venenatis ut nulla eros ut vestibulum iaculis platea, convallis tincidunt bibendum viverra quis eu ligula, lacinia dictumst quis torquent convallis ultricies. 
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;


