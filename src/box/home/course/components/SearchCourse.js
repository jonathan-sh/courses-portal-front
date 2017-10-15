import React, {Component} from 'react';
import Divider from 'material-ui/Divider';
import array from '../../../../service/Array';
import _ from 'lodash';
import PubSub from 'pubsub-js';

class SearchCourse extends Component
{
    constructor(props)
    {
        super(props);
        this.array = new array();
        this.state =
        {
            componentBox: '',
            courses: ''
        };

        this.createComponent = this.createComponent.bind(this);
    };

    componentDidMount()
    {
        this.createListCourses();

        PubSub.subscribe('refresh-filter', this.refreshFilter);
    };

    refreshFilter = (topic, filter) =>
    {
        this.createComponent(this.state.courses, filter);
    };

    createListCourses = () =>
    {
        const grade = this.props.grade;
        const filter = this.props.filter;
        let list = [];

        if(grade !== null && grade !== undefined)
        {
            grade.map((grade) =>
                grade.courses.map((course) =>
                    list = this.array.controlObject(list, course)
                )
            );
        }

        this.setState({'courses': list});

        this.createComponent(list, filter);
    };

    createComponent = (courses, filter) =>
    {
        let componentBox;
        courses = _.sortBy(courses, ['name']);

        let result = _.filter(courses, (o) => {
            let name = o.name.toUpperCase();
            return name.includes(filter);
        });

        if(result !== null && result !== undefined && result !== [])
        {
            componentBox = result.map((course, index) =>
                <div key={index}>
                    <div className='component-category box-search'>
                        <div className='card-search'>
                            <div style={{display: 'flex'}}>
                                <div style={{maxWidth: '20%', minWidth: '20%', width: '20%'}}>
                                    <img src={this.props.image} alt='' style={{width: '100%', height: '100%'}}/>
                                </div>
                                <div style={{maxWidth: '80%', minWidth: '80%', width: '80%', fontFamily: 'Roboto'}}>
                                    <div style={{padding: '2%', fontSize: '20px'}}>{course.name}</div>
                                    <div style={{padding: '2%'}}>{course.description}</div>
                                    <div style={{padding: '2%', float: 'right'}}>
                                        {this.props.access}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Divider style={{width: '70%',
                        marginLeft: '15%',
                        marginTop: '2%',
                        backgroundColor: 'rgba(224, 224, 224, 0.5)'}}
                    />
                </div>
            );
        }

        this.setState({'componentBox': componentBox});
    };

    render()
    {
        return (
            <div>
                {this.state.componentBox}
            </div>
        );
    };
}

export default SearchCourse;

