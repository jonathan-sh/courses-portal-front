import React, {Component} from "react";
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';
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
            showModalLoginProvider:false,
            menu:[]};
    }

    componentDidMount(){
        PubSub.subscribe('close-home-model', this.closeAll);
        this.buildCourseMenu();
    }

    style={btSingIn:{marginTop: "12x"},
        btLabel:{color:"#fff", marginTop:"12px"},
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

    buildCourseMenu = () =>{
        let grades = JSON.parse(localStorage.getItem('grade'));
        if (grades!==undefined && grades!==null)
        {
            let menu = grades.map((grade, index) =>
               <di key={index}>
                   <MenuItem
                       rightIcon={<ArrowDropRight />}
                       value={grade.description}
                       primaryText={grade.description}
                       menuItems={(grade.courses.length>0)? this.buildMenu(grade.courses) : null} />
               </di>
            );
            this.setState({'menu': menu});
        }
    };

    buildMenu = (list) =>{
        let item = list.map((item, index) =>
            <di key={index}>
                <MenuItem
                    value={item.description}
                    primaryText={item.name} />

            </di>
        );
        return item;
    };

    leftButtons = () => (
        <div  style={this.style.btSingIn}>

            <IconMenu
                iconButtonElement={<FlatButton style={this.style.btLabel} label="Coursos" />}
                anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                targetOrigin={{horizontal: 'left', vertical: 'top'}}>
                {this.state.menu}
            </IconMenu>



            <RaisedButton  style={this.style.btLabel}
                           label="CRIAR UMA CONTA"
                           secondary={true}
                           onClick={()=>this.showModal('showModalSingIn')}/>
            <FlatButton rippleColor="#fff"
                        style={this.style.btLabel}
                        label="Estudante" secondary={false}
                        onClick={()=>this.showModal('showModalLoginStudent')}/>
            <FlatButton rippleColor="#fff"
                        style={this.style.btLabel}
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