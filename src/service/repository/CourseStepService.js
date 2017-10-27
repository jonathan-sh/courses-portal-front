import TemplateRepository from "./TemplateRepository";

class CourseStepService extends TemplateRepository{
    constructor()
    {
        super('/course-step');
    };

    delete(step, idCourse)
    {
        step.courseId = idCourse;
        return super.delete(step)
    };

}
export default new CourseStepService();