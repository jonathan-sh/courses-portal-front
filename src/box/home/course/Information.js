import React, {Component} from 'react';
import HeaderBar from './../bar/HeaderBar';
import Steps from "./Setps";
import About from './About';

export default class Information extends Component {

    constructor(props) {
        super(props);
        console.log(props.match.params);
    };


    render() {

        return (
            <div>
                <div style={{height:'65px'}}>
                    <HeaderBar/>
                </div>
                <div style={{width: '60%', margin: 'auto'}}>
                    <About/>
                    <Steps/>
                </div>
            </div>
        );
    }
}