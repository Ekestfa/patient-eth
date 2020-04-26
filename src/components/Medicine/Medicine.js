import React,{useState, render} from 'react';
import {default as Web3} from 'web3';
import contract from 'truffle-contract';
import {ethers} from 'ethers';
import PatientStorage from "../../abi/PatientStorage.json"
import ipfs from '../../ipfs';
import { Card } from 'react-bootstrap';

const web3 = new Web3(Web3.givenProvider || "http://localhost:7545" );
const ethereum = window.ethereum;


const patientstorage = contract(PatientStorage);
patientstorage.setProvider(web3.currentProvider);


var patientname = localStorage.getItem('p');
// var valuesBuffer = Buffer.from(patientname);
var patientaddress=ethereum.selectedAddress;
let accounts = web3.eth.getAccounts();



const Medicine = () => {

const [consul, setConsul] = useState([{}])

async function submit()
 {
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

    // console.log(med)

    patientstorage.deployed().then(function(contractInstance){
        contractInstance.getConsultationsByPatientName(usnameByte32)
        .then(function(result){
            // console.log(result)
            // console.log(result.length)
            // result.forEach(element => {
            //     console.log(element)
            //     getConsultation(element)
                
            // });
            console.log(ethers.utils.toUtf8String(result[0]))
            console.log(ethers.utils.toUtf8String(result[1]))
            console.log(ethers.utils.toUtf8String(result[2]))
            getConsultation(result[0]);
            // console.log(obj)
        })
    })
}

function getConsultation(element){
    patientstorage.deployed().then(function(contractInstance){
        contractInstance.getConsultationIpfsByConsultationID(element)
        .then(function(v){
            // console.log(v)
            let b = ethers.utils.toUtf8String(v)
            // console.log("consulhash:",b)
            ipfs.cat(b).then(function(v){
                console.log(v)
                let cons = v.toString('utf8')
                const parsed = JSON.parse(cons);
                console.log("cons:",parsed)

                setConsul(parsed)
            })
        })
    })
    
}


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