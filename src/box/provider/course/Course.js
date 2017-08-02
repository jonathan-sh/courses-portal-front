import React, {Component} from "react";
import TableFound from './TableCourse';
import CrudCourse from './CrudCourse';

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
