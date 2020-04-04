import React from 'react';
import logo from './logo.svg';
import './App.scss';
import jQuery from 'jquery';
window.$ = window.jQuery = jQuery;
// Import bootstrap

function App() {
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
        <nav class="navbar navbar-expand-lg navbar-primary bg-light">
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
        <div class="col-lg-3 mt-1 mb-1">
          <div class="card card-profile-signup p-1">
            <form>
              <div class="card-body">
                <h5 class="card-title">Create your profile</h5>
                <div class="form-group">
                  <label for="username">Username</label>
                  <input type="text" class="form-control" id="sign-up-username" required="required"/>
                </div>
                <div class="form-group">
                  <label for="username">Title</label>
                  <input type="text" class="form-control" id="sign-up-title"/>
                </div>
                <div class="form-group">
                  <label for="username">Short intro</label>
                  <textarea class="form-control" id="sign-up-intro" rows="2"></textarea>
                </div>
                <p>ETH Address:
                  <span class="eth-address"></span>
                  <input type="text" class="form-control" id="sign-up-eth-address" value="0x…" disabled/>
                </p>
                <button type="submit" class="btn btn-primary" id="sign-up-button">Sign Up</button> 
              </div>
            </form>
          </div>
        </div>
      </div>
      </div>
      </div>
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
