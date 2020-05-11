import {useState} from 'react';
import {default as Web3} from 'web3';
import PatientStorage from "../abi/PatientStorage.json"
import contract from 'truffle-contract';


const Patient = require('../abi/Patient.json');
const web3 = new Web3(Web3.givenProvider || "http://localhost:7545" );
const PatientContract = new web3.eth.Contract(Patient.abi);

const patientstorage = contract(PatientStorage);
patientstorage.setProvider(web3.currentProvider);

export{
    getPatientByPatientName,
    patientContractCreation,
    consultationCreate,
    testCreate
}

async function patientContractCreation(patientAddress, patientuname){
  const gas = await PatientContract.deploy({
    data: Patient.bytecode,
    arguments: [patientAddress,patientuname]
}).estimateGas()

  PatientContract.deploy({
    data: Patient.bytecode,
    arguments: [patientAddress,patientuname]
  }).send({
    from: patientAddress,
    gas: gas,
  })
  .on('error', (error) => {
    console.log(error)
  })
  .on('transactionHash', (transactionHash) => {
    console.log(transactionHash)
  })
  .on('receipt', (receipt) => {
    // receipt will contain deployed contract address
    console.log(receipt)
    //  console.log(receipt.contractAddress)
  })
  .on('confirmation', (confirmationNumber, receipt) => {
    console.log(receipt)
  })
  .on('receipt', (receipt) => {
    // receipt will contain deployed contract address
  }).then(function(newContractInstance){
    patientstorage.deployed().then(function(contractInstance){
      contractInstance.savePatientContractAddress(newContractInstance.options.address,{from:patientAddress}).then(function(result){
        console.log("Patient Storage added Patient contract:",result)
      }) 
    })
  })
}


function getPatientByPatientName(usnameByte32){
    patientstorage.deployed().then(function(contractInstance){
        contractInstance.getPatientByPatientName(usnameByte32).then(function(result){
            console.log(result)
    
        })
    })
  }


function consultationCreate(patientName, patientAddress, consID, consIPFS){
  patientstorage.deployed().then(function(contractInstance){
    contractInstance.getPatientContractAddressByPatientName(patientName).then(function(result){
      console.log(result)
        const PatientContract = new web3.eth.Contract(Patient.abi,result)
        PatientContract.methods.consultationCreate(consID,consIPFS).send({from: patientAddress, to:PatientContract}).then(function(result){
            console.log("Creation of consultation:", result);
            if(result){
              return true;
            }else return false;
        })
    });
 })
}

async function getConsultationsIpfsList(patientName, patientAddress){
  await patientstorage.deployed().then(function(contractInstance){
    contractInstance.getPatientContractAddressByPatientName(patientName).then(function(result){
        const PatientContract = new web3.eth.Contract(Patient.abi,result)
        PatientContract.methods.getConsultationsIpfsList().call({from: patientAddress}).then(function(result){
            console.log("Consul IPFSes:", result);
            return result;
        })
    });
 })
}

function testCreate(patientName, patientAddress, testID, testIPFS){
  patientstorage.deployed().then(function(contractInstance){
    contractInstance.getPatientContractAddressByPatientName(patientName).then(function(result){
      console.log(result)
        const PatientContract = new web3.eth.Contract(Patient.abi,result)
        PatientContract.methods.testCreate(testID, testIPFS).send({from: patientAddress, to:PatientContract}).then(function(result){
            console.log("Creation of test:", result);
            if(result){
              return true;
            }else return false;
        })
    });
 })
}
