/**
 * Created by Igor Martucelli on 13/08/2017.
 */
import React, {Component} from 'react';
import Dropzone from '../../../service/Dropzone';
import AddImage from 'material-ui/svg-icons/image/add-a-photo';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

class QuestionPhoto extends Component
{
    constructor()
    {
        super();
        this.state = { open: false};
    }

    styles =
    {
        inputText: {width: '94%', float: 'right'},
        icon: {width: '5%', float: 'left', paddingTop: '3.2%'},
        btnAddImage: {}
    };


    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

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
                onTouchTap={this.handleClose}
            />,
        ];

        return(
            <div>
                <RaisedButton
                    label="adicionar image"
                    backgroundColor="rgb(77, 156, 138)"
                    icon={<AddImage color="#FFF"/>}
                    onTouchTap={this.handleOpen}
                    style={this.styles.btnAddImage}
                    labelStyle={{color: 'white'}}/>

                <Dialog
                    title="Adicionar imagem da questão"
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                    autoScrollBodyContent={true} >

                    <Dropzone />
                </Dialog>
            </div>
        );
    }
}

export default QuestionPhoto;