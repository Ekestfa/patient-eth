import React from 'react';
import {default as Web3} from 'web3';
import contract from 'truffle-contract';
import {ethers} from 'ethers';
import ipfs from '../../ipfs';
import { Card, FormControl,InputGroup, DropdownButton, Dropdown, Navbar} from 'react-bootstrap';
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
        addresses:[],
        searchtype:'全',
        searchtext:'',
        submitted:true,
    }
    this.IPFSREADER = this.IPFSREADER.bind(this);
    this.chooseSearchType = this.chooseSearchType.bind(this);
    this.handleChange = this.handleChange.bind(this);
}

handleChange = event => {
    const {name, value} = event.target;
    this.setState({[name] : value});
  }

chooseSearchType = event => {
    const {name} = event.target;
    this.setState({searchtype:name})
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

consulCard = key => {
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
}
render(){
    const {consul, searchtype, searchtext, submitted} = this.state;
    var renderConsuldata;
    if(submitted){
        let array = []
            if( searchtype === '全'){
                renderConsuldata= Object.values(consul).map(key => {
                    return(
                        this.consulCard(key)
                    )
            })
            }
            if( searchtype === '按创建者'){
                consul.forEach(element => {
                    if(element.creator == searchtext)
                        array.push(element);
                });
                renderConsuldata= Object.values(array).map(key => {
                    return(
                        this.consulCard(key)
                    )}
                )
            }

            if( searchtype === '按时间'){
                consul.forEach(element => {
                    if(element.date == searchtext)
                        array.push(element);
                });
                renderConsuldata= Object.values(array).map(key => {
                    return(
                        this.consulCard(key)
                    )}
                )
            }
            
            if( searchtype === '按疾病'){
                consul.forEach(element => {
                    if(element.disease == searchtext)
                        array.push(element);
                });
                renderConsuldata= Object.values(array).map(key => {
                    return(
                        this.consulCard(key)
                    )}
                )
            }
    }

    return (
        <>
        <Navbar className="navbar" bg="dark" variant="dark" scrolling dark expand="md" fixed="bottom">
                <InputGroup className="mt-2">
                    <DropdownButton
                    as={InputGroup.Prepend}
                    variant="success"
                    drop="up"
                    title={searchtype}
                    id="input-group-dropdown-1"
                    >
                    <Dropdown.Item href="#consultations#list#all" name='全' onClick={this.chooseSearchType}>全</Dropdown.Item>
                    <Dropdown.Item href="#consultations#list#bycreator" name='按创建者' onClick={this.chooseSearchType}>创建者</Dropdown.Item>
                    <Dropdown.Item href="#consultations#list#bytime" name='按时间'  onClick={this.chooseSearchType} >时间</Dropdown.Item>
                    <Dropdown.Item href="#consultations#list#bydisease" name='按疾病' onClick={this.chooseSearchType}>类型</Dropdown.Item>
                    </DropdownButton>
                    {   searchtype =='按时间' &&
                        <FormControl aria-describedby="basic-addon1" type="date" name='searchtext' onChange={this.handleChange}/>
                    }
                    {   searchtype =='按创建者' &&
                        <FormControl aria-describedby="basic-addon1" name='searchtext' placeholder='请输入创建者名' onChange={this.handleChange}/>
                    }
                    {   searchtype =='按疾病' &&
                        <FormControl aria-describedby="basic-addon1" name='searchtext' placeholder='请输入疾病类型' onChange={this.handleChange}/>
                    }
                </InputGroup>
        </Navbar>
        <div>
            {renderConsuldata}
        </div>
        </>
        );
    }
}

export default ConsulList;