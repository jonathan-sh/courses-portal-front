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
        let list = [card, card, card, card, card, card, card];

        let cards = list.map((card, index) =>
            <Card key={index} style={{width: '17.6%', margin: '2% 0% 0% 2%', float: 'left'}}>
                <CardMedia>
                    <img src={srcImage} />
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
                {this.state.cardComponent}
            </div>
        );
    }
}

export default ListPublic;