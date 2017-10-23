/**
 * Created by Igor Martucelli on 14/09/2017.
 */
import React, {Component} from "react";
import HeaderBar from './../bar/HeaderBar';
import '../../../style/css/listCourse.css'
import srcImage from '../../../style/img/course-not-found-2.jpg';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import SearchCourse from './../course/components/SearchCourse'
import CardCourse from './../course/components/CardCourse';
import array from './../../../service/Array';
import PubSub from 'pubsub-js';

class ListCourses extends Component
{
    constructor()
    {
        super();
        this.array = new array();
        this.state =
        {
            boxComponent: '',
            grade: JSON.parse(localStorage.getItem('grade')),
            student: JSON.parse(localStorage.getItem('student')),
            isFilter: false,
        };
    };

    style =
    {
        canAccess:'#0ac752',
        canNotAccess:'#ff4081'
    };

    verifyAccess = () =>
    {
        if(this.state.student !== null && this.state.student !== undefined)
        {
            if(this.state.student.signature)
            {
                return <RaisedButton
                            label="Acessar curso"
                            backgroundColor={this.style.canAccess}
                            labelStyle={{color: 'white'}}
                        />;
            }

            return <RaisedButton
                label="Acessar curso"
                backgroundColor={this.style.canNotAccess}
                labelStyle={{color: 'white'}}
            />;
        }

        return <RaisedButton
                    label="Acessar curso"
                    backgroundColor={this.style.canNotAccess}
                    labelStyle={{color: 'white'}}
                />;
    };

    fncFilterCourses = () =>
    {
        let filter = this.search.input.value;
        filter = filter.toUpperCase();
        if(filter !== null && filter !== undefined && filter !== "")
        {
            this.setState({'isFilter': true});
            PubSub.publish('refresh-filter', filter);
        }
        else
        {
            this.setState({'isFilter': false});
        }
    };

    render()
    {
        return (
            <div>
                <div>
                    <HeaderBar/>
                    <TextField
                        hintText="O que você vai estudar ?"
                        floatingLabelText="Buscar cursos"
                        className='input-search'
                        style={{width: '90%',  position: 'fixed', backgroundColor: '#fff'}}
                        onChange={()=> this.fncFilterCourses()}
                        ref={(input) => this.search = input}
                    />
                </div>
                <div className='group-components'>
                {
                    this.state.isFilter ?
                        <SearchCourse
                            grade={this.state.grade}
                            access={this.verifyAccess()}
                            image={srcImage}
                            filter={this.search.input.value.toUpperCase()}
                        />
                        :
                        <CardCourse
                            image={srcImage}
                            access={this.verifyAccess()}
                            grade={this.state.grade}
                        />
                }
                </div>
            </div>
        );
    }
}

export default ListCourses;