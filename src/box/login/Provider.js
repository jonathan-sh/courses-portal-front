import React, { Component } from "react";
import httpService from './../../service/HttpService';

class Provider extends Component {

    constructor() {
        super()
        this.state = { msg: '' }
        this.httpService = new httpService();
    }

    envia(event) {

        event.preventDefault();

        let dados = { email:'igor@mail.com', password:'123456', entity:'student'};

        this.httpService.post('/login',dados)
                        .then(response => {return response.json();})
                        .then(sucess => console.log(sucess))
                        .catch(error => console.log(error));
    }


    render() {
        return (
            <div>
                <form onSubmit={this.envia.bind(this)}>
                    <input type="text" ref={(input) => this.login = input} />
                    <input type="text" ref={(input) => this.senha = input} />
                    <input type="submit" value="login" />
                </form>
            </div>
        );
    }
}

export default Provider;


