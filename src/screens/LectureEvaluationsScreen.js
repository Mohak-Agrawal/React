import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import {CssBaseline,AppBar,Toolbar,Typography,List,ListItem,ListItemIcon,ListItemText,Box,Button,TextField} from '@material-ui/core';
import firebase from '../services/firebaseConfig'
import {Description } from '@material-ui/icons';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Link } from "react-router-dom";

export class LectureEvaluationsScreen extends Component {

    constructor(props) {
        super(props)
      
        this.state = {
          classList:[],
          className:'',
          subjectList:[],
          subjectName:'',
          topicList:[],
          topicName:'',
          lectureList:[],
          lectureName:'',
          questionsList:[],
          questionsId:[],
          subjectInputDisabled:true,
          topicInputDisabled:true,
          lectureInputDisabled:true,
          disableButton:true
        }
      }
      
      componentDidMount() {
        var classList = []
        
        firebase.firestore().collection('Contents').get()
        .then(querySnapshot => {
          querySnapshot.docs.forEach(doc => {
            classList.push(doc.id);
        });
        this.setState({classList:classList})
        });
          
      }

      onClassSelect = (value) => {
        var subjectList = []
        this.setState({ className:value })
        firebase.firestore().
        collection('Contents').
        doc(value).
        collection('Subjects').
        get()
        .then(querySnapshot => {
          querySnapshot.docs.forEach(doc => {
            subjectList.push(doc.id);
        });
        this.setState({subjectList:subjectList,subjectInputDisabled:false})
        });
      }

      onSubjectSelect = (subjectName) => {
        var topicList = []
        this.setState({ subjectName:subjectName })
        firebase.firestore().
        collection('Contents').
        doc(this.state.className).
        collection('Subjects').
        doc(subjectName).
        collection('Topics').
        get()
        .then(querySnapshot => {
          querySnapshot.docs.forEach(doc => {
            topicList.push(doc.id);
        });
        this.setState({topicList:topicList,topicInputDisabled:false})
        });
      }

      onTopicSelect = (topicName) => {
        var lectureList = []
        this.setState({ topicName:topicName })
        firebase.firestore().
        collection('Contents').
        doc(this.state.className).
        collection('Subjects').
        doc(this.state.subjectName).
        collection('Topics').
        doc(topicName).
        collection('Lectures').
        get()
        .then(querySnapshot => {
          querySnapshot.docs.forEach(doc => {
            lectureList.push(doc.id);
        });
        this.setState({lectureList:lectureList,lectureInputDisabled:false})
        });
      }

      

    render() {
        const { classes } = this.props;
        const {classList,subjectList,topicList,lectureList} = this.state
        return (
            <Box className={classes.root}>
                <CssBaseline />
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar>
                    <Typography variant="h6" noWrap>
                      Lecture Evaluations
                    </Typography>
                    </Toolbar>
                </AppBar>
                <Toolbar/>
                <div align="center" display="block"  p={1} m={1}  className={classes.div1}>
                  <div component="span" p={1} m={1}>
                    <FormControl variant="standard" className={classes.formControl}>
                      <InputLabel id="demo-simple-select-outlined-label">Select Class</InputLabel>
                      <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value={this.state.className}
                      className={classes.select}
                      onChange={(event) => this.onClassSelect(event.target.value)}
                      label="Class"
                      >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {classList.map((text,index) => (
                        <MenuItem value={text}>
                            {text}
                        </MenuItem>
                      ))}  
                      </Select>
                    </FormControl>
                  </div>
                  <div component="span" display={'block'} p={1} m={1} >
                    <FormControl variant="standard" className={classes.formControl}>
                      <InputLabel id="demo-simple-select-outlined-label">Select Subject</InputLabel>
                      <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value={this.state.subjectName}
                      onChange={(event) => this.onSubjectSelect(event.target.value)}
                      label="Evaluation"
                      className={classes.select}
                      disabled={this.state.subjectInputDisabled}
                      >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {subjectList.map((text,index) => (
                        <MenuItem value={text}>
                            {text}
                        </MenuItem>
                      ))}  
                      </Select>
                    </FormControl>
                  </div>
                  <div component="span" display={'block'} p={1} m={1} >
                    <FormControl variant="standard" className={classes.formControl}>
                      <InputLabel id="demo-simple-select-outlined-label">Select Topic</InputLabel>
                      <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value={this.state.topicName}
                      onChange={(event) => this.onTopicSelect(event.target.value)}
                      label="Evaluation"
                      className={classes.select}
                      disabled={this.state.topicInputDisabled}
                      >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {topicList.map((text,index) => (
                        <MenuItem value={text}>
                            {text}
                        </MenuItem>
                      ))}  
                      </Select>
                    </FormControl>
                  </div>
                  <div component="span" display={'block'} p={1} m={1} >
                    <FormControl variant="standard" className={classes.formControl}>
                      <InputLabel id="demo-simple-select-outlined-label">Select Lecture</InputLabel>
                      <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value={this.state.lectureName}
                      onChange={(event) => this.setState({lectureName:event.target.value,disableButton:false})}
                      label="Evaluation"
                      className={classes.select}
                      disabled={this.state.lectureInputDisabled}
                      >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        {lectureList.map((text,index) => (
                        <MenuItem value={text}>
                            {text}
                        </MenuItem>
                      ))}  
                      </Select>
                    </FormControl>
                  </div>
                  <Button variant="contained" className={classes.Button} disabled={this.state.disableButton} >
                    <Link to={{pathname:'./LectureEvaluationsQuestions',
                      state:{
                        className:this.state.className,
                        subjectName:this.state.subjectName,
                        topicName:this.state.topicName,
                        lectureName:this.state.lectureName,
                          }}} 
                      className={classes.link}>
                        SHOW
                    </Link>   
                  </Button>
                </div>   
              </Box>
        )
    }
}
const useStyles = theme => ({
  root: {
    flexGrow:1
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    alignItems:'center',
    backgroundColor:'#03a9f4'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  listView:{
      marginTop:100,
      flexGrow:1,
      alignItems:'center'
  },
  FormControl: {
    margin: theme.spacing(1),
    minWidth: 300,
    marginTop:50,
    marginBottom:50,
    top: 250,
    PaddingRight: 250,
  },

  div1:{
    marginTop: 180,
  },
  
  select:{
    width: 300,
    
  },
  Button:{
      backgroundColor:'#03a9f4',
      color:'white',
      marginTop:20,
      width: 300,
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.text.primary
  },
  
});
export default withStyles(useStyles)(LectureEvaluationsScreen)
