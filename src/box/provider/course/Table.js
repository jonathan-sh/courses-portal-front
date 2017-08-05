import React, {Component} from "react";
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn,} from 'material-ui/Table';
import httpService from '../../../service/HttpService';
import RaisedButton from 'material-ui/RaisedButton';
import EditIco from 'material-ui/svg-icons/content/create';
import PubSub from 'pubsub-js';


class TableFind extends Component {


    constructor(){
        super();
        this.state={rows:''};
        this.httpService = new httpService();
    }

    styles = {
        tableHeader: {backgroundColor: '#f1f1f1', textAlign: 'left', fontSize: '20px'},
        tableBody: {cursor: 'pointer'},
    };



    componentDidMount(){
        PubSub.publish('header-label','Pesquisar curso');
        this.fncSearchCourses();
    }

    fncSearchCourses = ()=>{
        this.httpService.get('/course', localStorage.getItem('auth-token'))
            .then(response => {
                if (response.status !== 501 )
                {
                    return response.json();
                }
                throw new Error('Falha de autenticação.');
            })
            .then(success => {
               this.fncMakeRows(success);
            })
            .catch(error => {this.setState({msg:error.message});});

    };


    fncMakeRows = (courses) =>{
        let rows = courses.map((course) =>
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

        this.setState({'rows':rows});
    };


    fncEditCourse = (x) => alert(x);

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

                        {this.state.rows}

                    </TableBody>
                </Table>

        )
    }
}

export default TableFind;
