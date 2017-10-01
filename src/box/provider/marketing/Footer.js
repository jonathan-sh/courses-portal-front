/**
 * Created by Igor Martucelli on 26/08/2017.
 */
import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import httpService from './../../../service/HttpService';


class Footer extends Component
{
    constructor(props) {
        super(props);
        this.httpService = new httpService();
    }

    getData = () => {
       let id = JSON.parse(localStorage.getItem('provider'))._id;
       let welcome = this.welcome.input.value;
       let data = {'_id':id,'welcome':welcome}
       return data;

    };


    fncUpdate = () => {
        let data = this.getData();
        this.httpService.put('/provider', data, localStorage.getItem('auth-token'))
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                }
            })
            .then(success => {
               console.log(success);
            })
            .catch(error => {
                this.setState({msg: error.message});
            });
    };


    render()
    {
        return(
            <div>
                <TextField
                    id="welcome"
                    hintText="Esse frase sera apresentada na sua página principal"
                    floatingLabelText="Frase de boas vindas"
                    fullWidth={true}
                    ref={(input) => this.welcome = input}
                />
                <RaisedButton
                    label='Salvar'
                    backgroundColor="#0ac752"
                    labelStyle={{color: 'white'}}
                    style={{float: 'right',  margin: '20px 0 20px 10px', width:'19%'}}
                    onTouchTap={() => this.fncUpdate()}
                />
            </div>
        );
    };
}

export default Footer;