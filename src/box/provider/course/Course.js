import React, {Component} from "react";
import TableFound from './Table';
import CrudCourse from './Crud';

class Course extends Component {


    constructor() {
        super();
        this.state = {isCrud: true};
    }

    render() {
        return (
            <div>
                {this.state.isCrud ? (<CrudCourse/>) : (<TableFound/>)}
            </div>
        )
    }
}

export default Course;
