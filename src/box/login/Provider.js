import React, { Component } from "react";

class Provider extends Component {

    constructor() {
        super()
        this.state = { msg: '' }
    }

    envia(event) {
        event.preventDefault();

        const resquetInfo = {
            method: 'POST',
            body: JSON.stringify({ email:'johtnathan@mail.com' , password:'123456', entity:'provider'}),
            headers: new Headers({'Content-type': 'application/json;charset=UTF-8'}),
        };

        fetch('http://localhost:4212/login',resquetInfo)
            .then(response => {
                console.log(response);
                return response.json();
            })
            .then(sucess => console.log(sucess))
            .catch(error => console.log("meu erro:" + error));
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


