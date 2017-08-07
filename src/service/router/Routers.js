import AboutProvider from './../../box/provider/about/About';
import MarketingProvider from './../../box/provider/marketing/Marketing';
import CourseProvider from './../../box/provider/course/Course';
import RegistrationProvider from './../../box/provider/registration/Registration';
import AnalyticalProvider from './../../box/provider/analytical/Analytical';
import FinancialProvider from './../../box/provider/financial/Financial';

const DashRoute = 
{
    dash:
    [
        { uri: "about", item: AboutProvider },
        { uri: "marketing", item: MarketingProvider },
        { uri: "course", item: CourseProvider },
        { uri: "registration", item: RegistrationProvider },
        { uri: "financial", item: FinancialProvider },
        { uri: "analytical", item: AnalyticalProvider }
    ],
    all: function() { return this.dash },
    get: function(way)
    {
        const Route = route => route.uri === way
        return this.dash.find(Route)
    }
}

export default DashRoute