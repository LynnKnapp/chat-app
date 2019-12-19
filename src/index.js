import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Switch, Route, withRouter} from 'react-router-dom';
import App from './components/App.js';
import Register from './components/Auth/Register.js';
import Login from './components/Auth/Login.js';
import 'semantic-ui-css/semantic.min.css'
import firebase from './firebase'
import {createStore} from 'redux'
import {Provider, connect} from 'react-redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import rootReducer from './reducers/index.js';
import {setUser} from './actions'
import Spinner from './Spinner'

const store = createStore(rootReducer, composeWithDevTools())



class Root extends Component {
    componentDidMount(){
        console.log(this.props.isLoading)
        firebase.auth().onAuthStateChanged(user => {
            if(user){
                this.props.setUser(user)
                this.props.history.push("/")
            }
        })
    }
    render(){
        return this.props.isLoading ? <Spinner/> :(
            
                <Switch>
                    <Route exact path="/" component={App} />
                    <Route path="/register" component={Register} />
                    <Route path="/login" component={Login} />
                </Switch>
            
        )
    }    
}

const mapStateFromProps = state => ({
    isLoading: state.user.isLoading
})
const RootWithAuth = withRouter(
    connect(
        mapStateFromProps,
         {setUser}
         )(Root))

ReactDOM.render(
    <Provider store={store}>   
        <Router>  
            <RootWithAuth />
        </Router>
    </Provider>, document.getElementById('root'));