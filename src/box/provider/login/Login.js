import React, { Component } from "react";
import LoginProvider from './../../home/login/LoginProvider';

class Login extends Component {

    constructor() {
        super();
    };

    render() {
        return (
            <div className="home">
                <LoginProvider/>
            </div>
        );
    }
}
export default Login;


