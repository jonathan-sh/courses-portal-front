import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Router, Route, BrowserRouter, Switch } from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';
import App from './App';
import LoginStudent from './box/student/login/Login';
import Provider from './box/provider/dash/Dash';
import LoginProvider from './box/provider/login/Login';
import AboutProvider from './box/provider/about/About';
import CourseProvider from './box/provider/course/Course';
import history from './service/Router';

injectTapEventPlugin();

const Main = () => (
    <MuiThemeProvider>
        <BrowserRouter>
            <Router history={history}>
                <div>
                    <Route exact path='/' component={App} />
                    <Route exact path='/student/login' component={LoginStudent} />
                    <Route exact path='/provider/login' component={LoginProvider} />
                    <Provider>
                        <Switch>
                            <Route exact path='/provider/about' component={AboutProvider} />
                            <Route exact path='/provider/course' component={CourseProvider} />
                        </Switch>
                    </Provider>
                </div>
            </Router>
        </BrowserRouter>
    </MuiThemeProvider>
)

ReactDOM.render(<Main />, document.getElementById('root'));

registerServiceWorker();
