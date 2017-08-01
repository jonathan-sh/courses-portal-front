import React, {Component} from "react";
import RaisedButton from 'material-ui/RaisedButton';
import DeleteIco from 'material-ui/svg-icons/action/delete';
import EditIco from 'material-ui/svg-icons/content/create';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn,} from 'material-ui/Table';

class TableCourse extends Component {

    styles = {
        tableHeader: {backgroundColor: '#f1f1f1', textAlign: 'left', fontSize: '20px'},
        tableBody: {cursor: 'pointer'},
    };

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

                        {/*repeat rows here*/}
                        <TableRow>
                            <TableRowColumn>Tecnologia De Engenharia Civil</TableRowColumn>
                            <TableRowColumn>Ativo</TableRowColumn>
                            <TableRowColumn>
                                <RaisedButton
                                    label="editar"
                                    backgroundColor="#00a1fc"
                                    icon={<EditIco color="#FFF"/>}
                                    labelStyle={{color: 'white'}}
                                    style={{marginRight: '20px'}}/>
                                <RaisedButton
                                    label="deletar"
                                    backgroundColor="#ff4661"
                                    labelStyle={{color: 'white'}}
                                    icon={<DeleteIco color="#FFF"/>}/>
                            </TableRowColumn>
                        </TableRow>

                    </TableBody>
                </Table>
            </div>
        )
    }
}

export default TableCourse;
