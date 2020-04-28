import React, { useState } from 'react';
import {Link} from 'react-router-dom'
import {ToggleButtonGroup, ToggleButton} from 'react-bootstrap'
import '../../scss/App.scss';
import useForm from './useForm';
import validate from './validateRegister';
import {default as Web3} from 'web3';
import ipfs from '../../ipfs';
import contract from 'truffle-contract';
import {ethers} from 'ethers';
import PatientStorage from '../../abi/PatientStorage.json';
import DoctorStorage from '../../abi/DoctorStorage.json'
import {patientContractCreation} from '../../helpers/contract'

  const web3 = new Web3(Web3.givenProvider || "http://localhost:7545" );
  const ethereum = window.ethereum;

  let accounts = web3.eth.getAccounts();

  var patientStorage = contract(PatientStorage);
  patientStorage.setProvider(web3.currentProvider);
  var doctorStorage = contract(DoctorStorage);
  doctorStorage.setProvider(web3.currentProvider);

const CreatePatientForm = (props) => {
  const INITIAL_STATE = {
    username: "",
    ETHaddress:"",
    // IPFSaddress:""
  }
  // var [ipfsHash,setHash] = useState('');
  const [addre,setAddre] = useState('Press Enable Ethereum!')
  const [checkbox, setCheckbox] = useState(0)
  const {handleSubmit, handleChange, values, errors} = useForm(submit,INITIAL_STATE,addre,validate);
  const handleCheckboxChange = (val) => {setCheckbox(val)
    console.log(val)}
  


  async function submit() {
    var valuesBuffer = Buffer.from(JSON.stringify(values)); //values.ETHaddress + values.username + ipfsHash
    var usnameByte32 = ethers.utils.formatBytes32String(values.username);
    web3.eth.defaultAccount = accounts[0]
    
    if(checkbox === 0){
      console.error('选择病人或医生其中一位角色')
    }else{
      await ipfs.add(valuesBuffer, (error, result) =>{
        if(error){
          console.error(error)
          return
        }
  
        console.log(result[0].hash)
        console.log(checkbox)
        if(checkbox === 1){
          patientStorage.deployed().then(function(contractInstance){
            contractInstance.registerPatient(usnameByte32, Buffer.from(result[0].hash),{gas: 3000000 ,from: ethereum.selectedAddress}).then(function(success){
              if(success){
                console.log("created patient on ethereum!");
                console.log("CREATING CONSULTATION");
                patientContractCreation(addre,usnameByte32);
              }else{
                console.log("error creating patient on ethereum!");
              }
            });
          }).catch(function(e) {
            // There was an error! Handle it.
            console.log('error creating patient:', values.username, ':', e);
          });
        }
        if(checkbox === 2){
          doctorStorage.deployed().then(function(contractInstance){
            contractInstance.registerDoctor(usnameByte32, Buffer.from(result[0].hash),{gas: 3000000 ,from: ethereum.selectedAddress}).then(function(success){
              if(success){
              console.log("created doctor on ethereum!");
              
              }else{
                console.log("error creating doctor on ethereum!");
              }
            });
          }).catch(function(e) {
            // There was an error! Handle it.
            console.log('error creating doctor:', values.username, ':', e);
          });
        }

      })
        console.log("submitted successfully")
    }
      
  //     const a = Patient.deployed().then(function(contractInstance){
  //       contractInstance.getIpfsHashByPatientName(usnameByte32).then(console.log(a))
  //     });
  }
 const ethereumButton = () => {
  if(ethereum){
    web3.eth.getAccounts((err, accounts) => {
      if (accounts.length === 0) {
        // there is no active accounts in MetaMask
        this.console.log('there is no active accounts in MetaMask')
      }else {
        // It's ok
          web3.eth.getAccounts(console.log);
          ethereum.on('accountsChanged',function(accounts){
          console.log(ethereum.selectedAddress)
          INITIAL_STATE.ETHaddress = ethereum.selectedAddress
        });
        }
      });
    }
    ethereum.on('accountsChanged',function(accounts){
      setAddre(ethereum.selectedAddress)
      INITIAL_STATE.ETHaddress = ethereum.selectedAddress
    });
    setAddre(ethereum.selectedAddress)
    INITIAL_STATE.ETHaddress = ethereum.selectedAddress
  }
  
return(
<div class="col-lg-3 mt-1 mb-3">
<div class="card card-profile-signup p-1">
  <form onSubmit={handleSubmit} className='formbase' noValidate>
    <div class="card-body">
      <h5 class="card-title">Create your profile</h5>
      <div class="form-group">
        <label for="username">Username</label>
        <input name="username"
               value={values.username}
               type="text" 
               class="form-control" 
               id="sign-up-username" 
               required="required"
               onChange={handleChange}
        />
        {errors.username && <p>{errors.username}</p>}
      </div>

      <ToggleButtonGroup type="radio" name="options" value={checkbox} onChange={handleCheckboxChange}>
        <ToggleButton value={1}>病人</ToggleButton>
        <ToggleButton value={2}>医生</ToggleButton>
        {checkbox < 0 && 
          <p>选择病人或医生</p>
        }
      </ToggleButtonGroup>
      <div>ETH Address:
        <span class="eth-address"></span>
        <input type="text"
               name="ethaddress" 
               class="form-control" id="sign-up-eth-address" 
               value={addre}
               disabled
               onChange={handleChange}
        />
        {errors.addre && <p>{errors.addre}</p>}
      </div>
      <button type="submit" class="btn btn-primary" id="sign-up-button" >Sign Up</button>
    </div>
   
  </form>
  <button onClick={ethereumButton} class="enableEthereumButton">Enable Ethereum</button>
  <Link to="/" className="btn btn-link">Login</Link>
</div>
</div>
 );
}

export default CreatePatientForm;
