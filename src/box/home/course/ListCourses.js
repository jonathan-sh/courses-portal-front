/**
 * Created by Igor Martucelli on 14/09/2017.
 */
import React, {Component} from "react";
import HeaderBar from './../bar/HeaderBar';
import {Card, CardActions, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import '../../../style/css/listCourse.css'
import IconButton from 'material-ui/IconButton';
import ArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import ArrowRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import srcImage from '../../../style/img/course-not-found-2.jpg';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import PubSub from 'pubsub-js';

class ListPublic extends Component
{
    constructor()
    {
        super();

        this.state =
        {
            boxComponent: '',
            grade: JSON.parse(localStorage.getItem('grade')),
            student: JSON.parse(localStorage.getItem('student')),
            componentMove: []
        };
    };

    style =
    {
        canAccess:'#0ac752',
        canNotAccess:'#ff4081'
    };

    componentDidMount()
    {
        this.createBoxComponent();
    };

    createBoxComponent = () =>
    {
        const grade = this.state.grade;
        let componentMove = {};

        if(grade !== null && grade !== undefined)
        {
            let boxes = grade.map((grade, index) =>
            {
                componentMove[grade.description] = {firstItem: 0, lastItem: 5};

                return <div key={index}>
                    <h2 className='title-box'>Cursos em {grade.description} ...</h2>
                    <div className='component-category'>
                        <IconButton
                            style={{background: 'transparent', width: 64, height: 64, padding: 8, float: 'left'}}
                            iconStyle={{width: 48, height: 48}}
                            tooltip='Voltar'
                            onClick={(event, object, action) => this.actionMove(event, grade, 'back')}>
                            <ArrowLeft color='#00bcd4'/>
                        </IconButton>
                        <div className="horizontal-scroll">
                            {
                                this.createCardComponent(grade)
                            }
                        </div>
                        <IconButton
                            style={{background: 'transparent', width: 64, height: 64, padding: 8, float: 'left'}}
                            iconStyle={{width: 48, height: 48}}
                            tooltip='Ir'
                            onClick={(event, object, action) => this.actionMove(event, grade, 'go')}>
                            <ArrowRight color='#00bcd4'/>
                        </IconButton>
                    </div>
                    <Divider style={{width: '80.5%',
                        marginLeft: '9.8%',
                        marginTop: '2%',
                        backgroundColor: 'rgba(224, 224, 224, 0.5)'}}
                    />
                </div>
            });

            this.setState({'boxComponent': boxes, 'componentMove': componentMove});
        }
    };

    createCardComponent = (grade) =>
    {
        let courses = grade.courses;

        return courses.map((card, index) =>
            <Card id={grade.description+index} key={index} style={{width: '18.35%', marginRight: '2%'}}>
                <CardMedia>
                    <img src={srcImage} alt=''/>
                </CardMedia>
                <CardTitle style={{paddingBottom: '0%'}} titleStyle={{fontSize: '20px', fontWeight: '300'}} title={card.name}/>
                <CardText>
                    {card.description}
                </CardText>
                <Divider />
                <CardActions style={{textAlign:'right'}}>
                    {this.verifyAccess()}
                </CardActions>
            </Card>
        );
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

    actionMove = (event, grade, action) =>
    {
        const id = '#' + grade.description;
        let box = this.state.componentMove;
        let move = this.state.componentMove[grade.description];
        const step = 5;

        if(action === 'go')
        {
            if(grade.courses.length < move.lastItem + step)
            {
                move.firstItem = grade.courses.length - step -1;
                move.lastItem = grade.courses.length - 1;
            }
            else
            {
                move.firstItem += step;
                move.lastItem += step;
            }
            window.location = id + move.lastItem;
        }
        else
        {
            if(move.firstItem - step < 0)
            {
                move.firstItem = 0;
                move.lastItem = 5;
            }
            else
            {
                move.firstItem -= step;
                move.lastItem -= step;
            }

            window.location = id + move.firstItem;
        }

        box[move] = move;
        this.setState({'componentMove': box});
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
                        style={{marginTop: '50px', marginLeft: '5%', width: '90%', position: 'fixed', zIndex: '8', background:'#fff'}}
                    />
                </div>
                <div style={{top: '125px', position: 'absolute', width: '100%'}}>
                    {this.state.boxComponent}
                </div>
            </div>
        );
    }
}

export default ListPublic;