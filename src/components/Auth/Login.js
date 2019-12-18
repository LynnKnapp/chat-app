import React, {Component} from 'react'
import {Grid, Form, Segment, Header, Icon, Button, Message, GridColumn} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import firebase from '../../firebase'
import 'firebase/auth'

class Register extends Component{
    state ={
        email: '',
        password: '',
        errors: [],
        loading: false,
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
        if(this.isformValid(this.state)) {
            this.setState({ errors: [], loading: true})
            firebase
                .auth()
                .signInWithEmailAndPassword(this.state.email, this.state.password)
                .then(signedInUser =>{
                    console.log(signedInUser)
                })
                .catch(err =>{
                    console.error(err)
                    this.setState({
                        errors: this.state.errors.concat(err),
                        loading: false
                    })
                })
        }     
    }
    isformValid=({email, password}) => email && password
    
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
        const { email, password, errors, loading} = this.state

        return(
            <Grid textAlign ='center' verticalAlign = 'middle' className='app'>
                <GridColumn style={{maxWidth: 450 }}>
                    <Header as='h1' icon color='violet' textAlign='center'>
                      <Icon name= 'code branch' color='violet' />
                        Login to Chit Chat
                    </Header>  
                    <Form size ='large' onSubmit={this.handleSubmit}>
                        <Segment stacked>
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
                            <Button disabled={loading}className={loading ? 'loading' : ''}color='violet' fluid size='large'>Submit</Button>
                        </Segment>
                    </Form>
                    {errors.length > 0 && (
                        <Message error>
                            <h3>Error</h3>
                            {this.displayErrors(errors)}
                        </Message>
                    )}
                    <Message>Not a registered user yet? <Link to ='/register'>Register</Link></Message>
                </GridColumn>
            </Grid>    
            
        )
    }

        
    
}
export default Register