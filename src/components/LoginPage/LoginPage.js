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
    const [addre,setAddre] = useState('Press Enable Ethereum!')
    const {handleSubmit, handleChange, values, errors} = useForm(submit, INITIAL_STATE, addre, validate);

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

        let accounts = web3.eth.getAccounts();
        async function submit() {
          //  setAuth(authe.isLoading{true})
            // var valuesBuffer = Buffer.from(JSON.stringify(values)); //values.ETHaddress + values.username + ipfsHash
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
                      localStorage.setItem('userlogined',values.username)
                      console.log(localStorage.getItem('userlogined'))
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
                    }
                  })
                }
              })
            })
          }


    return (
        <div className="col-md-6 col-md-offset-3">
            <h2>Login</h2>
            <form name="form" onSubmit={handleSubmit} noValidate>
                <div className={'form-group'}>
                    <label htmlFor="username">Username</label>
                    <input type="text" className="form-control" name="username" value={values.username} onChange={handleChange} />
                    {/* {submitted && !username &&
                        <div className="help-block">Username is required</div>
                    } */}
                </div>
                {errors.username && <p>{errors.username}</p>}
                <div className={'form-group'}>
                    <p>ETH Address:
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
                    <button type={submit} className="btn btn-primary">Login</button>
                    {/* {loggingIn &&
                        <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                    } */}
                    
                </div>
            </form>
            <Link to="/register" className="btn btn-link">Register</Link>
            <button onClick={ethereumButton} class="enableEthereumButton">Enable Ethereum</button>
        </div>
    );
}

export default LoginForm;