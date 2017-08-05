import React, {Component} from "react";
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn,} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import EditIco from 'material-ui/svg-icons/content/create';


class TableFind extends Component {


    styles = {
        tableHeader: {backgroundColor: '#f1f1f1', textAlign: 'left', fontSize: '20px'},
        tableBody: {cursor: 'pointer'},
    };


    fncEditCourse = (x) => alert(x);

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

        )
    }
}

export default TableFind;
