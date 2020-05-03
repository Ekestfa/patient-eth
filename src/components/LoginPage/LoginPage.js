import React, { useState } from 'react';
import useForm from './useForm'
import validate from './validateLogin';
import '../../scss/App.scss';
import {Link} from  'react-router-dom';
import {default as Web3} from 'web3';
import contract from 'truffle-contract';
import {ethers} from 'ethers';
import PatientStorage from "../../abi/PatientStorage.json"
import DoctorStorage from "../../abi/DoctorStorage.json"
import auth from '../../helpers/auth';

const web3 = new Web3(Web3.givenProvider || "http://localhost:7545" );
const ethereum = window.ethereum;

const patientstorage = contract(PatientStorage);
patientstorage.setProvider(web3.currentProvider);
var doctorStorage = contract(DoctorStorage);
doctorStorage.setProvider(web3.currentProvider);



const LoginForm = (props) => {
    const INITIAL_STATE = {
        username: "",
        ETHaddress:""
        // IPFSaddress:""
      }

    //   var [ipfsHash,setHash] = useState('');
    const [addre,setAddre] = useState('请启动MetaMask')
    const {handleSubmit, handleChange, values, errors} = useForm(submit, INITIAL_STATE, addre, validate);

    const ethereumButton = () => {
        if(ethereum){
          web3.eth.getAccounts((err, accounts) => {
            if (accounts.length === 0) {
              // there is no active accounts in MetaMask
              console.log('there is no active accounts in MetaMask')
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

        let accounts = web3.eth.getAccounts();
        async function submit() {
          //  setAuth(authe.isLoading{true})
            // var valuesBuffer = Buffer.from(JSON.stringify(values)); //values.ETHaddress + values.username + ipfsHash
            console.log()
            var usnameByte32 = ethers.utils.formatBytes32String(values.username);

            web3.eth.defaultAccount = accounts[0]

            patientstorage.deployed().then(function(contractInstance){
              contractInstance.hasPatient(addre).then(function(v){
                console.log(v);
                if(v===true){
                  console.log("has patient address:",v);
                //   contractInstance.getPatientNameByAddress(values.ETHaddress).then(function(vv){
                  contractInstance.getPatientNameByAddress(addre).then(function(vv){
                    console.log("In the getPatientNameByAddress",vv)
                    if(usnameByte32 === vv){
                      console.log("Patient login:", true)
                      // if true Link to account personal page
                      localStorage.setItem('p',values.username)
                      console.log(localStorage.getItem('p'))
                      auth.login( () =>{
                        props.history.push('/home')
                      });
                    }
                  })
                }
              })
            })
            doctorStorage.deployed().then(function(contractInstance){
              contractInstance.hasDoctor(addre).then(function(d){
                if(d===true){
                  console.log('Has doctor address',d)
                  contractInstance.getDoctorNameByAddress(addre).then(function(dd){
                    if(usnameByte32 === dd){
                      console.log("Doctor login:",true)
                      localStorage.setItem('d',values.username)
                      auth.login( () =>{
                        props.history.push('/doctorpage')
                      });
                    }
                  })
                }
              })
            })
          }


    return (
        <div className="col-md-6 col-md-offset-3">
            <h2>登录</h2>
            <form name="form" onSubmit={handleSubmit} noValidate>
                <div className={'form-group'}>
                    <label htmlFor="username">用户名</label>
                    <input type="text" className="form-control" name="username" value={values.username} onChange={handleChange} />
                    {/* {submitted && !username &&
                        <div className="help-block">Username is required</div>
                    } */}
                </div>
                {errors.username && <p>{errors.username}</p>}
                <div className={'form-group'}>
                    <p>以太坊地址:
                        <span class="eth-address"></span>
                        <input type="text"
                        name="ethaddress" 
                        class="form-control" id="sign-up-eth-address" 
                        value={addre}
                        disabled
                        onChange={handleChange}/>
                    </p>
                </div>
                {errors.addre && <p>{errors.addre}</p>}
                <div className="form-group">
                    <button type={submit} variant="success" className="btn btn-primary">登录</button>
                </div>
            </form>
            <Link to="/register" className="btn btn-link">注册</Link>
            <button onClick={ethereumButton} class="enableEthereumButton">启动MetaMask</button>
        </div>
    );
}

export default LoginForm;