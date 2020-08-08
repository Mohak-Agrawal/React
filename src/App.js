import React, { Component } from 'react'
import './App.css';
import LoginScreen from './screens/LoginScreen'
import GlobalEvaluationsScreen from './screens/GlobalEvaluationsScreen'
import GlobalQuestionsScreen from './screens/GlobalQuestionsScreen'
import PracticeEvaluationsScreen from './screens/PracticeEvaluationsScreen'
import PracticeQuestionsScreen from './screens/PracticeQuestionsScreen'
import LectureEvaluationsScreen from './screens/LectureEvaluationsScreen'
import LectureQuestionsScreen from './screens/LectureQuestionsScreen'
import { Link, Switch, Route, BrowserRouter as Router } from "react-router-dom";


export default class App extends Component {
    render(){
      return(
        <Router>
         <Switch>
          <Route exact path="/" component={LoginScreen}></Route>
          <Route exact path="/GlobalEvaluations" component={GlobalEvaluationsScreen}></Route>
          <Route exact path="/GlobalEvaluationsQuestions" component={GlobalQuestionsScreen}></Route>
          <Route exact path="/PracticeEvaluations" component={PracticeEvaluationsScreen}></Route>
          <Route exact path="/PracticeEvaluationsQuestions" component={PracticeQuestionsScreen}></Route>
          <Route exact path="/LectureEvaluations" component={LectureEvaluationsScreen}></Route>
          <Route exact path="/LectureEvaluationsQuestions" component={LectureQuestionsScreen}></Route>
        </Switch>
       </Router>
      )
    }
}

    



