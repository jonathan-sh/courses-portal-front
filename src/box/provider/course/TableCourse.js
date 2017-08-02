import React, {Component} from "react";
import RaisedButton from 'material-ui/RaisedButton';
import EditIco from 'material-ui/svg-icons/content/create';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn,} from 'material-ui/Table';

class TableCourse extends Component {

    constructor() {
        super()
        this.state = { msg: '' }
    }

    styles = {
        tableHeader: {backgroundColor: '#f1f1f1', textAlign: 'left', fontSize: '20px'},
        tableBody: {cursor: 'pointer'},
    };

    editCourse = (x) => alert(x);

    courses = [{name:'Nome do curso', status:true, _id:1},{name:'Nome do curso', status:false, _id: 2}];
    rows = this.courses.map((course) =>
        <TableRow key={course._id}>
            <TableRowColumn>{course.name}</TableRowColumn>
            <TableRowColumn>{course.status ? 'ativo' : 'inativo' }</TableRowColumn>
            <TableRowColumn>
                <RaisedButton
                    label="editar"
                    backgroundColor="#00a1fc"
                    onTouchTap={()=> this.editCourse(course._id)}
                    icon={<EditIco color="#FFF"/>}
                    labelStyle={{color: 'white'}}/>
            </TableRowColumn>
        </TableRow>
    );


    render() {
        return (
            <div>
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
