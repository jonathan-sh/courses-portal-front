import React, {Component} from 'react';
import {Card, CardActions, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import ArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import ArrowRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import history from '../../../../service/router/History';

class CardCourse extends Component
{
    constructor(props)
    {
        super(props);
        this.state = props;
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
                componentMove[grade.description] = {firstItem: 0, lastItem: 3};

                return  <div key={index}>
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
                            {this.createCardComponent(grade)}
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

        return courses.map((course, index) =>
            <Card id={grade.description+index} key={index} style={{width: '23.47%', marginRight: '2%'}}>
                <CardMedia>
                    <img src={this.state.image} alt=''/>
                </CardMedia>
                <CardTitle style={{paddingBottom: '0%'}} titleStyle={{fontSize: '20px', fontWeight: '300'}} title={course.name}/>
                <CardText>
                    {course.description}
                </CardText>
                <Divider />
                <CardActions style={{textAlign:'right', paddingRight: '0'}}>
                    <RaisedButton
                        label="Acessar curso"
                        backgroundColor={this.props.styleAccess}
                        labelStyle={{color: 'white'}}
                        onTouchTap={() => history.push('/course/' + course._id)}
                    />
                </CardActions>
            </Card>
        );
    };

    actionMove = (event, grade, action) =>
    {
        event.preventDefault();

        const id = '#' + grade.description;
        let box = this.state.componentMove;
        let move = this.state.componentMove[grade.description];
        const step = 4;

        if(action === 'go')
        {
            if(grade.courses.length < move.lastItem + step)
            {
                move.firstItem = grade.courses.length - step;
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
                move.lastItem = 3;
            }
            else
            {
                move.firstItem -= step;
                move.lastItem -= step;
            }

            window.location = id + move.firstItem;
        }

        box[move] = move;
        history.push('/courses');

    };

    render()
    {
        return (
            <div>
                {this.state.boxComponent}
            </div>
        );
    }
}

export default CardCourse;