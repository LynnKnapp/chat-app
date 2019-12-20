import React from "react"
import firebase from '../../firebase'
import { Menu, Icon, Modal, Form, Input, Button } from "semantic-ui-react";

class Channels extends React.Component {
  state = {
    user: this.props.currentUser,
    channels: [],
    channelName: "",
    channelDetails: "",
    modal: false,
    channelsRef: firebase.database().ref('channels')
  }
  addChannel = () => {
    const {channelsRef, channelName, channelDetails, user} = this.state
    const key = channelsRef.push().key
    const newchannel = {
      id: key,
      name: channelName,
      details: channelDetails,
      createdBy: {
        user: user.displayName,
        avatar: user.photo.URL
      }
    }
    
    channelsRef
      .child(key)
      .update(newchannel)
      .then(() =>{
        this.setState({
          channelName: '',
          channelDetails: '',
        })
        this.closeModal() 
        console.log('channel added') 
      })
      .catch(err => {
        console.log(err)
      })
    }  

  

  handleSubmit = e => {
    e.preventDefault()
    if(this.isFormValid(this.state)){
       return this.addchannel
    }
  }
  isFormValid =({channelName, channelDetails}) => channelName && channelDetails

  handleChange = e => {
    const {name, value} = this.setState
    this.setState({ 
      [name]: value 
    })
  }

  openModal = () => this.setState({ modal: true })

  closeModal = () => this.setState({ modal: false })

  render() {
    const { channels, modal } = this.state

    return (
      <React.Fragment>
        <Menu.Menu style={{ paddingBottom: "2em" }}>
          <Menu.Item>
            <span>
              <Icon name="exchange" /> CHANNELS
            </span>{" "}
            ({channels.length}) <Icon name="add" onClick={this.openModal} />
          </Menu.Item>
          {/* Channels */}
        </Menu.Menu>

        {/* Add Channel Modal */}
        <Modal basic open={modal} onClose={this.closeModal}>
          <Modal.Header>Add a Channel</Modal.Header>
          <Modal.Content>
            <Form onSubmit={this.handleSubmit}>
              <Form.Field>
                <Input
                  fluid
                  label="Name of Channel"
                  name="channelName"
                  onChange={this.handleChange}
                />
              </Form.Field>

              <Form.Field>
                <Input
                  fluid
                  label="About the Channel"
                  name="channelDetails"
                  onChange={this.handleChange}
                />
              </Form.Field>
            </Form>
          </Modal.Content>

          <Modal.Actions>
            <Button color="green" inverted onClick={this.handleSubmit}>
              <Icon name="checkmark" /> Add
            </Button>
            <Button color="red" inverted onClick={this.closeModal}>
              <Icon name="remove" /> Cancel
            </Button>
          </Modal.Actions>
        </Modal>
      </React.Fragment>
    )
  }
}

export default Channels
