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

class ListPublic extends Component
{
    constructor()
    {
        super();
        const text = 'Aqui vai fica o objetivo do curso ou descrição, fica a combinar. O que se adequar melhor fica, essa é layout basico de visão de curso.';
        const card1 = {name: 'Front-end', description: text, value:30};
        const card2 = {name: 'Back-end', description: text, value:50};
        const listCard1 = [card1, card1, card1, card1, card1, card1, card1, card1, card1, card1];
        const listCard2 = [card2, card2, card2, card2, card2, card2, card2, card2, card2, card2, card2, card2, card2, card2, card2];
        const grade = [{description: 'Front-end', courses:listCard1}, {description: 'Back-end', courses:listCard2}];

        this.state =
        {
            boxComponent: '',
            grade: grade
        };
        console.log(grade)
    };

    componentDidMount()
    {
        this.createBoxComponent();
    };

    createBoxComponent = () =>
    {
        const grade = this.state.grade;

        let boxes = grade.map((box, index) =>
            <div key={index}>
                <h2 className='title-box'>{box.description} ...</h2>
                <div className='component-category'>
                    <IconButton
                        style={{background: 'transparent', width: 64, height: 64, padding: 8, float:'left'}}
                        iconStyle={{width: 48, height: 48}}
                        tooltip='Voltar'
                        href={'#' + box.description + '0'}>
                        <ArrowLeft color='#00bcd4'/>
                    </IconButton>
                    <div className="horizontal-scroll">
                        {
                            this.createCardComponent(box.courses)
                        }
                    </div>
                    <IconButton
                        style={{background: 'transparent', width: 64, height: 64, padding: 8, float: 'left'}}
                        iconStyle={{width: 48, height: 48}}
                        tooltip='Ir'
                        href={'#' + box.description + '9'}>
                        <ArrowRight color='#00bcd4'/>
                    </IconButton>
                </div>
            </div>
        );

        this.setState({'boxComponent': boxes});
    };

    createCardComponent = (courses) =>
    {
        return courses.map((card, index) =>
            <Card id={card.name+index} key={index} style={{width: '18.35%', marginRight: '2%'}}>
                <CardMedia>
                    <img src={srcImage} alt=''/>
                </CardMedia>
                <CardTitle style={{paddingBottom: '0%'}} titleStyle={{fontSize: '20px'}} title={card.name + " " + index}/>
                <CardText>
                    {card.description}
                </CardText>
                <Divider />
                <CardActions style={{textAlign:'right'}}>
                    <h2 style={{color:'green', fontSize:'20px', padding:'3%', fontWeight: '500', margin:'0%'}}>{card.value + index} R$</h2>
                </CardActions>
            </Card>
        );
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