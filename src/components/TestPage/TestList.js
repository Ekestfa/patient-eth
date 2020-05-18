import React from 'react';
import {default as Web3} from 'web3';
import contract from 'truffle-contract';
import {ethers} from 'ethers';
import ipfs from '../../ipfs';
import { Card, Navbar,FormControl,InputGroup, DropdownButton, Dropdown } from 'react-bootstrap';
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
        const {testDatas} = this.state;
        let convertedIPFSaddress = ethers.utils.toUtf8String(element)
        ipfs.cat(convertedIPFSaddress).then(result => {
            let cons = result.toString('utf8')
            const parsed = JSON.parse(cons);
            this.setState({testDatas: [...this.state.testDatas, parsed]})
        })
    }

    componentDidMount(){
        const {addresses, count} = this.state;
        var patientname = localStorage.getItem('p');
        if(patientname===null){
            patientname = this.props.name
        }
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

    testCard = key => {
        return (
        <Card className="mt-5" bg="light">
            <Card.Header>{key.date} {key.time}</Card.Header>
            <Card.Body>
                <blockquote className="blockquote mb-0">
                <p>医生: {key.doctorName} </p>
                <p>地址: {key.address}</p>
                <p>检查名字: {key.testname}</p>
                <p>检查类型: {key.testtype}</p>
                <p>检查结果: {key.result}</p>
                <footer className="blockquote-footer">
                创建者 <cite title="Source Title">{key.creator}</cite>

                </footer>
                </blockquote>
            </Card.Body>
            </Card>
            )
    }
    render(){
        const {testDatas, submitted, searchtype, searchtext} = this.state
        var renderTestdata;

        if(submitted){
            let array = []
                if( searchtype === '全'){
                    renderTestdata= Object.values(testDatas).map(key => {
                        return(
                            this.testCard(key)
                        )
                })
                }
                if( searchtype === '按创建者'){
                    testDatas.forEach(element => {
                        if(element.creator == searchtext)
                            array.push(element);
                    });
                    renderTestdata= Object.values(array).map(key => {
                        return(
                            this.testCard(key)
                        )}
                    )
                }
    
                if( searchtype === '按时间'){
                    testDatas.forEach(element => {
                        if(element.date == searchtext)
                            array.push(element);
                    });
                    renderTestdata= Object.values(array).map(key => {
                        return(
                            this.testCard(key)
                        )}
                    )
                }
                
                if( searchtype === '按检查名'){
                    testDatas.forEach(element => {
                        if(element.testname == searchtext)
                            array.push(element);
                    });
                    renderTestdata= Object.values(array).map(key => {
                        return(
                            this.testCard(key)
                        )}
                    )
                }

                if( searchtype === '按检查类型'){
                    testDatas.forEach(element => {
                        if(element.testtype == searchtext)
                            array.push(element);
                    });
                    renderTestdata= Object.values(array).map(key => {
                        return(
                            this.testCard(key)
                        )}
                    )
                }
        }

        return (
            <>
                <div>
                <Navbar className="navbar" bg="dark" variant="dark" scrolling dark expand="md" fixed="bottom" style={{ height: '50px'}}>
                        <InputGroup className="mt-2">
                            <DropdownButton
                            as={InputGroup.Prepend}
                            variant="outline-secondary"
                            variant="success"
                            drop="up"
                            title={searchtype}
                            id="input-group-dropdown-1"
                            >
                            <Dropdown.Item href="#tests#list#all" name='全' onClick={this.chooseSearchType}>全</Dropdown.Item>
                            <Dropdown.Item href="#tests#list#bycreator" name='按创建者' onClick={this.chooseSearchType}>创建者</Dropdown.Item>
                            <Dropdown.Item href="#tests#list#bytime" name='按时间'  onClick={this.chooseSearchType} >时间</Dropdown.Item>
                            <Dropdown.Item href="#tests#list#byname" name='按检查名' onClick={this.chooseSearchType}>名字</Dropdown.Item>
                            <Dropdown.Item href="#tests#list#bytype" name='按检查类型' onClick={this.chooseSearchType}>类型</Dropdown.Item>
                            </DropdownButton>
                            {   searchtype =='按时间' &&
                                <FormControl aria-describedby="basic-addon1" type="date" name='searchtext' onChange={this.handleChange}/>
                            }
                            {   searchtype =='按创建者' &&
                                <FormControl aria-describedby="basic-addon1" name='searchtext' placeholder='请输入创建者名' onChange={this.handleChange}/>
                            }
                            {   searchtype =='按检查名' &&
                                <FormControl aria-describedby="basic-addon1" name='searchtext' placeholder='请输入按检查名' onChange={this.handleChange}/>
                            }
                            {   searchtype =='按检查类型' &&
                                <FormControl aria-describedby="basic-addon1" name='searchtext' placeholder='请输入检查类型' onChange={this.handleChange}/>
                            }
                        </InputGroup>
                    </Navbar>
                </div>
                <div>
                    {renderTestdata}
                </div>
            </>
            );
        }
    }

export default TestList;