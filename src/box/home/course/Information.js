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
                <div>
                    <HeaderBar/>
                </div>
                <div className="curse-home">
                    <div style={{backgroundColor:"rgba(0,0,0,0.5)", color:"#fff", padding: '5% 0 5% 0'}}>
                        <h3 className="title">NOME DO CURSO</h3>
                        <div style={{width: '80%', margin: 'auto'}}>
                            <About/>
                            <Steps/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}