import TemplateRepository from "./TemplateRepository";

class CourseRepository extends TemplateRepository{
    constructor(){
        super('/course');
    }
}
export default CourseRepository;