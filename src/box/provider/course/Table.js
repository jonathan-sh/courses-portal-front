import React, {Component} from "react";
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn,} from 'material-ui/Table';
import httpService from '../../../service/HttpService';
import RaisedButton from 'material-ui/RaisedButton';
import EditIco from 'material-ui/svg-icons/content/create';
import PubSub from 'pubsub-js';
import Information from './Information';
import _ from 'lodash';


class TableFind extends Component {


    constructor(){
        super();
        this.state={rows:'',courses:'', course:'', mimimi:false};
        this.httpService = new httpService();
    }

    styles = {
        tableHeader: {backgroundColor: '#f1f1f1', textAlign: 'left', fontSize: '20px'},
        tableBody: {cursor: 'pointer'},
    };



    componentDidMount(){
        PubSub.publish('header-label','Pesquisar curso');
        PubSub.subscribe('search-courses',this.fncSearchCourses);
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
                this.setState({'courses':success});
               this.fncMakeRows();
            })
            .catch(error => {this.setState({msg:error.message});});

    };


    fncMakeRows = () =>{
        let rows = this.state.courses.map((course) =>
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


    fncEditCourse = (id) => {
        let course = _.filter(this.state.courses, (course)=> {return course._id === id})[0];
        this.setState({'course':course});
        this.setState({'mimimi':true});
        PubSub.publish('switch-to-crud',true);
    };

    render() {
        return (

              <div>
                  {this.state.mimimi? <Information course={this.state.course}/> : null}
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
              </div>

        )
    }
}

export default TableFind;
