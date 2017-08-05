import React, {Component} from "react";
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Crud from './Crud';
import InputMask from 'react-input-mask';
import RaisedButton from 'material-ui/RaisedButton';
import _ from 'lodash';
import PubSub from 'pubsub-js';

class Information extends Component {

    constructor() {
        super();
        this.state = {
            open: true,
            crud: false,
            errorText: {name: '',
                        operation: '',
                        objective: '',
                        price: '',
                        hours: ''}};

    }

    fncHandleClose = () =>  {
        PubSub.publish('switch-to-crud', false);
        this.setState({open: false});
    };

    fncHandleSave = () => {
        if (this.fncValidData()) {
            this.setState({crud: true, open: false});
        }
    };

    fncGetDataCourse = () => {
        let course = { name: this.name.input.value,
                       operation: this.operation.input.value,
                       objective: this.objective.input.value,
                       price: this.price.input.value,
                       hours: this.hours.input.value};
        return course;
    };

    fncValidData = () => {
        let status = true;
        let course = this.fncGetDataCourse();

        let errorText = {name: '',
                         operation: '',
                         objective: '',
                         price: '',
                         hours: '' };

        this.setState({'errorText': errorText});

        _.forEach(course, (value, key) => {
            if (!this.fncValidValue(value)) {
                status = false;
                errorText[key] = 'Informe este campo';
            }
        });

        this.setState({'errorText': errorText});

        return status;

    };

    fncValidValue = (value) => { return value !== undefined && value !== ""};

    actions = [
        <FlatButton
            label="Cancelar"
            primary={true}
            onTouchTap={this.fncHandleClose}
        />,
        <RaisedButton
            label="Salvar"
            backgroundColor="#0ac752"
            labelStyle={{color: 'white'}}
            onTouchTap={this.fncHandleSave}
            style={{float: 'right', marginRight: '10px'}}/>
        ,
    ];

    render()
    {
        return (
            <div>
                <Dialog
                    title="Criando um novo curso"
                    actions={this.actions}
                    modal={true}
                    contentStyle={{width: '80%', maxWidth: 'none'}}
                    open={this.state.open}>
                    <TextField
                        hintText="Nome do curso"
                        floatingLabelText="Nome"
                        type="text"
                        errorText={this.state.errorText.name}
                        fullWidth={true}
                        ref={(input) => this.name = input}/>
                    <TextField
                        hintText="Informe a operação do curso"
                        floatingLabelText="Operação"
                        type="text"
                        errorText={this.state.errorText.operation}
                        fullWidth={true}
                        ref={(input) => this.operation = input}/>
                    <TextField
                        hintText="Informe o objetivo do curso"
                        floatingLabelText="Objetivo"
                        type="text"
                        errorText={this.state.errorText.objective}
                        fullWidth={true}
                        ref={(input) => this.objective = input}/>

                    <TextField
                        hintText="Informe o preço do curso. Exemplo de mil reais (1000.00)"
                        floatingLabelText="Preço"
                        type="number"
                        errorText={this.state.errorText.price}
                        style={{width: '49%', float: 'left'}}
                        ref={(input) => this.price = input}>
                    </TextField>
                    <TextField
                        hintText="Informe a carga horária do curso"
                        floatingLabelText="Carga hora"
                        type="number"
                        errorText={this.state.errorText.hours}
                        style={{width: '49%', float: 'right'}}
                        ref={(input) => this.hours = input}>
                        <InputMask mask="9999" maskChar={null}/>
                    </TextField>

                </Dialog>

                {this.state.crud ? (<Crud/>) : null}

            </div>
        );
    }
}

export
default
Information;