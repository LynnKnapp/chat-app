import React, {Component} from 'react'
import {Grid, Form, Segment, Header, Icon, Button, Message, GridColumn} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import firebase from '../../firebase'
import 'firebase/auth'

class Register extends Component{
    constructor(){
        super()
        this.state ={
            username: '',
            email: '',
            password: '',
            passwordConfirmation: ''
    
        }
    
    }
    handleChange =(event) =>{
        const {name, value} = event.target
        this.setState=({
            [name]:value
        })
    }
    handleSubmit=(event)=>{
        event.preventDefault()
        const {email, password} = this.state
        firebase 
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(createUser => {
                console.log(createUser)
            })
            .catch(err =>{
                console.error(err)
            })
          
    }
    validate(){
        const auth = firebase.auth();
        const promise = auth.signInWithEmailAndPassword(this.state.email, this.state.password);
        promise.catch(function(error){
         console.log("Got a error", error);
        })
        }
    render(){
        // const{username, email, password, passwordConfirmation} = this.state
        return(
            <Grid textAlign ='center' verticalAlign = 'middle' className='app'>
                <GridColumn style={{maxWidth: 450 }}>
                    <Header as='h2' icon color='orange' textAlign='center'>
                      <Icon name= 'puzzle piece' color='orange' />
                        Register for Chit Chat
                    </Header>  
                    <Form size ='large' onSubmit={this.handleSubmit}>
                        <Segment stacked>
                            <Form.Input fluid name='username' 
                            icon='user' 
                            iconPosition='left'
                            placeholder='Username' 
                            onChange={this.handleChange} 
                            defaultValue={this.state.username}
                            type='text'/>
                            <Form.Input  fluid name='email' 
                            icon='mail' 
                            iconPosition='left'
                            placeholder='Email Address' 
                            onChange={this.handleChange} 
                            defaultValue={this.state.email}
                            type='email'/>
                            <Form.Input fluid name='password' 
                            icon='lock' 
                            iconPosition='left'
                            placeholder='Password'
                             onChange={this.handleChange} 
                             defaultValue={this.state.password}
                             type='password'/>
                            <Form.Input fluid name='passwordConfirmation' 
                            icon='repeat' 
                            iconPosition='left'
                            placeholder='Password Confirmation' 
                            onChange={this.handleChange} 
                            defaultValue={this.state.passwordConfirmation}
                            type='password'/> 
                            <Button color='orange' fluid size='large'>Submit</Button>
                        </Segment>
                    </Form>
                    <Message>Already a User? <Link to ='/login'>Login</Link></Message>
                </GridColumn>
            </Grid>    
            
        )
    }
}
export default Register