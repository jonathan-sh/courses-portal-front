/**
 * Created by Igor Martucelli on 13/08/2017.
 */
import React, {Component} from 'react';
import Dropzone from '../../../../service/Dropzone';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import NewIco from 'material-ui/svg-icons/content/add';
import TextField from 'material-ui/TextField';
import LinearProgress from 'material-ui/LinearProgress';
import Toggle from 'material-ui/Toggle';

class Material extends Component {
    constructor(pros) {
        super(pros);
        this.state =
        {
            open: false, makeSave: false, material: {
                order: '',
                name: '',
                type: '',
                url: '',
                download: false,
                status: ''
            }
        };
    };


    fncHandleOpen = () => this.setState({open: true});

    fncHandleClose = () => this.setState({open: false});

    fncHandleChange = () =>
    {
        let material = this.state.material;
        material['download'] = !this.state.material.download;
        this.setState(material);
    };

    setData = (event, value, attribute) => {
        let material = this.state.material;
        material[attribute] = value;
        this.setState(material);
    };

    render() {
        const actions = [
            <FlatButton
                label="Cancelar"
                primary={true}
                onTouchTap={this.fncHandleClose}
            />,
            <FlatButton
                label="Salvar"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.fncHandleSave}
            />,
        ];

        return (
            <div>
                <RaisedButton
                    label="material"
                    backgroundColor="#0ac752"
                    icon={<NewIco color="#FFF"/>}
                    labelStyle={{color: 'white'}}
                    keyboardFocused={true}
                    onTouchTap={this.fncHandleOpen}
                    style={{float: 'right', margin: '20px 0 20px 20px'}}/>
                <Dialog
                    title="Adicionando material"
                    actions={actions}
                    modal={true}
                    contentStyle={{width: '80%', maxWidth: 'none'}}
                    open={this.state.open}>
                    {this.state.makeSave ? <LinearProgress mode="indeterminate"/> : null}

                    <TextField
                        hintText="Descrição"
                        floatingLabelText="Descrição"
                        fullWidth={true}
                        errorText={''}
                        ref={(input) => this.name = input}
                        onChange={(event, value) => this.setData(event, value, 'name')}
                        value={this.state.material.name}/>
                    <Dropzone
                        limitFile={true}
                    />

                    <Toggle
                        label="Passivel de download?"
                        defaultToggled={this.state.material.download}
                        onToggle={this.fncHandleChange}
                        labelPosition="right"
                        style={{margin: 20}}
                    />

                </Dialog>
            </div>
        );
    }
}

export default Material;