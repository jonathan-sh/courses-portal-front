import React, {Component} from "react";
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn,} from 'material-ui/Table';
import httpService from '../../../service/HttpService';
import RaisedButton from 'material-ui/RaisedButton';
import EditIco from 'material-ui/svg-icons/content/create';
import DeleteIco from 'material-ui/svg-icons/content/delete-sweep';
import PubSub from 'pubsub-js';
import TextField from 'material-ui/TextField';
import _ from 'lodash';


class TableFind extends Component {


    constructor() {
        super();
        this.state = {rows: '', courses: '', course: '',};
        this.httpService = new httpService();
    }

    styles = {
        tableHeader: {backgroundColor: '#f1f1f1', textAlign: 'left', fontSize: '20px'},
        tableBody: {cursor: 'pointer'},
    };

    componentDidMount() {
        PubSub.publish('header-label', 'Pesquisar curso');
        PubSub.subscribe('search-courses', this.fncGetCourses);
        this.fncGetCourses();
    }

    fncGetCourses = () => {
        this.httpService.get('/course', localStorage.getItem('auth-token'))
            .then(response => {
                if (response.status !== 501) {
                    return response.json();
                }
                throw new Error('Falha de autenticação.');
            })
            .then(success => {
                this.setState({'courses': success});
                localStorage.setItem('courses', JSON.stringify(success));
                this.fncMakeRows(success);
            })
            .catch(error => {
                this.setState({msg: error.message});
            });

    };

    fncMakeRows = (courses) => {
        courses = _.sortBy(courses, ['name']);
        let rows = courses.map((course) =>
            <TableRow key={course._id}>
                <TableRowColumn>{course.name}</TableRowColumn>
                <TableRowColumn>{course.status ? 'ativo' : 'inativo'}</TableRowColumn>
                <TableRowColumn>
                    <RaisedButton
                        label="editar"
                        backgroundColor="#00a1fc"
                        onTouchTap={() => this.fncEditCourse(course)}
                        icon={<EditIco color="#FFF"/>}
                        labelStyle={{color: 'white'}}/>
                    <RaisedButton
                        label="delete"
                        backgroundColor="#ff2930"
                        onTouchTap={() => this.fncDeleteCourse(course)}
                        icon={<DeleteIco color="#FFF"/>}
                        style={{marginLeft: '3%'}}
                        labelStyle={{color: 'white'}}/>
                </TableRowColumn>
            </TableRow>
        );

        this.setState({'rows': rows});
    };

    fncEditCourse = (course) => {
        PubSub.publish('switch-to-crud', course);
    };

    fncDeleteCourse = (course) => {
       alert('Delete curse ' + course.name);
    };

    fncFilterRows = () => {
        let filter = this.search.input.value;
        filter = filter.toUpperCase();
        let result = _.filter(this.state.courses, (o) => {
                              let name = o.name.toUpperCase();
                              return name.includes(filter);
                             });
        this.fncMakeRows(result);
    };

    render() {
        return (

            <div>

                <TextField
                    hintText="informe o nome do curso   "
                    floatingLabelText="Pesquisar curso"
                    type="text"
                    onChange={()=>this.fncFilterRows()}
                    fullWidth={true}
                    ref={(input) => this.search = input}/>

                <br/>
                <br/>

                <Table>
                    <TableHeader
                        adjustForCheckbox={false}
                        enableSelectAll={false}
                        displaySelectAll={false}
                        style={this.styles.tableHeader}>
                        <TableRow>
                            <TableHeaderColumn>Nome do curso</TableHeaderColumn>
                            <TableHeaderColumn>Situação do curso</TableHeaderColumn>
                            <TableHeaderColumn>Ação</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false}
                               showRowHover={true}
                               style={this.styles.tableBody}>
                        {this.state.rows}
                    </TableBody>
                </Table>
            </div>

        )
    }
}

export default TableFind;
