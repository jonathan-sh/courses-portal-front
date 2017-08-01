import React, {Component} from "react";
import FindIco from 'material-ui/svg-icons/action/search';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import NewIco from 'material-ui/svg-icons/content/add';
import TableFound from './TableCourse';
import NewCourse from './NewCourse';

class Course extends Component {


    constructor() {
        super();
        this.state = {newCourse: false};
    }

    fncNewCourse = () => this.setState({newCourse: true});

    fncFindCourse = () => this.setState({newCourse: false});


    styles = {
        inputTextCourse: {width: '72%'},
        btnFindCourse: {width: '12%', marginRight: '2%', marginLeft:'2%'},
        btnNewCourse: {width: '12%'}
    };


    render() {
        return (
            <div>
                {/*search and btn for new course*/}
                <span className="display-block">
                  <TextField
                      hintText="pesquisar curso"
                      floatingLabelText="Pesquisar"
                      type="text"
                      fullWidth={false}
                      style={this.styles.inputTextCourse}
                      ref={(input) => this.search = input}/>
                <RaisedButton
                    label="buscar"
                    backgroundColor="#ff7500"
                    icon={<FindIco color="#FFF"/>}
                    onTouchTap={this.fncFindCourse}
                    style={this.styles.btnFindCourse}
                    labelStyle={{color: 'white'}}/>
                <RaisedButton
                    label="novo"
                    backgroundColor="#0ac752"
                    icon={<NewIco color="#FFF"/>}
                    onTouchTap={this.fncNewCourse}
                    style={this.styles.btnNewCourse}
                    labelStyle={{color: 'white'}}/>
                </span>
                <br/>

                {/*courses found*/}

                {}

                {this.state.newCourse ? (<NewCourse/>) : (<TableFound/>)}


            </div>
        )
    }
}

export default Course;
