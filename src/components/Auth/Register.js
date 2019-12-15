import React, {Component} from 'react'
import {Grid, Form, Segment, Header, Icon, Button, Message, GridColumn} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import firebase from '../../firebase'
import 'firebase/auth'

class Register extends Component{
    state ={
        username: '',
        email: '',
        password: '',
        passwordConfirmation: '',
        errors: [],
        loading: false
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

    handleChange =(event) =>{
        const {name, value} = event.target
        this.setState({
            [name]:value
        })
    }
    handleSubmit=(event)=>{
        event.preventDefault()
        if(this.isformValid()) {
        const {email, password} = this.state
        firebase 
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(createUser => {
                console.log(createUser)
                this.setState({loading: false})
            })
            .catch(err =>{
                console.error(err)
                this.setState({errors: this.state.errors.concat(err), loading: false})
            })
        }
          
    }
    handleInputError =(errors, inputName)=>{
        
        return errors.some(error =>
            error.message.toLowerCase().includes(inputName)) ? "error" : ""
    }
    validate=() =>{
        const auth = firebase.auth();
        const promise = auth.signInWithEmailAndPassword(this.state.email, this.state.password);
        promise.catch(function(error){
         console.log("Got a error", error);
        })
    };
    render(){
        const {username, email, password, passwordConfirmation, errors, loading} = this.state

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
                            defaultValue={username}
                            type='text'/>
                            <Form.Input  fluid name='email' 
                            icon='mail' 
                            iconPosition='left'
                            placeholder='Email Address' 
                            onChange={this.handleChange} 
                            defaultValue={email}
                            className={this.handleInputError(errors, 'email')}
                            type='email'/>
                            <Form.Input fluid name='password' 
                            icon='lock' 
                            iconPosition='left'
                            placeholder='Password'
                             onChange={this.handleChange} 
                             defaultValue={password}
                             className={this.handleInputError(errors, 'password')}
                             type='password'/>
                            <Form.Input fluid name='passwordConfirmation' 
                            icon='repeat' 
                            iconPosition='left'
                            placeholder='Password Confirmation' 
                            onChange={this.handleChange} 
                            defaultValue={passwordConfirmation}
                            className={this.handleInputError(errors, 'password')}
                            type='password'/> 
                            <Button disabled={loading}className={loading ? 'loading' : ''}color='orange' fluid size='large'>Submit</Button>
                        </Segment>
                    </Form>
                    {errors.length > 0 && (
                        <Message error>
                            <h3>Error</h3>
                            {this.displayErrors(errors)}
                        </Message>
                    )}
                    <Message>Already a User? <Link to ='/login'>Login</Link></Message>
                </GridColumn>
            </Grid>    
            
        )
    }

        
    
}
export default Register