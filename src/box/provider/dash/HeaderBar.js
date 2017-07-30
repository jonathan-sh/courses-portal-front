import React, {Component} from "react";
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import LogoutIco from 'material-ui/svg-icons/navigation/arrow-forward';

class HeaderBar extends Component {


    render() {
        return (
            <div>
                <AppBar
                    showMenuIconButton={false}
                    iconElementRight={  <IconButton tooltip="Sair">
                        <LogoutIco/>
                    </IconButton>}
                />
            </div>
        )
    }
}

export default HeaderBar;
