import React, {Component} from "react";
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Steps from './StepCourse';
import InputMask from 'react-input-mask';
import RaisedButton from 'material-ui/RaisedButton';


class NewCourse extends Component {
    state = {
        open: true,
        step: false
    };

    handleClose = () => this.setState({open: false});
    handleSave = () => this.setState({step: true,open: false});

    render() {
        const actions = [
            <FlatButton
                label="Cancelar"
                primary={true}
                onTouchTap={this.handleClose}
            />,
            <RaisedButton
                label="salvar"
                backgroundColor="#0ac752"
                labelStyle={{color:'white'}}
                onTouchTap={this.handleSave}
                style={{float:'right', marginRight:'10px'}}/>
           ,
        ];

        return (
            <div>
                <Dialog
                    title="Criando um novo curso"
                    actions={actions}
                    modal={true}
                    contentStyle={{width: '80%', maxWidth: 'none'}}
                    open={this.state.open}
                >
                    <TextField
                        hintText="nome do curso"
                        floatingLabelText="Nome"
                        type="text"
                        fullWidth={true}
                        ref={(input) => this.name = input}/>
                    <TextField
                        hintText="Informe a operação do curso"
                        floatingLabelText="Operação"
                        type="text"
                        fullWidth={true}
                        ref={(input) => this.opration = input}/>
                    <TextField
                        hintText="Informe o objetivo do curso"
                        multiLine={true}
                        rows={1}
                        rowsMax={3}
                        floatingLabelText="Objetivo"
                        type="text"
                        fullWidth={true}
                        ref={(input) => this.objective = input}/>

                    <TextField
                        hintText="Informe o preço do curso. Exemplo de mil reais (1000.00)"
                        floatingLabelText="Preço"
                        type="number"
                        style={{width:'49%',float:'left'}}
                        ref={(input) => this.price = input}>
                    </TextField>
                    <TextField
                        hintText="Informe a carga horária do curso"
                        floatingLabelText="Carga hora"
                        type="number"
                        style={{width:'49%',float:'right'}}
                        ref={(input) => this.hours = input}>
                       <InputMask  mask="9999" maskChar={null}/>
                    </TextField>

                </Dialog>

                {this.state.step ? (<Steps/>) : (<div></div>)}

            </div>
        );
    }
}

export default NewCourse;