import React, { Component } from "react";
import HeaderBar from './HeaderBar';
import NavigationBar from './NavigationBar';

class Dash extends Component {

    render() {
        return (
            <div>
                <HeaderBar />
                <NavigationBar />
            </div>
        );
    }
}

export default Dash;


