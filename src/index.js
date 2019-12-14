import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import App from './components/App.js';
import Register from './components/Auth/Register.js';
import Login from './components/Auth/Login.js';
import 'semantic-ui-css/semantic.min.css'



const Root = () =>{
   return <Router>
            <Switch>
                <Route exact path="/" component={App} />
                <Route path="/register" component={Register} />
                <Route path="/login" component={Login} />
            </Switch>
    </Router>
}

ReactDOM.render(<Root />, document.getElementById('root'));