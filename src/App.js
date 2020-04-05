import React, { useState } from 'react';
// import logo from './logo.svg';
import './App.scss';
import jQuery from 'jquery';
import 'bootstrap';
import CreatePatientForm from './CreatePatientForm';
import {default as Web3} from 'web3';
 const [addre,setAddre] = useState('')
window.$ = window.jQuery = jQuery;

const web3 = new Web3(Web3.givenProvider || "http://localhost:7545" );
const ethereum = window.ethereum;

const ethereumButton = () => {
  if(ethereum){
    web3.eth.getAccounts((err, accounts) => {
      if (accounts.length == 0) {
        // there is no active accounts in MetaMask
        this.console.log('there is no active accounts in MetaMask')
        ethereum.on('accountsChanged',function(accounts){
          console.log(accounts[0])
        //setAddre(accounts[0])
        });
      }else {
        // It's ok
        web3.eth.getAccounts(console.log);
        ethereum.on('accountsChanged',function(accounts){
          console.log(accounts[0])
          setAddre(accounts[0])
        //setAddre(accounts[0])
        });
        }
      });
    }
  }



// window.addEventListener('load', function () {
//   if (typeof web3 !== 'undefined') {        
      //window.web3 = new Web3(window.web3.currentProvider)
//       if (web3.currentProvider.isMetaMask === true) {
//           web3.eth.getAccounts((err, accounts) => {
//               if (accounts.length == 0) {
//                 // there is no active accounts in MetaMask
//                 this.console.log('there is no active accounts in MetaMask')
//                 // web3.eth.getAccounts().then(console.log);
//                 this.console.log(accounts[0])
//               }
//               else {
//                 // It's ok
//                 web3.eth.getAccounts(console.log);
//               }
//           });
//       } else {
//           // Another web3 provider
//       }
//   } else {
//       // No web 3 provider
//   }    
// });



const App = props => {
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
        {/* <nav class="navbar navbar-expand-lg navbar-primary bg-light">
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <a class="navbar-brand" href="#">Profiles</a>
            <div class="collapse navbar-collapse" id="navbarToggler">
              <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
              <li class="nav-item active">
                <a class="nav-link" href="/">Home</a>
              </li>
              </ul>
            </div>
        </nav>
        <div class="container-fluid">
        <div class="alert alert-warning mt-3" role="alert">
        <div class="row">

      </div>
      </div>
      </div>*/}
    <CreatePatientForm value={addre}/>
    <button onClick={ethereumButton} class="enableEthereumButton">Enable Ethereum</button>
      </header>


      <footer class="footer">
        <div class="container">
          <span class="text-muted">A demo dapp.</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
