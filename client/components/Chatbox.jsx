import React, { useState } from 'react';
import { styled } from '@mui/system';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/TYpography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Fab from '@mui/material/Fab';
import Send from '@mui/icons-material/Send';

const useStyles = styled({
  table: {
    minWidth: 650,
  },
  chatSection: {
    width: '100%',
    height: '80vh'
  },
  headBG: {
    backgroundColor: '#e0e0e0'
  },
  borderRight500: {
    borderRight: '1px solid #e0e0e0'
  },
  messageArea: {
    height: '70vh',
    overflowY: 'auto'
  }
});

function Chatbox() {
  const classes = useStyles();

  return (
    <div>
      <Grid container>
        <Grid item xs={12} >
          <Typography variant="h5" className="header-message">Chat</Typography>
        </Grid>
      </Grid>
      <Grid container component={Paper} className={classes.chatSection}>
        <Grid item xs={3} className={classes.borderRight500}>
          <List>
            <ListItem button key="MattS">
              <ListItemIcon>
                <Avatar alt="Matt S" src="https://www.codesmith.io/hubfs/Codesmith_June2021/Images/Matt%20Severyn.jpg" />
              </ListItemIcon>
              <ListItemText primary="Matt S"></ListItemText>
            </ListItem>
          </List>
          <Divider />
          <Divider />
          <List>
            <ListItem button key="SamA">
              <ListItemIcon>
                <Avatar alt="Sam A" src="https://www.codesmith.io/hs-fs/hubfs/Screen%20Shot%202022-06-07%20at%202.01.49%20PM.png?width=336&height=316&name=Screen%20Shot%202022-06-07%20at%202.01.49%20PM.png" />
              </ListItemIcon>
              <ListItemText primary="Sam A">Sam A</ListItemText>
              <ListItemText secondary="online" align="right"></ListItemText>
            </ListItem>
            <ListItem button key="Hannah P">
              <ListItemIcon>
                <Avatar alt="Hannah P" src="https://www.codesmith.io/hs-fs/hubfs/Screen%20Shot%202022-04-05%20at%201.44.39%20PM.png?width=1046&height=1038&name=Screen%20Shot%202022-04-05%20at%201.44.39%20PM.png" />
              </ListItemIcon>
              <ListItemText primary="Hanna P">Hannah P</ListItemText>
            </ListItem>
            <ListItem button key="MattB">
              <ListItemIcon>
                <Avatar alt="Matt B" src="https://www.codesmith.io/hs-fs/hubfs/Screen%20Shot%202022-09-08%20at%204.35.30%20PM.png?width=317&height=346&name=Screen%20Shot%202022-09-08%20at%204.35.30%20PM.png" />
              </ListItemIcon>
              <ListItemText primary="Matt B">Matt B</ListItemText>
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={9}>
          <List className={classes.messageArea}>
            <ListItem key="1">
              <Grid container>
                <Grid item xs={12}>
                  <ListItemText align="right" primary="Hey man, What's up ?"></ListItemText>
                </Grid>
                <Grid item xs={12}>
                  <ListItemText align="right" secondary="09:30"></ListItemText>
                </Grid>
              </Grid>
            </ListItem>
            <ListItem key="2">
              <Grid container>
                <Grid item xs={12}>
                  <ListItemText align="left" primary="Hey, Iam Good! What about you ?"></ListItemText>
                </Grid>
                <Grid item xs={12}>
                  <ListItemText align="left" secondary="09:31"></ListItemText>
                </Grid>
              </Grid>
            </ListItem>
            <ListItem key="3">
              <Grid container>
                <Grid item xs={12}>
                  <ListItemText align="right" primary="Cool. i am good, let's catch up!"></ListItemText>
                </Grid>
                <Grid item xs={12}>
                  <ListItemText align="right" secondary="10:30"></ListItemText>
                </Grid>
              </Grid>
            </ListItem>
          </List>
          <Divider />
          <Grid container style={{padding: '20px'}}>
            <Grid item xs={11}>
              <TextField id="outlined-basic-email" label="Type Something" fullWidth />
            </Grid>
            <Grid xs={1} align="right">
              <Fab color="primary" aria-label="add"><Send /></Fab>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}


// function Chatbox() {
//   const fakeMessages = [
//     {from: 'lewis', body: 'yo!'},
//     {from: 'peipei', body: 'bye'}
//   ];
//   const [messageList, setMessages] = useState(fakeMessages);
//   // need function to retrieve messages

//   const messages = messageList.map((e, i) => {
//     return (<p key={i}>{e.from}: {e.body}</p>);
//   });

//   return (
//     <div className='chatbox'>
//       <div id='message-container'>
//         {messages}
//       </div>
//       <form>
//         <input type='text'></input>
//         <Button variant='text'>Send</Button>
//       </form>
//     </div>
//   );
// }

export default Chatbox;