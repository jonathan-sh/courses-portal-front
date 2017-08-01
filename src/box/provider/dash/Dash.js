import React, { Component } from "react";
import HeaderBar from './HeaderBar';
import NavigationBar from './NavigationBar';
import './../../../style/css/provider/provider.css';

class Dash extends Component {

    render() {
        return (
            <div>
                <HeaderBar />
                <NavigationBar />
                <div className="content-child center padding-left-200">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default Dash;


