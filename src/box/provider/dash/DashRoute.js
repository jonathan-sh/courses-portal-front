import AboutProvider from './../../../box/provider/about/About';
//import MarketingProvider from './../../../box/provider/marketing/Marketing';
import CourseProvider from './../../../box/provider/course/Course';
//import RegistrationProvider from './../../../box/provider/registration/Registration';
//import AnalyticalProvider from './../../../box/provider/analytical/Analytical';

const DashRoute = 
{
    dash: 
    [
        { uri: "about", item: AboutProvider },
        { uri: "marketing", item: "" },
        { uri: "course", item: CourseProvider },
        { uri: "registration", item: "" },
        { uri: "analytical", item: "" }
    ],
    all: function() { return this.dash },
    get: function(way) 
    {
        const Route = route => route.uri === way
        return this.dash.find(Route)
    }
}

export default DashRoute