import  "./style/css/index.css";
import React, {Component} from "react";
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import SingIn from './box/home/sign-in/SingIn';
import Login from './box/home/login/Login';
import PubSub from 'pubsub-js';
class App extends Component {

    constructor(props) {
        super(props);
        this.state = {showModalLogin:false,showModalSingIn:false};
    }

    componentDidMount(){
        PubSub.subscribe('close-home-model', this.closeAll);
    }

    style={btSingIn:{marginTop: "5px"},
        btLogin:{color:"#fff"},
        menu:{display: 'inline-block',margin: '16px 32px 16px 0',}
    };

    closeAll = () =>{
        this.setState({showModalLogin:false,showModalSingIn:false});
    };

    showModal = (type)=>{
        let modal = {[type]:true};
        this.setState(modal);
    };

    leftButtons = () => (
        <div >
            <RaisedButton  style={this.style.btSingIn}
                           label="CRIAR UMA CONTA"
                           secondary={true}
                           onClick={()=>this.showModal('showModalSingIn')}/>
            <FlatButton rippleColor="#fff"
                        style={this.style.btLogin}
                        label="LOGIN" secondary={false}
                        onClick={()=>this.showModal('showModalLogin')}/>
        </div>
    );



    render() {
        return (
           <div className="home">
               <AppBar
                   showMenuIconButton={false}
                   title={<span >COURSE</span>}
                   iconElementRight={this.leftButtons()}
               />
               {(this.state.showModalSingIn) ? <SingIn/> : null}
               {(this.state.showModalLogin) ? <Login/> : null}
           </div>
        );
    }
}
export default App;
