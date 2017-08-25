import React, {Component} from "react";
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';

class SubGrade extends Component {

    constructor() {
        super();
        this.state = {
            open: true,};
    }

    fncHandleClose = () => this.setState({open: false});

    fncHandleSave = () => this.setState({open: false});

    questions = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
    question = this.questions.map((question) =>
        <Checkbox key={question} label={"Descrição do curso "+ question}/>
    );

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
    ];

    render() {
        return (
            <Dialog
                title="Adicionando sub categotia"
                autoScrollBodyContent={true}
                actions={this.actions}
                modal={true}
                style={{margin:'0'}}
                titleStyle={{padding:'15px'}}
                contentStyle={{width: '80%', maxWidth: 'none', marginTop:'-40px'}}
                open={this.state.open}>

                <TextField
                    id="grade"
                    hintText="Nome da sub categoria"
                    floatingLabelText="Nome da sub categoria"
                    fullWidth={true}
                    errorText={''}
                />
                <h4 className="title">Cursos</h4>
                <div style={{overflow: 'auto', height: '200px'}}>
                    {this.question}
                </div>
                <br/>

            </Dialog>

        );
    }
}

export default SubGrade;