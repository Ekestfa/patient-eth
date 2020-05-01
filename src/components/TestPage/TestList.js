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

class TestList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            testDatas:[],
            count:0,
            addresses:[]
        }
        this.IPFSREADER = this.IPFSREADER.bind(this);
    }

IPFSREADER = element => {
    const {testDatas} = this.state;
    let convertedIPFSaddress = ethers.utils.toUtf8String(element)
    ipfs.cat(convertedIPFSaddress).then(result => {
        let cons = result.toString('utf8')
        const parsed = JSON.parse(cons);
        this.setState({testDatas: [...this.state.testDatas, parsed]})
    })
}

componentDidMount()
 {
    const {addresses, count} = this.state;
    var patientname = localStorage.getItem('p');
    var usnameByte32 = ethers.utils.formatBytes32String(patientname);

    patientstorage.deployed().then(contractInstance => {
        contractInstance.getPatientContractAddressByPatientName(usnameByte32).then(result => {
            const PatientContract = new web3.eth.Contract(Patient.abi,result)
            PatientContract.methods.getTestCount().call({from: ethereum.selectedAddress})
                .then(result => {
                    console.log("检查数字:", result)
                    this.setState({count:result});
                })
        })
    })

    patientstorage.deployed().then(contractInstance => {
        contractInstance.getPatientContractAddresses().then(result => {
            console.log("病人整个智能合约：",result)
        })
    })

    patientstorage.deployed().then(contractInstance => {
        contractInstance.getPatientContractAddressByPatientName(usnameByte32).then(result => {
            console.log('登录的病人检查智能合约：',result)
        })
    })

    patientstorage.deployed().then(contractInstance => {
        contractInstance.getPatientContractAddressByPatientName(usnameByte32).then(result => {
            const PatientContract = new web3.eth.Contract(Patient.abi,result)
            PatientContract.methods.getTestIpfsList().call({from: ethereum.selectedAddress}).then(result => {
                console.log("检查的IPFS哈希地址：", result)
                this.setState({addresses : result}); // Setted all ipfs to array (need, ethers.utils.toUtf8String)
                for(var i=0; i<result.length; i++){
                    console.log("已转换成UTF8的IPFS地址：",ethers.utils.toUtf8String(result[i]))
                    this.IPFSREADER(result[i]);
                    console.log("正在获取数据:",result[i])
                }
            })
        });
    })
}//submit

componentDidUpdate(){
    const {testDatas} = this.state
    console.log("检查信息：", {testDatas})
}

render(){
    const {testDatas} = this.state
    const renderTestdata =  Object.values(testDatas).map(key => {
        return(
        <Card className="mt-5" bg="dark">
        <Card.Header>{key.date} {key.time}</Card.Header>
        <Card.Body>
            <blockquote className="blockquote mb-0">
            <p>医生: {key.doctorName} </p>
            <p>地址: {key.address}</p>
            <p>检查名字: {key.testname}</p>
            <p>检查类型: {key.testtype}</p>
            <p>检查结果: {key.result}</p>
            <footer className="blockquote-footer">
                创建者 <cite title="Source Title">Source Title</cite>

            </footer>
            </blockquote>
        </Card.Body>
        </Card>
        )
    });

    return (
        <div>
            {renderTestdata}
        </div>
        );
    }
}

export default TestList;