import React, { Component } from 'react';
// import logo from './logo.svg';
import './scss/App.scss';
// import {navbarComp} from "./components/navbar"
import 'bootstrap';
import CreatePatientForm from './components/RegisterPage/RegisterPage';
import LoginPage from './components/LoginPage/LoginPage'
import HomePage from './components/HomePage/HomePage'
import {PrivateRoute} from './helpers/PrivateRoute';
import {
  Redirect,
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

export default class App extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {value:""};
  // }
  
  render(){
    // console.log(this.state.value)
  return (
    <Router>
    <div className="App">
      <header className="App-header">
        {/* <navbarComp/> */}
        <Switch>
          <Route exact path="/" component={LoginPage}/>
          <Route exact path="/register" component={CreatePatientForm}/>
          <PrivateRoute exact path ='/home' component={HomePage}/>
          <Redirect from="*" component={() => "404 NOT FOUND"} />
        </Switch>
      </header>
       <footer class="footer">
        <div class="container">
          <span class="text-muted">Patient Ethereum DApp powered by Ekestfa</span>
        </div>
      </footer>
    </div>
    </Router>
  );
}
}
// export default App;
