import React,{useState} from 'react';
import {default as Web3} from 'web3';
import contract from 'truffle-contract';
import {ethers} from 'ethers';
import ipfs from '../../ipfs';
import { Card } from 'react-bootstrap';
import PatientStorage from "../../abi/PatientStorage.json"
const Patient = require('../../abi/Patient.json');

const web3 = new Web3(Web3.givenProvider || "http://localhost:7545" );
const ethereum = window.ethereum;

const patientstorage = contract(PatientStorage);
patientstorage.setProvider(web3.currentProvider);

const Medicine = () => {

const [consul, setConsul] = useState([{}])

function IPFSREADER(element){
    let convertedIPFSaddress = ethers.utils.toUtf8String(element)
    ipfs.cat(convertedIPFSaddress).then(function(result){
        console.log('ipfs.cat result:', result)
        let cons = result.toString('utf8')
        const parsed = JSON.parse(cons);
        console.log("cons:",parsed)
        setConsul(parsed)
    })
}

async function submit()
 {
    var patientname = localStorage.getItem('p');
    var usnameByte32 = ethers.utils.formatBytes32String(patientname);
    // patientstorage.deployed().then(function(contractInstance){
    //     contractInstance.getIpfsHashByPatientName(usnameByte32).then(function(resultIPFS){
    //         let b = ethers.utils.toUtf8String(resultIPFS)
    //         console.log("toUtf8string", b)
    //         ipfs.cat(b).then(function(v){
    //             console.log(v)
    //             let data = v.toString('utf8')
    //             console.log(data)
    //         })
    //     })
    // })


    patientstorage.deployed().then(function(contractInstance){
        contractInstance.getPatientContractAddresses().then(function(result){
            console.log(result)
        })
    })

    patientstorage.deployed().then(function(contractInstance){
        contractInstance.getPatientContractAddressByPatientName(us).then(function(result){
            console.log(result)
        })
    })

    await patientstorage.deployed().then(function(contractInstance){
        contractInstance.getPatientContractAddressByPatientName(usnameByte32).then(function(result){
            const PatientContract = new web3.eth.Contract(Patient.abi,result)
            PatientContract.methods.getConsultationsIpfsList().call({from: ethereum.selectedAddress}).then(function(result){
                console.log("Consul IPFSes:", result)
                for(var i=0; i<result.length; i++){
                    console.log(ethers.utils.toUtf8String(result[i]))
                    IPFSREADER(result[i]);
                }
            })
        });
    })

}//submit

    return (
        <div>
        <button onClick={submit}>获取数据</button>
            <Card bg="dark">
                <Card.Header>{consul.date} {consul.time}</Card.Header>
                <Card.Body>
                    <blockquote className="blockquote mb-0">
                    <p>{' '}Doctor:{consul.doctorName} </p>
                    <p>{' '}Address:{consul.addr}{' '}</p>
                    <p>{' '}Disease:{consul.disease}{' '}</p>
                    <p>{' '}medicine:{consul.medicine}{' '}</p>
                    <footer className="blockquote-footer">
                        Someone famous in <cite title="Source Title">Source Title</cite>
                        
                    </footer>
                    </blockquote>
                </Card.Body>
            </Card> 
            </div>
        );
}

export default Medicine;