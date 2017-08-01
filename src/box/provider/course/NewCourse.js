import React, {Component} from "react";
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Steps from './StepCourse';


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
            <FlatButton
                label="Salvar"
                primary={true}
                onTouchTap={this.handleSave}
            />,
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
                        hintText="operação do curso"
                        floatingLabelText="Operação"
                        type="text"
                        fullWidth={true}
                        ref={(input) => this.opration = input}/>
                    <TextField
                        hintText="objetivo do curso"
                        multiLine={true}
                        rows={1}
                        rowsMax={3}
                        floatingLabelText="Objetivo"
                        type="text"
                        fullWidth={true}
                        ref={(input) => this.objective = input}/>

                    <TextField
                        hintText="preço do curso"
                        floatingLabelText="Preço"
                        type="number"
                        style={{width:'49%',float:'left'}}
                        ref={(input) => this.price = input}/>
                    <TextField
                        hintText="carga horário do curso"
                        floatingLabelText="Carga hora"
                        type="number"
                        style={{width:'49%',float:'right'}}
                        ref={(input) => this.hours = input}/>

                </Dialog>

                {this.state.step ? (<Steps/>) : (<div></div>)}

            </div>
        );
    }
}

export default NewCourse;