/**
 * Created by Igor Martucelli on 14/09/2017.
 */
import React, {Component} from "react";
import HeaderBar from './../bar/HeaderBar';
import {Card, CardActions, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import '../../../style/css/listCourse.css'
import IconButton from 'material-ui/IconButton';
import IconSearch from 'material-ui/svg-icons/action/search';
import ArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import ArrowRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import srcImage from '../../../style/img/course-not-found-2.jpg';
import FlatButton from 'material-ui/FlatButton';

class ListPublic extends Component
{
    constructor()
    {
        super();

        this.state =
        {
            boxComponent: '',
            grade: JSON.parse(localStorage.getItem('grade')),
            componentMove: []
        };
    };

    componentDidMount()
    {
        this.createBoxComponent();
    };

    createBoxComponent = () =>
    {
        const grade = this.state.grade;
        let componentMove = {};

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
                <Divider style={{
                    width: '80.5%',
                    marginLeft: '9.8%',
                    marginTop: '1.5%',
                    backgroundColor: 'rgba(224, 224, 224, 0.5)'
                }}/>
            </div>
        });
        
        console.log(grade);
        this.setState({'boxComponent': boxes, 'componentMove': componentMove});
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
                    {card.objective}
                </CardText>
                <Divider />
                <CardActions style={{textAlign:'right'}}>
                    <FlatButton
                        label="Acessar curso"
                        primary={true}
                    />
                </CardActions>
            </Card>
        );
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
                <div className="course-list-public">
                    <HeaderBar/>
                    <div className='has-float-label search-input' >
                        <input style={{width: '85%', margin: '0%'}} id='search' type='text' placeholder='O que você vai aprender hoje?'/>
                        <label style={{color: '#00bcd4', paddingLeft: '3px', top: '3px'}} htmlFor='search'>Buscar cursos</label>
                        <IconButton
                            style={{margin:'0%', padding: '0%', width: '15%', minWidth: '0px', float: 'right', height: '35px', background: '#00bcd4'}}
                            tooltip='Buscar'>
                            <IconSearch color='#FFF' style={{paddingTop: '5px'}} />
                        </IconButton>
                    </div>
                </div>
                {this.state.boxComponent}
            </div>
        );
    }
}

export default ListPublic;