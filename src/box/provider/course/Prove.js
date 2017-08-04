import React, {Component} from "react";
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';
import Toggle from 'material-ui/Toggle';

class Prove extends Component {
    constructor() {
        super();
        this.state = {
            open: true,};
    }

    fncHandleClose = () => this.setState({open: false});

    fncHandleSave = () => this.setState({open: false});

    questions = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
    question = this.questions.map((question) =>
        <Checkbox key={question} label={"Descrição da pergunda "+ question}/>
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
                title="Adicionando prova"
                autoScrollBodyContent={true}
                actions={this.actions}
                modal={true}
                style={{margin:'0'}}
                titleStyle={{padding:'15px'}}
                contentStyle={{width: '80%', maxWidth: 'none', marginTop:'-40px'}}
                open={this.state.open}>
                <p>Você ainda pode seleconar [ X ] questoes: </p>

                <div style={{overflow: 'auto', height: '200px'}}>
                    {this.question}
               </div>
                <br/>
                <Toggle
                    label="Usar perguntas aleatorias"
                    defaultToggled={false}
                    style={{width:'0%'}}
                />

            </Dialog>

        );
    }
}

export default Prove;