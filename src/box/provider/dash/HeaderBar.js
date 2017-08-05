import React, {Component} from "react";
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import LogoutIco from 'material-ui/svg-icons/navigation/arrow-forward';
import history from '../../../service/router/History';

class HeaderBar extends Component
{
    logOut = () =>
    {
       localStorage.removeItem('auth-token');
       history.push('/login/provider');
    };

    render()
    {
        return (
            <div>
                <AppBar
                    showMenuIconButton={false}
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
