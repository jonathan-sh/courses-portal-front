import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

export default class GetResponseYesNo extends React.Component {
    constructor(props)
    {
        super(props);
        this.state ={ open: false };
    }


    fncHandleOpen = () => {
        this.setState({open: true});
    };

    fncOnYesCase = () =>
    {
        this.props.fncIfYesOnTouchTap();
        this.fncHandleClose();
    };

    fncHandleClose = () => {
        this.setState({open: false});
    };

    render() {
        const actions =
        [
            <FlatButton
                label="SIM"
                primary={true}
                onClick={this.fncOnYesCase}
            />,
            <FlatButton
                label="NÃO"
                primary={true}
                keyboardFocused={true}
                onClick={this.fncHandleClose}
            />
        ];

        return (
            <div>
                <RaisedButton
                    label={this.props.btnLabel}
                    backgroundColor={this.props.btnBackgroundColor}
                    icon={this.props.btnIcon}
                    style={this.props.btnStyle}
                    labelStyle={this.props.btnLabelStyle}
                    onClick={this.fncHandleOpen} />
                <Dialog
                    title={this.props.title}
                    actions={actions}
                    modal={true}
                    open={this.state.open}
                    onRequestClose={this.fncHandleClose}>
                    {this.props.question}
                </Dialog>
            </div>
        );
    }
}