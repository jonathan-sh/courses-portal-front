import React, {Component} from "react";
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';
import SubGrade from './SubGrade';

class Grade extends Component {

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

    fncShowSubGrade = () => this.setState({showSubGrade: true});

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
                title="Adicionando categotia"
                autoScrollBodyContent={true}
                actions={this.actions}
                modal={true}
                style={{margin:'0'}}
                titleStyle={{padding:'15px'}}
                contentStyle={{width: '80%', maxWidth: 'none', marginTop:'-40px'}}
                open={this.state.open}>

                <TextField
                    id="grade"
                    hintText="Nome da categoria"
                    floatingLabelText="Nome da categoria"
                    fullWidth={true}
                    errorText={''}
                />
                <h4 className="title">Cursos</h4>
                <div style={{overflow: 'auto', height: '100px'}}>
                    {this.question}
                </div>
                <br/>
                <RaisedButton
                    label={"SUB A"}
                    fullWidth={true}
                    backgroundColor="#2dc7a2"
                    labelStyle={{color: '#FFF'}}
                    style={{marginTop: '10px'}}>
                </RaisedButton>
                <RaisedButton
                    onTouchTap={() => this.fncShowSubGrade()}
                    label="adicinar sub categoria"
                    backgroundColor="#0ac752"
                    labelStyle={{color: 'white'}}
                    style={{float: 'right', margin: '20px 0 20px 20px'}}/>
                <br/>


                {this.state.showSubGrade ? <SubGrade/>  : null}

            </Dialog>

        );
    }
}



export default Grade;