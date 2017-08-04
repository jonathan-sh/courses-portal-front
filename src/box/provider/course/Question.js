import React, {Component} from "react";
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';
import ActionFavorite from 'material-ui/svg-icons/action/check-circle';
import ActionFavoriteBorder from 'material-ui/svg-icons/toggle/radio-button-unchecked';
import _ from 'lodash';


class Question extends Component {
    state = {
        open: true,
        checked: {A: false, B: false, C: false, D: false, E: false},
        errorText:{statement: '',
                   alternativeA:'',
                   alternativeB:'',
                   alternativeC:'',
                   alternativeD:'',
                   alternativeE:''}

    };

    styles = {
        inputText: {width: '85%', float: 'right'},
        icon: {width: '15%', float: 'left', paddingTop: '3%'},

    };

    fncHandleClose = () => this.setState({open: false});

    fncHandleSave = () => {
        if (this.fncValidQuestion()) {
            this.setState({open: false});
        }
    };

    fncSelected = (outKey) => {
        this.setState({errorText: {statement: ''}});
        let checked = this.state.checked;
        checked = _.forEach(checked, (c, key) => {
            checked[key] = key === outKey;
        });
        this.setState({'checked': checked});
    };


    fncValidQuestion = () => {
        let clean = {statement:'',
                      alternativeA: '',
                      alternativeB: '',
                      alternativeC: '',
                      alternativeD: '',
                      alternativeE: ''};

        this.setState({'errorText': clean});
        let status = false;
        let errors = {statement:'',
                      alternativeA: this.alternativeA.input.value,
                      alternativeB: this.alternativeB.input.value,
                      alternativeC: this.alternativeC.input.value,
                      alternativeD: this.alternativeD.input.value,
                      alternativeE: this.alternativeE.input.value};


        _.forEach(this.state.checked, (c) => {
            if (!status) {
                status = (c === true)
            }
        });

        if (!status) {errors.statement='Informe a  alternativa certa'}

        _.forEach(errors, (value, key) => {

            console.log(value);
            if (value === undefined)
            {
                status = false;
                errors[key]='Descreva esta alternativa';
            }
        });

        this.setState({'errorText': errors});

        return status;
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
                title="Adicionando material"
                actions={this.actions}
                modal={true}
                contentStyle={{width: '80%', maxWidth: 'none'}}
                open={this.state.open}
            >


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


                <span className="display-block height-80">
                    <Checkbox
                        checked={this.state.checked.A}
                        style={this.styles.icon}
                        onCheck={() => this.fncSelected('A')}
                        checkedIcon={<ActionFavorite/>}
                        uncheckedIcon={<ActionFavoriteBorder/>}
                        label="Esta é a certa"
                    />
                <TextField
                    hintText="descreva a alternatica A"
                    floatingLabelText="Alternativa A"
                    type="text"
                    style={this.styles.inputText}
                    errorText={this.state.errorText.alternativeA}
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
                        label="Esta é a certa"
                    />
                    <TextField
                        hintText="descreva a alternatica B"
                        floatingLabelText="Alternativa B"
                        type="text"
                        style={this.styles.inputText}
                        errorText={this.state.errorText.alternativeB}
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
                        label="Esta é a certa"
                    />
                    <TextField
                        hintText="descreva a alternatica C"
                        floatingLabelText="Alternativa C"
                        type="text"
                        style={this.styles.inputText}
                        errorText={this.state.errorText.alternativeC}
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
                        label="Esta é a certa"
                    />
                    <TextField
                        hintText="descreva a alternatica D"
                        floatingLabelText="Alternativa D"
                        type="text"
                        style={this.styles.inputText}
                        errorText={this.state.errorText.alternativeD}
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
                        label="Esta é a certa"
                    />
                    <TextField
                        hintText="descreva a alternatica E"
                        floatingLabelText="Alternativa E"
                        type="text"
                        style={this.styles.inputText}
                        errorText={this.state.errorText.alternativeE}
                        fullWidth={true}
                        ref={(input) => this.alternativeE = input}/>
                </span>

            </Dialog>

        );
    }
}

export default Question;