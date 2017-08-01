import React from "react";
import HeaderBar from './HeaderBar';
import NavigationBar from './NavigationBar';
import './../../../style/css/provider/provider.css';
import DashRoute from './../../../box/provider/dash/DashRoute';

const Dash = (props) => 
{
    const player = DashRoute.get(props.match.params.way);

    if (!player) 
    {
        return <div><h1>404 CARALHO</h1></div>
    }

    return (
        <div>
            <HeaderBar />
            <NavigationBar />
            <div className="content-child center padding-left-200">
                <player.item />
            </div>
        </div>
    );
}

export default Dash;


