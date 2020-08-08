
import React,{Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import firebase from '../services/firebaseConfig'
import {Drawer,AppBar,CssBaseline,Toolbar,Typography,List,ListItem,ListItemIcon,ListItemText, Grid,Checkbox, TextField, Button,FormControl,FormLabel,RadioGroup,Radio,FormControlLabel, FormGroup} from '@material-ui/core';
import {Description,Create,Check,KeyboardArrowRight } from '@material-ui/icons';

const drawerWidth = 240;

export class EvaluationsQuestionsScreen extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
          questionsList:[],
          order:null,
          className:'',
          evaluationName:'',
          editable:false,
          clicked:false,
          question:'',
          imageOptions:null,
          imageQuestion:null,
          first:'',
          second:'',
          third:'',
          fourth:'',
          correctOptions:[],
          questionId:'',
          multipleCorrect:null
        }
    }

    componentDidMount(){
      const params=this.props.location.state
      firebase.firestore().
        collection('Contents').
        doc(params.className).
        collection('GlobalEvaluations').
        doc(params.evaluationName).
        collection('Questions').
        onSnapshot(res => {
          let docs = res.size ? res.docs : []
          this.setState({
            questionsList:docs,
            className:params.className,
            evaluationName:params.evaluationName})
          }); 
    }


    onClickListItem = (data,id) => {
        this.setState({
          order:data.Order,
          clicked:true,
          question:data.Question.trim(),
          first:data[1].trim(),
          second:data[2].trim(),
          third:data[3].trim(),
          fourth:data[4].trim(),
          imageOptions:data.ImageOptions,
          imageQuestion:data.ImageQuestion,
          correctOptions:data.CorrectOptions,
          questionId:id,
          multipleCorrect:data.MultipleCorrect,
        })
    }

     onCheckedAnswer = (value,array,boolean) => {
       const Value=parseInt(value)
       if(!boolean){
          array.push(Value)
          this.setState({correctOptions:array})
       }
       else{
        const index = array.indexOf(Value);
        if (index > -1) {
          array.splice(index, 1);
        }
        this.setState({correctOptions:array})
       }  
    }
    onImageOptions = (value) => {
      if(value==='true')
      this.setState({imageOptions:true})
      else
      this.setState({imageOptions:false})
    }

    onImageQuestion = (value) => {
      if(value==='true')
      this.setState({imageQuestion:true})
      else
      this.setState({imageQuestion:false})
    }

    onSaveAndNext = () => {
        const{question,first,second,third,fourth,imageOptions,imageQuestion,correctOptions,questionId} = this.state
        // if(correctOptions.length()>1)
        // this.setState({multipleCorrect:true})
        // else
        // this.setState({multipleCorrect:false})
        firebase.firestore().
        collection('Contents').
        doc(this.state.className).
        collection("GlobalEvaluations").
        doc(this.state.evaluationName).
        collection("Questions").
        doc(questionId).update({
          Question:question,
          1:first,
          2:second,
          3:third,
          4:fourth,
          CorrectOptions:correctOptions,
          ImageOptions:imageOptions,
          ImageQuestion:imageQuestion,
        })
    }

    render(){
        const { classes } = this.props;
        return (
        <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
            <Typography variant="h6" noWrap>
              {this.state.clicked?'Question '+this.state.order:"Select Question"}
            </Typography>
            </Toolbar>
        </AppBar>
        <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
            paper: classes.drawerPaper,
            }}
        >
            <Toolbar />
            <div className={classes.drawerContainer}>
            <List>
                {this.state.questionsList.sort((a, b) => a.data().Order > b.data().Order ? 1:-1).map((text, index) => (
                <ListItem button selected={this.state.selected} key={index} onClick={() => this.onClickListItem(text.data(),text.id)} selected={text.data().Order===this.state.order?true:false}>
                    <ListItemIcon> <Description style={{color:'#03a9f4'}}/> </ListItemIcon>
                    <ListItemText primary={'Question '+text.data().Order} />
                </ListItem>
                ))}
            </List>
            </div>
        </Drawer>
        <main className={classes.content}>
            <Toolbar />
            {this.state.clicked?
            <div className={classes.box}>
              {!this.state.editable?
              <Typography className={classes.question}>Q. {this.state.question}</Typography>:
              <TextField
                placeholder={'Question'}
                multiline={true}
                fullWidth={true}
                value={this.state.question}
                onChange={(event) => this.setState({question:event.target.value})}
                variant={'standard'}
              />
              }
              {!this.state.editable ?
               <Typography className={classes.optionsText}>(A) {this.state.first}</Typography>:
               <TextField
                placeholder={'Question'}
                multiline={true}
                value={this.state.first}
                onChange={(event) => this.setState({first:event.target.value})}
                variant={'standard'}
                className={classes.questionInput}
              />
               }
               {!this.state.editable ?
               <Typography className={classes.optionsText}>(B) {this.state.second}</Typography>:
               <TextField
                placeholder={'Question'}
                multiline={true}
                value={this.state.second}
                onChange={(event) => this.setState({second:event.target.value})}
                variant={'standard'}
                className={classes.questionInput}
              />
               }
               {!this.state.editable ?
               <Typography className={classes.optionsText}>(C) {this.state.third}</Typography>:
               <TextField
                placeholder={'Question'}
                multiline={true}
                value={this.state.third}
                onChange={(event) => this.setState({third:event.target.value})}
                variant={'standard'}
                className={classes.questionInput}
              />
               }
               {!this.state.editable ?
               <Typography className={classes.optionsText}>(D) {this.state.fourth}</Typography>:
               <TextField
                placeholder={'Question'}
                multiline={true}
                value={this.state.fourth}
                onChange={(event) => this.setState({fourth:event.target.value})}
                variant={'standard'}
                className={classes.questionInput}
              />
               }
               
               <FormGroup row>
               <FormLabel className={classes.form} >Correct Options</FormLabel>
                <FormControlLabel
                  control={<Checkbox checked={this.state.correctOptions.includes(1)} 
                  onChange={(event) => this.onCheckedAnswer(event.target.value,this.state.correctOptions,this.state.correctOptions.includes(1))} 
                  disabled={!this.state.editable} value={1} name="checkedA" />}
                  label="(A)"
                />
                <FormControlLabel
                  control={<Checkbox checked={this.state.correctOptions.includes(2)} 
                  onChange={(event) => this.onCheckedAnswer(event.target.value,this.state.correctOptions,this.state.correctOptions.includes(2))} 
                  disabled={!this.state.editable} value={2} name="checkedB" />}
                  label="(B)"
                />
                <FormControlLabel
                  control={<Checkbox checked={this.state.correctOptions.includes(3)} 
                  onChange={(event) => this.onCheckedAnswer(event.target.value,this.state.correctOptions,this.state.correctOptions.includes(3))} 
                  disabled={!this.state.editable} value={3} name="checkedC" />}
                  label="(C)"
                />
                <FormControlLabel
                  control={<Checkbox checked={this.state.correctOptions.includes(4)} 
                  onChange={(event) => this.onCheckedAnswer(event.target.value,this.state.correctOptions,this.state.correctOptions.includes(4))} 
                  disabled={!this.state.editable} value={4} name="checkedD" />}
                  label="(D)"
                />
                </FormGroup>

              <FormGroup row >
                <FormLabel className={classes.form} component="legend" >Image Options&nbsp;</FormLabel>
                <RadioGroup aria-label="Image Options" name="imageOptions" value={this.state.imageOptions} row onChange={(event) => this.onImageOptions(event.target.value)}>
                  <FormControlLabel value={true} control={<Radio />} label="true" disabled={!this.state.editable} />
                  <FormControlLabel value={false} control={<Radio />} label="false" disabled={!this.state.editable}/>
                </RadioGroup>
              </FormGroup>

              <FormGroup row>
                <FormLabel className={classes.form} component="legend">Image Question</FormLabel>
                <RadioGroup aria-label="Image Question" name="imageQuestion" value={this.state.imageQuestion} row onChange={(event) => this.onImageQuestion(event.target.value)}>
                  <FormControlLabel value={true} control={<Radio />} label="true" disabled={!this.state.editable} />
                  <FormControlLabel value={false} control={<Radio />} label="false" disabled={!this.state.editable} />
                </RadioGroup>
              </FormGroup>
              <div >
              {!this.state.editable?<Button 
              endIcon={<Create/>}
              color='#03a9f4'
              className={classes.editButton}
              onClick={() => this.setState({editable:true})}>EDIT</Button>:
              <Button 
              endIcon={<Check/>}
              color='#03a9f4'
              className={classes.editButton}
              onClick={() => this.setState({editable:false})}>DONE</Button>}
              <Button 
              endIcon={<KeyboardArrowRight/>}
              color='#03a9f4'
              className={classes.saveButton}
              onClick={() => this.onSaveAndNext()}>SAVE & NEXT</Button>
              </div>
            </div> 
            :
            <Typography align={'center'}>Empty!</Typography>
            }   
        </main>
        </div>
    );
  }
}

const useStyles = ((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    alignItems:'center',
    backgroundColor:'#03a9f4'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor:'#f2f2f2'
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    flexDirection:'column'
  },
  box: {
    margin:'2rem',
  },
  question: {
      fontSize: '22px',
      marginBottom:40
  },
  optionsText:{
    fontSize:18,
    marginTop:10
  },
  questionInput:{
    width: 200,
    marginTop: 20,
    display: 'block',
  },
  editButton:{
    marginTop: 150, 
    color: 'white',
    backgroundColor: '#03a9f4',
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 3,
  },
  saveButton:{
    marginTop: 150,
    color: 'white',
    backgroundColor: '#03a9f4',
    paddingLeft: 30,
    paddingRight: 30,
    marginLeft: '60%',
    borderRadius: 3,
  },
  options:{
    fontSize:18,
    marginTop:30,
  },
  form:{
    marginTop: 30,
    marginBottom: 20,
    marginRight: 20,
  },
  checkbox:{
    
  }
}));

  export default withStyles(useStyles)(EvaluationsQuestionsScreen)