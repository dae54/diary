import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'


import Calender from './componets/home'
import Controller from './componets/userController/controller'
import DiaryBody from './componets/diaryBody/index'

function App() {
  return (
      <div className="App container">
        <Router>
          <Switch>
            <Route exact path='/' component={Calender}></Route>
            <Route exact path='/controller' component={Controller}></Route>
            <Route exact path='/user/:uuid' component={DiaryBody}></Route>
          </Switch>
        </Router>
      </div>
  );
}

export default App;
