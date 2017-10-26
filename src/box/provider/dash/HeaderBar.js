import React, {Component} from "react";
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import LogoutIco from 'material-ui/svg-icons/navigation/arrow-forward';
import history from '../../../service/router/History';
import PubSub from 'pubsub-js';

class HeaderBar extends Component
{
    constructor()
    {
        super();
        this.state = {label:''};
        PubSub.subscribe('header-label', this.fncChangeHeaderLabel);
    };

    fncChangeHeaderLabel = (key, label)=>
    {
        this.setState({'label':label});
    };

    logOut = () =>
    {
        localStorage.removeItem('auth-token');
        localStorage.removeItem('provider');
        localStorage.removeItem('courses');
        localStorage.removeItem('entity');
        history.push('/');
    };

    render()
    {
        return (
            <div>
                <AppBar
                    showMenuIconButton={false}
                    style={{paddingLeft:'220px'}}
                    title={this.state.label}
                    iconElementRight=
                    {
                        <IconButton tooltip="Sair"
                        onTouchTap={this.logOut}>
                            <LogoutIco/>
                        </IconButton>
                    }
                />
            </div>
        )
    };
}

export default HeaderBar;
