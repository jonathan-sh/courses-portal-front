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
import Avatar from 'material-ui/Avatar';
import srcImage from '../../../style/img/course-not-found-2.jpg';


class App extends Component {

    constructor(props) {
        super(props);
        this.state =
        {
            showModalLoginStudent:false,
            showModalSingIn:false,
            showModalForgotPassword:false,
            showModalLoginProvider:false,
            menu:[],
            entity: JSON.parse(localStorage.getItem('entity'))
        };
        this.URl = 'http://localhost:3000';

    }

    componentDidMount(){
        PubSub.subscribe('close-home-model', this.closeAll);
        PubSub.subscribe('logged', this.loadEntity);
        this.buildCourseMenu();
    }

    loadEntity = () =>
    {
        this.setState({'entity': JSON.parse(localStorage.getItem('entity'))});
    };

    style={btSingIn:{marginTop: "12x"},
        btLabel:{color:"#fff", marginTop:"12px"},
        menu:{display: 'inline-block',margin: '16px 32px 16px 0',
        btnLogged:{padding: '5px'}}
    };

    closeAll = (key, value) =>{
        this.setState({'showModalLoginStudent':false,
            'showModalSingIn':false,
            'showModalForgotPassword':value,
            'showModalLoginProvider':false});
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
               <div key={index}>
                   <MenuItem
                       rightIcon={<ArrowDropRight />}
                       value={grade.description}
                       primaryText={grade.description}
                       menuItems={(grade.courses.length>0)? this.buildMenu(grade.courses) : null} />
               </div>
            );
            this.setState({'menu': menu});
        }
    };

    buildMenu = (list) =>{
        let item = list.map((item, index) =>
            <div key={index}>
                <MenuItem
                    value={item.description}
                        onTouchTap={() => {window.open('/course/'+item._id, '_self')}}
                    primaryText={item.name} />

            </div>
        );
        return item;
    };

    leftButtons = () => (
        <div  style={this.style.btSingIn}>

            <IconMenu
                iconButtonElement={<FlatButton style={this.style.btLabel} label="Cursos" />}
                anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                targetOrigin={{horizontal: 'left', vertical: 'top'}}
                style={{marginRight: '5px'}}>
                {this.state.menu}
            </IconMenu>

            {
                (this.state.entity === null) ?
                    (this.notLogged()) : (this.logged())
            }

        </div>
    );

    notLogged = () =>
    (
        <custom>
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
        </custom>
    );

    logged = () =>
    (
        <IconMenu
            iconButtonElement=
                {
                    <FlatButton
                        labelPosition="before"
                        style={this.style.btLabel}
                        label={'Olá, ' + this.state.entity.name}
                        icon={<Avatar src={srcImage} size={30}/>}
                    />
                }
            anchorOrigin={{horizontal: 'left', vertical: 'top'}}
            targetOrigin={{horizontal: 'left', vertical: 'top'}}
            style={{marginRight: '5px'}}>
            <MenuItem
                primaryText="Sair"
                onTouchTap={() => this.logoff()}
            />
        </IconMenu>
    );

    logoff = () =>
    {
        localStorage.removeItem('entity');
        localStorage.removeItem('student');
        localStorage.removeItem('auth-token');
        history.push('/login/student');
    };

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