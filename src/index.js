import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Route, BrowserRouter } from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';
import App from './App';
import LoginProvider from './box/provider/login/Login';
import LoginStudent from './box/student/login/Login';
import AboutProvider from './box/provider/about/About';
import DashProvider from './box/provider/dash/Dash'

injectTapEventPlugin();

const Main = () => (
    <MuiThemeProvider>
        <BrowserRouter>
            <div>
                <Route exact path='/' component={App} />
                <Route path='/login/provider' component={LoginProvider} />
                <Route path='/login/student' component={LoginStudent} />
                <Route path='/provider/about' component={AboutProvider} />
                <Route path='/provider/dash' component={DashProvider} />
            </div>
        </BrowserRouter>
    </MuiThemeProvider>
)

ReactDOM.render(<Main />, document.getElementById('root'));

registerServiceWorker();
