/**
 * Created by Igor Martucelli on 13/08/2017.
 */
import React, {Component} from 'react';
import Dropzone from '../../../service/Dropzone';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import NewIco from 'material-ui/svg-icons/content/add';
import TextField from 'material-ui/TextField';
import LinearProgress from 'material-ui/LinearProgress';
import Toggle from 'material-ui/Toggle';

class QuestionPhoto extends Component
{
    constructor() {
        super();
        this.state = { open: false, makeSave: false};
    };

    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    fncHandleSave = () => {
        this.setState({makeSave: true});
    };

    handleChange = () =>
    {

    }

    render()
    {
        const actions = [
            <FlatButton
                label="Cancelar"
                primary={true}
                onTouchTap={this.handleClose}
            />,
            <FlatButton
                label="Salvar"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.fncHandleSave}
            />,
        ];

        return(
            <div>
                <RaisedButton
                    label="material"
                    backgroundColor="#0ac752"
                    icon={<NewIco color="#FFF"/>}
                    labelStyle={{color: 'white'}}
                    keyboardFocused={true}
                    onTouchTap={this.handleOpen}
                    style={{float: 'right', margin: '20px 0 20px 20px'}}/>
                <Dialog
                    title="Adicionando material"
                    actions={actions}
                    modal={true}
                    contentStyle={{width: '80%', maxWidth: 'none'}}
                    open={this.state.open} >
                    {this.state.makeSave?  <LinearProgress mode="indeterminate" /> : null}

                    <TextField
                        hintText="Descrição"
                        floatingLabelText="Descrição"
                        fullWidth={true}
                        errorText={''}
                        ref={(input) => { this.name = input; }}
                    />
                    <Dropzone
                        limitFile={true}
                    />

                    <Toggle
                        label="Tornar material publico?"
                        defaultToggled={false}
                        onToggle={this.handleChange}
                        labelPosition="right"
                        style={{margin: 20}}
                    />

                </Dialog>
            </div>
        );
    }
}

export default QuestionPhoto;