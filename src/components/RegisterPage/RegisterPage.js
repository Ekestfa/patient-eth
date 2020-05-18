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
import ToastComponent from "../InfoToast/ToastComponent"

  const web3 = new Web3(Web3.givenProvider || "http://localhost:7545" );
  const ethereum = window.ethereum;

  let accounts = web3.eth.getAccounts();

  var patientStorage = contract(PatientStorage);
  patientStorage.setProvider(web3.currentProvider);
  var doctorStorage = contract(DoctorStorage);
  doctorStorage.setProvider(web3.currentProvider);

const CreatePatientForm = (props) => {
  const USER_INFO = {
    username: "",
    ETHaddress:"",
    // IPFSaddress:""
  }

  const [submitted, setSubmitButton] = useState(false);
  const [addre,setAddre] = useState('启动MetaMask！')
  const [checkbox, setCheckbox] = useState(0)
  const {handleSubmit, handleChange, values, errors} = useForm(submit,USER_INFO,addre,validate);
  const handleCheckboxChange = (val) => {setCheckbox(val)
    //console.log(val)
  }
  
  function clearData(){
    values.username = "";
    setCheckbox(0);
  }
  function handleSubmitButton(){
    setSubmitButton(false);
  }

  async function submit() {
    var valuesBuffer = Buffer.from(JSON.stringify(values)); //values.ETHaddress + values.username
    var usnameByte32 = ethers.utils.formatBytes32String(values.username);
    web3.eth.defaultAccount = accounts[0]
    
    if(checkbox === 0){
      console.error('选择病人或医生其中一位角色')
      setSubmitButton(false);
    }
    if(checkbox === 1){
      // 选了病人角色
      doctorStorage.deployed().then(contractInstance => {
        contractInstance.hasDoctor(ethereum.selectedAddress).then(hasdoc=>{
          if(hasdoc){ // 有医生使用此以太坊地址曾注册过
            console.error("存在用户以太坊地址！");
            setSubmitButton(false);
          }
          else{ //没有医生，继续下一步
            ipfs.add(valuesBuffer, (error, result) =>{
              if(error){
                console.error(error)
                setSubmitButton(false);
                return
              }
              console.log("IPFS返回的地址哈希:", result[0].hash)
              patientStorage.deployed().then(function(contractInstance){
                contractInstance.registerPatient(usnameByte32, Buffer.from(result[0].hash),{gas: 3000000 ,from: ethereum.selectedAddress}).then(function(success, transactionHash){
                  if(success){
                    console.log("病人到以太坊注册成功！");
                    console.log("正在新建个人空间智能合约。。。");
                    patientContractCreation(addre,usnameByte32, handleSubmitButton);
                    // setSubmitButton(false);
                    clearData();
                  }else{
                    console.log("注册病人遇到问题！");
                    setSubmitButton(false);
                  }
                }).catch(function(e) {
                  console.log("TX ERROR:", values.username, ":", e)
                  setSubmitButton(false);
                  clearData()
                })
              }).catch(function(e) {
                // There was an error! Handle it.
                console.log('error creating patient:', values.username, ':', e);
                setSubmitButton(false);
                clearData()
              });
            })
          }
        })
      })
      setSubmitButton(false);
    }
    if(checkbox === 2){
      patientStorage.deployed().then(contractInstance => {
        contractInstance.hasPatient(ethereum.selectedAddress).then(haspat => {
          if(haspat){ // 有病人使用此以太坊地址曾注册过
            console.error("存在用户以太坊地址！")
            setSubmitButton(false);
          }
          else{ // 可注册医生
            ipfs.add(valuesBuffer, (error, result) =>{
              if(error){
                console.error(error)
                setSubmitButton(false);
                return
              }
              doctorStorage.deployed().then(function(contractInstance){
                contractInstance.registerDoctor(usnameByte32, Buffer.from(result[0].hash),{gas: 3000000 ,from: ethereum.selectedAddress}).then(function(success){
                  if(success){
                  console.log("created doctor on ethereum!");
                  setSubmitButton(false);
                  clearData()
                  }else{
                    console.log("error creating doctor on ethereum!");
                    setSubmitButton(false);
                  }
                });
              }).catch(function(e) {
                // There was an error! Handle it.
                console.log('error creating doctor:', values.username, ':', e);
                setSubmitButton(false);
              });
            })
          }
        })
      })
      setSubmitButton(false);
  }  
  console.log("submitted successfully")
  setSubmitButton(true);
  }

 const ethereumButton = () => {
  if(ethereum){
    web3.eth.getAccounts((err, accounts) => {
      if (accounts.length === 0) {
        // there is no active accounts in MetaMask
        ethereum.enable();
        this.console.log('there is no active accounts in MetaMask')
      }else {
        // It's ok
          web3.eth.getAccounts(console.log);
          ethereum.on('accountsChanged',function(accounts){
          console.log(ethereum.selectedAddress)
          USER_INFO.ETHaddress = ethereum.selectedAddress
        });
        }
      });
    }
    ethereum.on('accountsChanged',function(accounts){
      setAddre(ethereum.selectedAddress)
      USER_INFO.ETHaddress = ethereum.selectedAddress
    });
    setAddre(ethereum.selectedAddress)
    USER_INFO.ETHaddress = ethereum.selectedAddress
  }
  
return(
      // <ToastComponent holdername="demo" time={Date()} info="demo"/>
<div class="col-lg-3 mt-1 mb-3">
  <div class="card card-profile-signup p-1">
  <h5 class="card-title">注册</h5>
    <form onSubmit={handleSubmit} className='formbase' noValidate>
      <div class="card-body">
        <div class="form-group">
          <label for="username">用户名：</label>
          <input name="username"
                value={values.username}
                type="text" 
                class="form-control" 
                id="sign-up-username" 
                required="required"
                onChange={handleChange}
          />
          {errors.username && <p>{errors.username}</p>}
          <ToggleButtonGroup type="radio" name="options" value={checkbox} onChange={handleCheckboxChange}>
          <ToggleButton value={1}>病人</ToggleButton>
          <ToggleButton value={2}>医生</ToggleButton>
          {checkbox < 0 && 
            <p>选择病人或医生</p>
          }
        </ToggleButtonGroup>
        <div>以太坊地址：
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
        {
          submitted
          ? <button type="submit" class="btn btn-primary" id="sign-up-button" disabled>注册</button>
          : <button type="submit" class="btn btn-primary" id="sign-up-button" >注册</button>
        }
        {
          submitted
          ? <h3>正在注册，请稍候</h3>
          : <></>
        }
      </div>
    </div>
    </form>
    <button onClick={ethereumButton} class="enableEthereumButton">请启动MetaMask</button>
    <Link to="/" className="btn btn-link">登录</Link>
  </div>
</div>
 );
}

export default CreatePatientForm;
