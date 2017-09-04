import React, {Component} from "react";
import TableFound from './Table';
import FindIco from 'material-ui/svg-icons/action/search';
import TextField from 'material-ui/TextField';
import NewIco from 'material-ui/svg-icons/content/add';
import BackIco from 'material-ui/svg-icons/content/reply-all';
import RaisedButton from 'material-ui/RaisedButton';
import Information from './Information';
import PubSub from 'pubsub-js';
import Crud from "./Crud";

class Course extends Component {

    constructor() {
        super();
        this.state = {isCrud: false, newCourse: false, showTable:true, course:''};
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

    fncFindCourse = () => alert('find');

    fncInCrud = (key, course) => {
        if (course !== undefined && course !==false)
        {
            this.setState({isCrud: true, showTable: false, 'course':course});
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

                {this.state.newCourse ? <Information/>  : null}

                {this.state.showTable ? <TableFound/>  : null}

                {this.state.isCrud ? <Crud course={this.state.course} />  : null}


            </div>
        )
    }
}

export default Course;
