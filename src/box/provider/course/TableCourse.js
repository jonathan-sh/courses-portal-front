import React, {Component} from "react";
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn,} from 'material-ui/Table';
import courseService from '../../../service/repository/CourseService';
import GetResponseYesNo from '../../../component/GetResponseYesNo';
import RaisedButton from 'material-ui/RaisedButton';
import EditIco from 'material-ui/svg-icons/content/create';
import DeleteIco from 'material-ui/svg-icons/content/delete-sweep';
import PubSub from 'pubsub-js';
import TextField from 'material-ui/TextField';
import _ from 'lodash';

class TableCourse extends Component {

    constructor()
    {
        super();
        this.state = {rows: '', courses: '', course: '',};
    };

    componentDidMount()
    {
        this.fncGetCourses();
    };

    fncGetCourses = () =>
    {
        courseService.getAll()
                     .then(success =>
                     {
                         this.setState({'courses': success});
                         localStorage.setItem('courses', JSON.stringify(success));
                         this.fncMakeRows(success);
                     })
                     .catch(error =>
                     {
                       console.log(error);
                     });

    };

    fncMakeRows = (courses) =>
    {
        courses = _.sortBy(courses, ['name']);

        let rows = courses.map((course) =>
            <TableRow key={course._id}>
                <TableRowColumn>{course.name}</TableRowColumn>
                <TableRowColumn>{course.status ? 'ativo' : 'inativo'}</TableRowColumn>
                <TableRowColumn>
                   <span style={{display: 'inline-flex'}}>
                         <RaisedButton
                             label="editar"
                             backgroundColor="#00a1fc"
                             onTouchTap={() => this.fncEditCourse(course)}
                             icon={<EditIco color="#FFF"/>}
                             labelStyle={{color: 'white'}}/>

                        <GetResponseYesNo
                            fncOnYesCase={() => courseService
                                                    .delete(course)
                                                    .then(this.fncGetCourses)}
                            title={"Antenção, deletando curso"}
                            question={"Você realmente deseja deletar o curso [ "+course.name +" ] ?"}
                            btLabel="delete"
                            btBackgroundColor="#ff2930"
                            btIcon={<DeleteIco color="#FFF"/>}
                            btStyle={{marginLeft: '5%'}}
                            btLabelStyle={{color: 'white'}}/>
                       </span>
                </TableRowColumn>
            </TableRow>
        );

        this.setState({'rows': rows});
    };

    fncEditCourse = (course) => PubSub.publish('go-crud',course);

    fncFilterRows = () =>
    {
        let filter = this.search.input.value;
        filter = filter.toUpperCase();
        let result = _.filter(this.state.courses, (o) => {
            let name = o.name.toUpperCase();
            return name.includes(filter);
        });
        this.fncMakeRows(result);
    };

    styles =
    {
        tableHeader: {backgroundColor: '#f1f1f1', textAlign: 'left', fontSize: '20px'},
        tableBody: {cursor: 'pointer'},
    };

    render()
    {
        return (

            <div>

                <TextField
                    hintText="informe o nome do curso   "
                    floatingLabelText="Pesquisar curso"
                    type="text"
                    onChange={() => this.fncFilterRows()}
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
    };
}

export default TableCourse;
