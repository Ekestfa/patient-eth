import React from 'react';
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

class ConsulList extends React.Component{
constructor(props){
    super(props);
    this.state = {
        consul:[],
        count:0,
        addresses:[]
    }
    this.IPFSREADER = this.IPFSREADER.bind(this)
}

IPFSREADER = element => {
    let convertedIPFSaddress = ethers.utils.toUtf8String(element)
    ipfs.cat(convertedIPFSaddress).then(result => {
        let cons = result.toString('utf8')
        const parsed = JSON.parse(cons);
        // console.log("cons:",parsed)
        this.setState({consul: [...this.state.consul, parsed]})
        // console.log("cons:",consul)
    })
}

componentDidMount(){
    const {addresses, count} = this.state;
    var patientname = localStorage.getItem('p');
    if(patientname===null){
        patientname = this.props.name
    }
    var usnameByte32 = ethers.utils.formatBytes32String(patientname);
    // console.log(usnameByte32)

    patientstorage.deployed().then(contractInstance => {
        contractInstance.getPatientContractAddressByPatientName(usnameByte32).then(result => {
            const PatientContract = new web3.eth.Contract(Patient.abi,result)
            PatientContract.methods.getConsultationsCount().call()
                .then(result => {
                    console.log({patientname},"诊断书数字:", result)
                    this.setState({count : result});
                })
        })
    })

    patientstorage.deployed().then(contractInstance => {
        contractInstance.getPatientContractAddresses().then(result => {
            console.log('病人整个智能合约：',result)
        })
    })

    patientstorage.deployed().then(contractInstance => {
        contractInstance.getPatientContractAddressByPatientName(usnameByte32).then(result => {
            console.log('登录的病人诊断书智能合约：', result)
        })
    })

    patientstorage.deployed().then(contractInstance => {
        contractInstance.getPatientContractAddressByPatientName(usnameByte32).then(result => {
            const PatientContract = new web3.eth.Contract(Patient.abi,result)
            PatientContract.methods.getConsultationsIpfsList().call().then(result=> {
                console.log({patientname},"诊断书的IPFS哈希地址：", result)
                this.setState({addresses:result}); // Setted all ipfs to array (need, ethers.utils.toUtf8String)
                for(var i=0; i<result.length; i++){
                    console.log("已转换成UTF8的IPFS地址：",ethers.utils.toUtf8String(result[i]))
                    this.IPFSREADER(result[i]);
                    console.log("正在获取数据:",result[i])
                }
            })
        });
    })
}

componentDidUpdate(){
    const {consul} = this.state
    console.log("诊断书信息：", {consul})
}

render(){
    const {consul} = this.state

    const renderConsuldata =  Object.values(consul).map(key => {
        return (
        <Card className="mt-5" bg="dark">
        <Card.Header>{key.date} {key.time}</Card.Header>
        <Card.Body>
            <blockquote className="blockquote mb-0">
            <p>{' '}医生:{key.doctorName} </p>
            <p>{' '}看病地址:{key.addr}</p>
            <p>{' '}疾病类型:{key.disease}</p>
            <p>{' '}药:{key.medicine}</p>
            <footer className="blockquote-footer">
                创建者：<cite title="Source Title">{key.creator}</cite>  
            </footer>
            </blockquote>
        </Card.Body>
        </Card>
        )

    });

    return (
        <div>
            {renderConsuldata}
        </div>
        );
    }
}

export default ConsulList;