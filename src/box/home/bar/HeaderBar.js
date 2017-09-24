import React, {Component} from "react";
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';
import Download from 'material-ui/svg-icons/file/file-download';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';
import AppsIcon from 'material-ui-icons/Apps';
import SingIn from './../sign-in/SingIn';
import LoginStudent from './../login/LoginStudent';
import LoginProvider from './../login/LoginProvider';
import ForgotPassword from './../login/ForgotPassword';
import PubSub from 'pubsub-js';
import history from '../../../service/router/History';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {showModalLoginStudent:false,
            showModalSingIn:false,
            showModalForgotPassword:false,
            showModalLoginProvider:false};
    }

    componentDidMount(){
        PubSub.subscribe('close-home-model', this.closeAll);
    }

    style={btSingIn:{marginTop: "0px"},
        btLogin:{color:"#fff"},
        menu:{display: 'inline-block',margin: '16px 32px 16px 0',}
    };

    closeAll = (key, value) =>{
        this.setState({showModalLoginStudent:false,
            showModalSingIn:false,
            showModalForgotPassword:value,
            showModalLoginProvider:false});
    };

    showModal = (type)=>{
        let modal = {[type]:true};
        this.setState(modal);
    };

    goToHome = ()=>{
        history.push('/');
    };

    leftButtons = () => (
        <div  style={this.style.btSingIn}>

            <IconMenu
                iconButtonElement={<IconButton><AppsIcon /></IconButton>}
                anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                targetOrigin={{horizontal: 'left', vertical: 'top'}}
            >
                <MenuItem
                    primaryText="Copy & Paste"
                    rightIcon={<ArrowDropRight />}
                    menuItems={[
                        <MenuItem primaryText="Cut" />,
                        <MenuItem primaryText="Copy" />,
                        <Divider />,
                        <MenuItem primaryText="Paste" />,
                    ]}
                />

                <MenuItem
                    primaryText="Case Tools"
                    rightIcon={<ArrowDropRight />}
                    menuItems={[
                        <MenuItem primaryText="UPPERCASE" />,
                        <MenuItem primaryText="lowercase" />,
                        <MenuItem primaryText="CamelCase" />,
                        <MenuItem primaryText="Propercase" />,
                    ]}
                />
                <Divider />
                <MenuItem primaryText="Download" leftIcon={<Download />} />
                <Divider />
                <MenuItem value="Del" primaryText="Delete" />

            </IconMenu>



            <RaisedButton  style={this.style.btSingIn}
                           label="CRIAR UMA CONTA"
                           secondary={true}
                           onClick={()=>this.showModal('showModalSingIn')}/>
            <FlatButton rippleColor="#fff"
                        style={this.style.btLogin}
                        label="Estudante" secondary={false}
                        onClick={()=>this.showModal('showModalLoginStudent')}/>
            <FlatButton rippleColor="#fff"
                        style={this.style.btLogin}
                        label="Empresa" secondary={false}
                        onClick={()=>this.showModal('showModalLoginProvider')}/>
        </div>
    );



    render() {
        return (
            <div className="headerBar">
                <AppBar
                    onTitleTouchTap={this.goToHome}
                    titleStyle={{cursor: 'pointer'}}
                    showMenuIconButton={false}
                    title={<span >COURSE</span>}
                    iconStyleRight={this.style.btSingIn}
                    iconElementRight={this.leftButtons()}
                />
                {(this.state.showModalSingIn) ? <SingIn/> : null}
                {(this.state.showModalLoginStudent) ? <LoginStudent/> : null}
                {(this.state.showModalLoginProvider) ? <LoginProvider/> : null}
                {(this.state.showModalForgotPassword) ? <ForgotPassword/> : null}
            </div>
        );
    }
}
export default App;
