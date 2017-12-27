class CourseService{
    notNull(value)
    {
        return (value)? value : "";
    }
}
export default new CourseService();