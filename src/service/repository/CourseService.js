import TemplateRepository from "./TemplateRepository";

class CourseService extends TemplateRepository{
    constructor(){
        super('/course');
    }
}
export default new CourseService();