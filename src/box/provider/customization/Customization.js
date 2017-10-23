import React, {Component} from "react";
import PubSub from 'pubsub-js';
import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import Bar from './Bar';
import Body from './Body';
import Footer from './Footer';

class Customization extends Component {

    constructor(props) {
        super(props);
        this.state = {slideIndex: 0};
    }

    componentDidMount()
    {
        PubSub.publish('header-label',"Personalização");
    }

    handleChange = (value) => this.setState({slideIndex: value});

    styles = {
        headline: {
            fontSize: 24,
            paddingTop: 16,
            marginBottom: 12,
            fontWeight: 400,
        },
        slide: {
            padding: 10,
        },
        tabs:{
            backgroundColor:"rgb(0, 188, 212)",
            zIndex:2
        },
        tab:{
            backgroundColor:"#fff",
            color:"rgb(0, 188, 212)"
        }
    };

    render() {
        return (
            <div>
                <br/>
                <br/>
                <Tabs
                    inkBarStyle={this.styles.tabs}
                    onChange={this.handleChange}
                    value={this.state.slideIndex} >
                    <Tab style={this.styles.tab} label="Categorias" value={0} />
                    <Tab style={this.styles.tab} label="Descritivos" value={1} />
                    <Tab style={this.styles.tab} label="Home face" value={2} />
                </Tabs>
                <SwipeableViews
                    index={this.state.slideIndex}
                    onChangeIndex={this.handleChange} >

                    <Bar />
                    <Body style={this.styles.slide} />
                    <Footer style={this.styles.slide} />

                </SwipeableViews>
            </div>
        )
    }
}

export default Customization;
