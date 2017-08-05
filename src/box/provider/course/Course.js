import React, {Component} from "react";
import TableFound from './Table';
import FindIco from 'material-ui/svg-icons/action/search';
import TextField from 'material-ui/TextField';
import NewIco from 'material-ui/svg-icons/content/add';
import BackIco from 'material-ui/svg-icons/content/reply-all';
import RaisedButton from 'material-ui/RaisedButton';
import Information from './Information';
import PubSub from 'pubsub-js';

class Course extends Component {


    constructor() {
        super();
        this.state = {isCrud: false, newCourse: false, showTable:true};
    }

    componentDidMount(){
        PubSub.publish('header-label','Pesquisar curso');
        PubSub.subscribe('switch-to-crud', this.fncInCrud);
    }

    styles = {
        inputTextCourse: {width: '72%'},
        btnCourse: {width: '12%', marginLeft: '2%'}
    };

    fncNewCourse = () => {
        PubSub.publish('header-label','Criando curso');
        this.setState({newCourse: true});
    };

    fncFindCourse = () => alert('alert');

    fncInCrud = (key, value) => {
        if (value)
        {
            this.setState({isCrud: true, showTable: false});
        }
        else
        {
            this.fncBackToFind();
        }

    };

    fncBackToFind = () => this.setState({isCrud: false, newCourse: false, showTable: true});

    fncCheck = () => {return this.state.newCourse || this.state.isCrud};

    render() {
        return (
            <div>
                {/*header found*/}
                <span className="display-block">
                    <TextField
                        hintText="pesquisar curso"
                        floatingLabelText="Pesquisar"
                        type="text"
                        disabled={this.fncCheck()}
                        fullWidth={false}
                        style={this.styles.inputTextCourse}
                        ref={(input) => this.search = input}/>
                    <RaisedButton
                        label="buscar"
                        backgroundColor="#ff7500"
                        icon={<FindIco color="#FFF"/>}
                        onTouchTap={this.fncFindCourse}
                        disabled={this.fncCheck()}
                        style={this.styles.btnCourse}
                        labelStyle={{color: 'white'}}/>
                    <RaisedButton
                        label={(this.fncCheck())? 'voltar' : 'novo'}
                        backgroundColor={this.fncCheck()? '#ff7500' : '#0ac752'}
                        icon={this.fncCheck()? <BackIco color='#FFF'/> : <NewIco color='#FFF'/>}
                        onTouchTap={(this.fncCheck())? this.fncBackToFind : this.fncNewCourse }
                        style={this.styles.btnCourse}
                        labelStyle={{color: 'white'}}/>
                </span>

                <br/>


                {this.fncCheck() ? <Information/>  : null}

                {this.state.showTable ? <TableFound/>  : null}


            </div>
        )
    }
}

export default Course;
