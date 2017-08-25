import React, {Component} from "react";
import PubSub from 'pubsub-js';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import Grade from './Grade';

class Marketing extends Component {

    constructor(props) {
        super(props);
        this.state = {
            slideIndex: 0,
        };
    }

    componentDidMount(){
        PubSub.publish('header-label',"Marketing")
    }

    handleChange = (value) => {
        this.setState({
            slideIndex: value,
        });
    };

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

    fncShowGrade = () => this.setState({showGrade: true});

    render() {
        return (
            <div>
                {this.state.showGrade ? <Grade/>  : null}
                <br/>
                <br/>
                <Tabs
                    inkBarStyle={this.styles.tabs}
                    onChange={this.handleChange}
                    value={this.state.slideIndex}
                >
                    <Tab style={this.styles.tab} label="Barra" value={0} />
                    <Tab style={this.styles.tab} label="Sobre" value={1} />
                    <Tab style={this.styles.tab} label="Roda-pé" value={2} />
                </Tabs>
                <SwipeableViews
                    index={this.state.slideIndex}
                    onChangeIndex={this.handleChange}
                >
                    <div>
                        <h3 className="title">Categorias</h3>
                        <RaisedButton
                            label={"CATEGORIA A"}
                            fullWidth={true}
                            backgroundColor="#2dc7a2"
                            labelStyle={{color: '#FFF'}}
                            style={{marginTop: '10px'}}>
                        </RaisedButton>
                        <RaisedButton
                            label={"CATEGORIA B"}
                            fullWidth={true}
                            backgroundColor="#2dc7a2"
                            labelStyle={{color: '#FFF'}}
                            style={{marginTop: '10px'}}>
                        </RaisedButton>
                        <RaisedButton
                            label={"CATEGORIA C"}
                            fullWidth={true}
                            backgroundColor="#2dc7a2"
                            labelStyle={{color: '#FFF'}}
                            style={{marginTop: '10px'}}>
                        </RaisedButton>
                        <RaisedButton
                            onTouchTap={() => this.fncShowGrade()}
                            label="adicinar categoria"
                            backgroundColor="#0ac752"
                            labelStyle={{color: 'white'}}
                            style={{float: 'right', margin: '20px 0 20px 20px'}}/>

                    </div>
                    <div style={this.styles.slide}>
                        <TextField
                            id="description"
                            hintText="Descrivo"
                            floatingLabelText="Descrivo"
                            fullWidth={true}
                            errorText={''}
                        />
                        <TextField
                            id="about"
                            hintText="Sobre"
                            floatingLabelText="Sobre"
                            fullWidth={true}
                        />
                    </div>
                    <div style={this.styles.slide}>
                        <TextField
                            id="footer"
                            hintText="Roda-pé"
                            floatingLabelText="Roda-pé"
                            fullWidth={true}
                        />
                    </div>
                </SwipeableViews>



            </div>
        )
    }
}

export default Marketing;
