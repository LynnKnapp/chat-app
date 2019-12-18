import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Switch, Route, withRouter} from 'react-router-dom';
import App from './components/App.js';
import Register from './components/Auth/Register.js';
import Login from './components/Auth/Login.js';
import 'semantic-ui-css/semantic.min.css'
import firebase from './firebase'



class Root extends Component {
    componentDidMount(){
        firebase.auth().onAuthStateChanged(user => {
            if(user){
                this.props.history.push("/")
            }
        })
    }
    render(){
        return (
            
                <Switch>
                    <Route exact path="/" component={App} />
                    <Route path="/register" component={Register} />
                    <Route path="/login" component={Login} />
                </Switch>
            
        )
    }    
}
const RootWithAuth = withRouter(Root)

ReactDOM.render(
<Router>  
    <RootWithAuth />
</Router>, document.getElementById('root'));