import React from 'react';
// import logo from './logo.svg';
import './App.scss';
import jQuery from 'jquery';
import 'bootstrap';
import CreatePatientForm from './CreatePatientForm';

function App () {


  return (
    <div className="App">
      <header className="App-header">
        <CreatePatientForm/>
      </header>
       <footer class="footer">
        <div class="container">
          <span class="text-muted">Patient Ethereum DApp powered by Ekestfa</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
