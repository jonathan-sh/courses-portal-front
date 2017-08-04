import React, {Component} from "react";
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';


class Material extends Component {
    state = {
        open: true,
        step: false
    };

    handleClose = () => this.setState({open: false});
    handleSave = () => this.setState({step: true, open: false});

    render() {
        const actions = [
            <FlatButton
                label="Cancelar"
                primary={true}
                onTouchTap={this.handleClose}
            />,
            <RaisedButton
                label="Salvar"
                backgroundColor="#0ac752"
                labelStyle={{color: 'white'}}


                onTouchTap={this.handleSave}
                style={{float: 'right', marginRight: '10px'}}/>
            ,
        ];

        return (
            <Dialog
                title="Adicionando material"
                actions={actions}
                modal={true}
                contentStyle={{width: '80%', maxWidth: 'none'}}
                open={this.state.open}
            >

            </Dialog>

        );
    }
}

export default Material;