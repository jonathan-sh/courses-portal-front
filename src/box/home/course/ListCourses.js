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
        this.state =
        {
            cardComponent: ''

        };
    };

    componentDidMount()
    {
        this.createComponent();
    };

    createComponent = () =>
    {
        const text = 'Aqui vai fica o objetivo do curso ou descrição, fica a combinar. O que se adequar melhor fica, essa é layout basico de visão de curso.';
        const card = {name: 'Course', description: text, value:25};
        let list = [card, card, card, card, card, card, card, card, card, card];

        let cards = list.map((card, index) =>
            <Card id={index} key={index} className="beaba" style={{width: '18.37%', marginRight: '2%'}}>
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

        this.setState({'cardComponent': cards});
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
                <div className="horizontal-scroll">
                    {this.state.cardComponent}
                </div>
                <IconButton
                    style={{marginLeft:'2%', background: 'transparent', width: 96, height: 96, padding: 24}}
                    iconStyle={{width: 48, height: 48}}
                    tooltip='Voltar'
                    href="#0">
                    <ArrowLeft color='#00bcd4'/>
                </IconButton>
                <IconButton
                    style={{marginRight:'2%', float: 'right', background: 'transparent', width: 96, height: 96, padding: 24}}
                    iconStyle={{width: 48, height: 48}}
                    tooltip='Ir'
                    href="#9">
                    <ArrowRight color='#00bcd4'/>
                </IconButton>
            </div>
        );
    }
}

export default ListPublic;