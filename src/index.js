import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Route, BrowserRouter } from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';
import App from './App';
import LoginProvider from './box/provider/login/Login';
import LoginStudent from './box/student/login/Login';
import AboultPovider from './box/provider/aboult/Aboult';

injectTapEventPlugin();


const Main = () => (
    <MuiThemeProvider>
        <BrowserRouter>
            <div>
            <Route exact path='/' component={App} />
            <Route path='/login/provider' component={LoginProvider} />
            <Route path='/login/student' component={LoginStudent} />
            <Route path='/provider/aboult' component={AboultPovider} />
            </div>
        </BrowserRouter>
    </MuiThemeProvider>
)

ReactDOM.render(<Main />, document.getElementById('root'));

registerServiceWorker();
