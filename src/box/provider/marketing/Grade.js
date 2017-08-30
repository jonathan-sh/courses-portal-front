import React, {Component} from "react";
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';
import SubGrade from './SubGrade';

class Grade extends Component
{

    constructor()
    {
        super();
        this.state =
        {
            open: true,
            courses: JSON.parse(localStorage.getItem('courses'))
        };
        console.log(this.state.courses, this.courses)
    };

    fncHandleClose = () => this.setState({open: false});

    fncHandleSave = () => this.setState({open: false});

    fncShowSubGrade = () => this.setState({showSubGrade: true});

    courses = [{id: 1, name:'Course 1'}, {id: 2, name:'Course 2'}];
    course = this.courses.map((course) =>
        <Checkbox key={course.id} label={course.name} />
    );

    actions = [
        <FlatButton
            label="Cancelar"
            primary={true}
            onTouchTap={this.fncHandleClose} />,
        <RaisedButton
            label="Salvar"
            backgroundColor="#0ac752"
            labelStyle={{color: 'white'}}
            onTouchTap={this.fncHandleSave}
            style={{float: 'right', marginRight: '10px'}} />
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
                    errorText={''} />
                <h4 className="title">Cursos</h4>
                <div style={{overflow: 'auto', height: '100px'}}>
                    {this.course}
                </div>
                <br/>
                <RaisedButton
                    label={"SUB A"}
                    fullWidth={true}
                    backgroundColor="#2dc7a2"
                    labelStyle={{color: '#FFF'}}
                    style={{marginTop: '10px'}} />
                <RaisedButton
                    onTouchTap={() => this.fncShowSubGrade()}
                    label="adicinar sub categoria"
                    backgroundColor="#0ac752"
                    labelStyle={{color: 'white'}}
                    style={{float: 'right', margin: '20px 0 20px 20px'}} />
                <br/>

                {this.state.showSubGrade ? <SubGrade/>  : null}

            </Dialog>

        );
    };
}



export default Grade;