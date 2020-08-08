import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import {Button,Box,Grid,Paper,Container,Typography,CssBaseline,AppBar,Toolbar} from '@material-ui/core';
import { signInWithGoogle } from '../services/firebaseConfig';
import { auth } from '../services/firebaseConfig';
import { Link } from "react-router-dom";

export class LoginScreen extends Component {

  constructor() {
    super();

    this.state = {
      currentUser: null
    };
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {
      this.setState({ currentUser: user });
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }
    render() {
        const {classes} = this.props
        return (
                    this.state.currentUser ?
                    <div className={classes.root}>
                        <CssBaseline />
                        <AppBar position="static" className={classes.appBar}>
                        <Toolbar>
                        <Typography variant="h6" className={classes.title}>
                            HOME
                        </Typography>
                        <Button color="inherit" onClick={() => auth.signOut()} >LOG OUT</Button>
                            </Toolbar>
                        </AppBar>
                        <Toolbar/>
                        <Grid container spacing={10} className={classes.view}>
                        <Grid item xs={4}>
                            <Link to={'/GlobalEvaluations'} className={classes.link}>
                            <Paper className={classes.paper}>Global Evaluations</Paper>
                            </Link>
                        </Grid>
                        <Grid item xs={4}>
                            <Link to={'/PracticeEvaluations'} className={classes.link}>
                            <Paper className={classes.paper}>Practice Evaluations</Paper>
                            </Link>
                        </Grid>
                        <Grid item xs={4}>
                            <Link to={'/LectureEvaluations'} className={classes.link} >
                            <Paper className={classes.paper}>Lecture Evaluations</Paper>
                            </Link>
                        </Grid>
                        </Grid>
                    </div>
                    :
                    <div className={classes.root}>
                        <Grid container >
                            <Grid item xs={6}>
                            <Container disableGutters={true}>
                                <Typography component="div" style={{ backgroundColor: '#03a9f4',fontSize:80,color:'white', height: '100vh',display:'flex',alignItems:'center',justifyContent:'center',top:'50%' }} >
                                    <div style={{marginLeft:100,marginTop:100,marginBottom:100,marginRight:100}}>
                                    Welcome <br></br> To <br></br> Guru
                                    </div>
                                </Typography>
                            </Container>
                            </Grid>
                            <Grid item xs={6}>
                                <Button variant="contained" className={classes.button} onClick={signInWithGoogle}>Sign In With Google</Button>
                            </Grid>
                        </Grid>
                    </div>
                
                
        )
    }
}

const useStyles = theme => ({
    root: {
        flexGrow: 1,
      },
      paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      },
      background:{
          backgroundColor:'black'
      },
      button:{
        backgroundColor: '#03a9f4',
        fontSize:18,
        paddingTop:14,
        paddingRight:52,
        paddingLeft:52,
        paddingBottom:14,
        alignSelf:'center',
        color:"white",
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        top:'50%',
        borderRadius:50,
        left:'50%',
        transform: 'translate(-50%,-50%)',
      },
      appBar: {
        zIndex: theme.zIndex.drawer + 1,
        backgroundColor:'#03a9f4'
      },
      view:{
          marginTop:50,
          padding:50,
      },
      paper: {
        padding: theme.spacing(10),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        fontSize:24,
        color:'black',
        borderRadius:10
      },
      link: {
        textDecoration: 'none',
        color: theme.palette.text.primary
      },
      title: {
        flexGrow: 1,
      },
  });

  export default withStyles(useStyles)(LoginScreen)