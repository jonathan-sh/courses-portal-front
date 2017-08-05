import React, {Component} from "react";
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';
import ActionFavorite from 'material-ui/svg-icons/action/check-circle';
import AddImage from 'material-ui/svg-icons/image/add-a-photo';
import ActionFavoriteBorder from 'material-ui/svg-icons/toggle/radio-button-unchecked';
import _ from 'lodash';


class Question extends Component {
    constructor() {
        super();
        this.state = {
            open: true,
            checked: {A: false, B: false, C: false, D: false, E: false},
            correct: '',
            errorText: { statement: '',
                         A: '',
                         B: '',
                         C: '',
                         D: '',
                         E: ''}

        };
    }

    styles = {
        inputText: {width: '94%', float: 'right'},
        icon: {width: '5%', float: 'left', paddingTop: '3.2%'},
        btnAddImage: {}

    };

    fncHandleClose = () => this.setState({open: false});

    fncHandleSave = () => {
        if (this.fncValidQuestion()) {
            this.setState({open: false});
        }
    };

    fncSelected = (outKey) => {
        this.setState({errorText: {statement: ''}});
        this.setState({correct: outKey});
        let checked = this.state.checked;
        checked = _.forEach(checked, (c, key) => {
            checked[key] = key === outKey;
        });
        this.setState({'checked': checked});
    };

    fncValidQuestion = () => {
        let errors = {
            statement: '',
            A: '',
            B: '',
            C: '',
            D: '',
            E: ''
        };

        this.setState({'errorText': errors});

        let status = false;
        let question = this.fncMakeQuestionData();

        status = this.fncValidValue(question.statement) && this.fncValidValue(question.correct);
        if (!status) {
            errors.statement = 'Informe o enunciado e alternativa correta'
        }

        _.forEach(question.alternatives, (value, key) => {

            if (!this.fncValidValue(value)) {
                status = false;
                errors[key] = 'Informe a descricação da alternativa [ ' + key + ' ]';
            }
        });

        this.setState({'errorText': errors});

        return status;
    };

    fncValidValue = (value) => {
        return value !== undefined && value !== ""
    };

    fncMakeQuestionData = () => {
        let alternatives = {
            A: this.alternativeA.input.value,
            B: this.alternativeB.input.value,
            C: this.alternativeC.input.value,
            D: this.alternativeD.input.value,
            E: this.alternativeE.input.value
        };
        let statement = this.statement.input.refs.input.value;
        let correct = this.state.correct;

        let question = {
            'statement': statement,
            'alternatives': alternatives,
            'correct': correct
        };

        return question;
    };


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
                title="Adicionando questão"
                autoScrollBodyContent={true}
                actions={this.actions}
                modal={true}
                style={{margin:'0'}}
                titleStyle={{padding:'15px'}}
                bodyStyle={{minHeight: '480px'}}
                contentStyle={{width: '90%', maxWidth: 'none', marginTop:'-50px'}}
                open={this.state.open}>

                <TextField
                    hintText="Informe o enunciado"
                    multiLine={true}
                    rows={1}
                    rowsMax={5}
                    errorText={this.state.errorText.statement}
                    floatingLabelText="Enunciado"
                    type="text"
                    fullWidth={true}
                    ref={(input) => this.statement = input}/>

                <RaisedButton
                    label="adicionar image"
                    backgroundColor="rgb(77, 156, 138)"
                    icon={<AddImage color="#FFF"/>}
                    onTouchTap={this.fncNewCourse}
                    style={this.styles.btnAddImage}
                    labelStyle={{color: 'white'}}/>

                <span className="display-block height-80">
                        <Checkbox
                             checked={this.state.checked.A}
                             style={this.styles.icon}
                             onCheck={() => this.fncSelected('A')}
                             checkedIcon={<ActionFavorite/>}
                             uncheckedIcon={<ActionFavoriteBorder/>}
                             label="[A]"/>

                        <TextField
                            hintText="descreva a alternatica A"
                            floatingLabelText="Alternativa A"
                            type="text"
                            style={this.styles.inputText}
                            errorText={this.state.errorText.A}
                            fullWidth={true}
                            ref={(input) => this.alternativeA = input}/>

                </span>


                <span className="display-block height-80">
                    <Checkbox
                        checked={this.state.checked.B}
                        style={this.styles.icon}
                        onCheck={() => this.fncSelected('B')}
                        checkedIcon={<ActionFavorite/>}
                        uncheckedIcon={<ActionFavoriteBorder/>}
                        label="[B]"
                    />
                    <TextField
                        hintText="descreva a alternatica B"
                        floatingLabelText="Alternativa B"
                        type="text"
                        style={this.styles.inputText}
                        errorText={this.state.errorText.B}
                        fullWidth={true}
                        ref={(input) => this.alternativeB = input}/>
                </span>

                <span className="display-block height-80">
                    <Checkbox
                        checked={this.state.checked.C}
                        style={this.styles.icon}
                        onCheck={() => this.fncSelected('C')}
                        checkedIcon={<ActionFavorite/>}
                        uncheckedIcon={<ActionFavoriteBorder/>}
                        label="[C]"
                    />
                    <TextField
                        hintText="descreva a alternatica C"
                        floatingLabelText="Alternativa C"
                        type="text"
                        style={this.styles.inputText}
                        errorText={this.state.errorText.C}
                        fullWidth={true}
                        ref={(input) => this.alternativeC = input}/>
                </span>
                <span className="display-block height-80">
                    <Checkbox
                        checked={this.state.checked.D}
                        style={this.styles.icon}
                        onCheck={() => this.fncSelected('D')}
                        checkedIcon={<ActionFavorite/>}
                        uncheckedIcon={<ActionFavoriteBorder/>}
                        label="[D]"
                    />
                    <TextField
                        hintText="descreva a alternatica D"
                        floatingLabelText="Alternativa D"
                        type="text"
                        style={this.styles.inputText}
                        errorText={this.state.errorText.D}
                        fullWidth={true}
                        ref={(input) => this.alternativeD = input}/>
                </span>
                <span className="display-block height-80">
                    <Checkbox
                        checked={this.state.checked.E}
                        style={this.styles.icon}
                        onCheck={() => this.fncSelected('E')}
                        checkedIcon={<ActionFavorite/>}
                        uncheckedIcon={<ActionFavoriteBorder/>}
                        label="[E]"
                    />
                    <TextField
                        hintText="descreva a alternatica E"
                        floatingLabelText="Alternativa E"
                        type="text"
                        style={this.styles.inputText}
                        errorText={this.state.errorText.E}
                        fullWidth={true}
                        ref={(input) => this.alternativeE = input}/>
                </span>

            </Dialog>

        );
    }
}

export default Question;