import {default as Web3} from 'web3';
import PatientStorage from "../abi/PatientStorage.json"
import contract from 'truffle-contract';

const Consultation = require('../abi/Consultation.json')
const web3 = new Web3(Web3.givenProvider || "http://localhost:7545" );
const ConsultationContract = new web3.eth.Contract(Consultation.abi)

const patientstorage = contract(PatientStorage);
patientstorage.setProvider(web3.currentProvider);

export{
    consultationContractCreation,
    getPatientByPatientName,
    getConsultationAddress,
    createConsultation
}

async function consultationContractCreation(patientAddress, patientuname, consulDateID, consipfsHash){
    const gas = await ConsultationContract.deploy({
        data: Consultation.bytecode,
        arguments: [patientAddress,patientuname,consulDateID,consipfsHash]    
    }).estimateGas()

    ConsultationContract.deploy({
        data: Consultation.bytecode,
        arguments: [patientAddress,patientuname,consulDateID,consipfsHash]
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
        // console.log(newContractInstance.options.address)
        patientstorage.deployed().then(function(contractInstance){
          console.log("patientstorage, consul creation")
          console.log(newContractInstance.options.address)
          contractInstance.consAddressSave(newContractInstance.options.address,{from:patientAddress}).then(function(result){
            console.log("added:",result)
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

function getConsultationAddress(patientAddress){
  // const c = new web3.eth.Contract(Consultation.abi)
  // let instance = c.at(patientAddress)
  // instance.getConsultationAddress();
}

function createConsultation(patientAddress, patientuname, consulDateID, consipfsHash){
  consultationContractCreation(patientAddress, patientuname, consulDateID, consipfsHash).then(function(result){
    console.log(result)
    patientstorage.deployed().then(function(contractInstance){
      contractInstance.consultationCreate(patientuname, consulDateID, consipfsHash)
    })
  })
}


