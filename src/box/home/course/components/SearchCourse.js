import React, {Component} from 'react';
import Divider from 'material-ui/Divider';
import array from '../../../../service/Array';

class SearchCourse extends Component
{
    constructor(props)
    {
        super(props);
        this.array = new array();
        this.state =
        {
            componentBox: '',
            props
        };
    };

    componentDidMount()
    {
        this.createListCourses();
    };

    createListCourses = () =>
    {
        const grade = this.state.props.grade;
        let list = [];

        if(grade !== null && grade !== undefined)
        {
            grade.map((grade) =>
                grade.courses.map((course) =>
                    list = this.array.controlObject(list, course)
                )
            );
        }

        this.createComponent(list);
    };

    createComponent = (courses) =>
    {
        let componentBox;

        if(courses !== null && courses !== undefined && courses !== [])
        {
            componentBox = courses.map((course, index) =>
                <div key={index}>
                    <div className='component-category box-search'>
                        <div className='card-search'>
                            <div style={{display: 'flex'}}>
                                <div style={{maxWidth: '20%', minWidth: '20%', width: '20%'}}>
                                    <img src={this.state.props.image} alt='' style={{width: '100%', height: '100%'}}/>
                                </div>
                                <div style={{maxWidth: '80%', minWidth: '80%', width: '80%', fontFamily: 'Roboto'}}>
                                    <div style={{padding: '2%', fontSize: '20px'}}>{course.name}</div>
                                    <div style={{padding: '2%'}}>{course.description}</div>
                                    <div style={{padding: '2%', float: 'right'}}>
                                        {this.state.props.access}
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

