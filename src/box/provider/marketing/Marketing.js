import React, {Component} from "react";
import PubSub from 'pubsub-js';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class Marketing extends Component {

    constructor() {
        super()
    };

    componentDidMount(){
        PubSub.publish('header-label',"Marketing")
    }

    render() {
        return (
            <div>
                <TextField
                    hintText="Cabeça"
                    floatingLabelText="Cabeça"
                    fullWidth={true}
                    ref={(input) => { this.description = input; }}
                />
                <TextField
                    hintText="Descriação"
                    floatingLabelText="Descriação"
                    fullWidth={true}
                    ref={(input) => { this.description = input; }}
                />
                <RaisedButton
                    label={"CATEGORIAS"}
                    fullWidth={true}
                    backgroundColor="#2dc7a2"
                    labelStyle={{color: '#FFF'}}
                    style={{marginTop: '10px'}}>
                </RaisedButton>
                <RaisedButton
                    label="salvar"
                    backgroundColor="#0ac752"
                    labelStyle={{color: 'white'}}
                    style={{float: 'right', margin: '20px 0 20px 20px'}}/>
            </div>
        )
    }
}

export default Marketing;
