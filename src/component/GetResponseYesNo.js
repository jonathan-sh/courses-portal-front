import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

export default class GetResponseYesNo extends React.Component {

    constructor(props)
    {
        super(props);
        this.state ={ open: false };
    };

    fncHandleOpen = () => this.setState({open: true});

    fncIfYesCase = () =>
    {
        try
        {
            console.log(this.props.fncOnYesCase);
            this.props.fncOnYesCase();
        }
        catch (error)
        {
            console.log('fncOnYesCase not declared')
        }
        this.setState({open: false});
    };

    fncIfNoCase = () =>
    {
        try{this.props.fncOnNoCase(); }
        catch (error) {console.log('fncOnNoCase not declared')}
        this.setState({open: false});
    };

    render()
    {
        const actions =
        [
            <FlatButton
                label="SIM"
                primary={true}
                onClick={this.fncIfYesCase}
            />,
            <FlatButton
                label="NÃO"
                primary={true}
                keyboardFocused={true}
                onClick={this.fncIfNoCase}
            />
        ];

        return (
            <div style={{display: 'inline'}}>
                <RaisedButton
                    label={this.props.btLabel}
                    backgroundColor={this.props.btBackgroundColor}
                    icon={this.props.btIcon}
                    style={this.props.btStyle}
                    labelStyle={this.props.btLabelStyle}
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
    };
}