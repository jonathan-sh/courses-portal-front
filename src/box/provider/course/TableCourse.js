import React, {Component} from "react";
import RaisedButton from 'material-ui/RaisedButton';
import EditIco from 'material-ui/svg-icons/content/create';
import FindIco from 'material-ui/svg-icons/action/search';
import TextField from 'material-ui/TextField';
import NewIco from 'material-ui/svg-icons/content/add';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn,} from 'material-ui/Table';

class TableCourse extends Component {


    styles = {
        tableHeader: {backgroundColor: '#f1f1f1', textAlign: 'left', fontSize: '20px'},
        tableBody: {cursor: 'pointer'},
        inputTextCourse: {width: '72%'},
        btnFindCourse: {width: '12%', marginRight: '2%', marginLeft: '2%'},
        btnNewCourse: {width: '12%'}
    };

    fncEditCourse = (x) => alert(x);

    fncNewCourse  = () => this.setState({newCourse: true});

    fncFindCourse = () => this.setState({newCourse: false});


    courses = [{name:'Nome do curso', status:true, _id:1},{name:'Nome do curso', status:false, _id: 2}];
    rows = this.courses.map((course) =>
        <TableRow key={course._id}>
            <TableRowColumn>{course.name}</TableRowColumn>
            <TableRowColumn>{course.status ? 'ativo' : 'inativo' }</TableRowColumn>
            <TableRowColumn>
                <RaisedButton
                    label="editar"
                    backgroundColor="#00a1fc"
                    onTouchTap={()=> this.fncEditCourse(course._id)}
                    icon={<EditIco color="#FFF"/>}
                    labelStyle={{color: 'white'}}/>
            </TableRowColumn>
        </TableRow>
    );


    render() {
        return (
            <div>

                {/*header found*/}
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
                <Table>
                    <TableHeader
                        adjustForCheckbox={false}
                        enableSelectAll={false}
                        displaySelectAll={false}
                        style={this.styles.tableHeader}>
                        <TableRow>
                            <TableHeaderColumn>Nome do curso</TableHeaderColumn>
                            <TableHeaderColumn>Status do curso</TableHeaderColumn>
                            <TableHeaderColumn>-</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false}
                               showRowHover={true}
                               style={this.styles.tableBody}>

                        {this.rows}

                    </TableBody>
                </Table>
            </div>
        )
    }
}

export default TableCourse;
