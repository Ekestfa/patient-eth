import React,{useState, useEffect} from 'react';
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

const TestList = () => {
const [test, setTest] = useState({})
const [count, setCount] = useState(0);
const [addresses, setAdresses] = useState([])

async function IPFSREADER(element){
    let convertedIPFSaddress = ethers.utils.toUtf8String(element)
    await ipfs.cat(convertedIPFSaddress).then(function(result){
        let cons = result.toString('utf8')
        const parsed = JSON.parse(cons);
        // console.log("cons:",parsed)
        setTest(parsed)
        // console.log("cons:",consul)
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
        contractInstance.getPatientContractAddressByPatientName(usnameByte32).then(function(result){
            const PatientContract = new web3.eth.Contract(Patient.abi,result)
            PatientContract.methods.getTestCount().call({from: ethereum.selectedAddress})
                .then(function(result){
                    console.log("count:", result)
                    setCount(result);
                })
        })
    })

    patientstorage.deployed().then(function(contractInstance){
        contractInstance.getPatientContractAddresses().then(function(result){
            console.log("Patient Contract Adress:",result)
        })
    })

    patientstorage.deployed().then(function(contractInstance){
        contractInstance.getPatientContractAddressByPatientName(usnameByte32).then(function(result){
            console.log(result)
        })
    })

    patientstorage.deployed().then(function(contractInstance){
        contractInstance.getPatientContractAddressByPatientName(usnameByte32).then(function(result){
            const PatientContract = new web3.eth.Contract(Patient.abi,result)
            PatientContract.methods.getTestIpfsList().call({from: ethereum.selectedAddress}).then(function(result){
                console.log("Consul IPFSes:", result)
                setAdresses(result); // Setted all ipfs to array (need, ethers.utils.toUtf8String)
                for(var i=0; i<result.length; i++){
                    console.log("ethersUtil:",ethers.utils.toUtf8String(result[i]))
                    IPFSREADER(result[i]);
                    console.log("reading:",result[i])
                }
            })
        });
    })
    // console.log(consul)
}//submit


// useEffect(() => {
//     addresses.forEach(element => {
//         console.log("element:",element)
//         IPFSREADER(element)
//     });
//     console.log('consul:',consul)
// },[addresses],[consul]);

useEffect(()=>{
    console.log("cons:",test)
},[test])

    return (
        <div>
        <button onClick={submit}>获取数据</button> 
        <Card bg="dark">
        <Card.Header>{test.date} {test.time}</Card.Header>
        <Card.Body>
            <blockquote className="blockquote mb-0">
            <p>医生: {test.doctorName} </p>
            <p>地址: {test.address}{' '}</p>
            <p>检查名字: {test.testname}{' '}</p>
            <p>检查类型: {test.testtype}{' '}</p>
            <p>检查结果: {test.result}{' '}</p>
            <footer className="blockquote-footer">
                Someone famous in <cite title="Source Title">Source Title</cite>

            </footer>
            </blockquote>
        </Card.Body>
        </Card>
            
        </div>
        );
}

export default TestList;