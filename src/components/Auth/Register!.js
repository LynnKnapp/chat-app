import React, {Component} from 'react'
import {Grid, Form, Segment, Header, Icon, Button, Message, GridColumn} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import firebase from '../../firebase'
import 'firebase/auth'

class Register extends Component {
    state ={
        username: '',
        email: '',
        password: '',
        passwordConfirmation: '',
        errors: []
    } 
    isformValid=() =>{
        let errors = []
        let error 
        if(this.isFormEmpty(this.state)){//can destructure here in parameter
            error ={message: 'Fill in all fields'}
            this.setState({errors: errors.concat(error)})
            return false
        }else if(!this.isPasswordValid(this.state)){
            error ={message: 'Password or Username not valid'}
            this.setState({errors: errors.concat(error)})
            return false
        }else{
            //form valid
            return true
        }

    }
    isFormEmpty =({username, email, password, passwordConfirmation}) =>{
        return !username.length || !email.length || !password.length || !passwordConfirmation.length
    }
    isPasswordValid =({password, passwordConfirmation}) =>{
        if (password.length < 6 || passwordConfirmation.length < 6){
            return false
        }else if(password !== passwordConfirmation){
            return false
        }else{
            return true
        }
    }
    displayErrors = errors => this.state.errors.map((error, i) =>{
        return <p key={i}>{error.message}</p>
    })   
    
}