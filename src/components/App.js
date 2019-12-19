import React from 'react';
import {Grid} from 'semantic-ui-react'
import './App.css';
import ColorPanel from './colorPanel/ColorPanel'
import SidePanel from './sidePanel/SidePanel'
import MetaPanel from './metaPanel/MetaPanel'
import Messages from './messages/Messages'

const App = () => {

    return (
      <Grid columns='equal' className='app' style={{background: '#eee'}}>
        <ColorPanel />
        <SidePanel />
        
        <Grid.Column style={{marginLeft: 320}}>
           <Messages />
        </Grid.Column>

        <Grid.Column width={4} >
           <MetaPanel />
        </Grid.Column>
      </Grid>
    );
  }


export default App;


