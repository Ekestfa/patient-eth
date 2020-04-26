import React from 'react';
import {Form, Card, InputGroup, FormControl, Button} from 'react-bootstrap';
import useTestForm from './useForm';
import {default as Web3} from 'web3';
import contract from 'truffle-contract';
import {ethers} from 'ethers';
import PatientStorage from "../../abi/PatientStorage.json"
import ipfs from '../../ipfs';


const web3 = new Web3(Web3.givenProvider || "http://localhost:7545" );
const ethereum = window.ethereum;


const patientstorage = contract(PatientStorage);
patientstorage.setProvider(web3.currentProvider);

var patientname = 'patient1';
var patientaddress=ethereum.selectedAddress;
let accounts = web3.eth.getAccounts();

const TestInfo = (props) => {

const TestInfo = {
    dateID:"",
    date:'',
    time:'',
    doctorName:'',
    testName:'',
    type:'',
    addr:'',
    result:''
}
const {handleSubmit, handleChange, values} = useTestForm(submit,TestInfo);

async function submit() {
    console.log('submitted')
    console.log(values)
    var usnameByte32 = ethers.utils.formatBytes32String(patientname);
    var testdateid = ethers.utils.formatBytes32String(values.date+values.time)
    var valuesBuffer = Buffer.from(JSON.stringify(values));

    web3.eth.defaultAccount = accounts[0]

    await ipfs.add(valuesBuffer,(error,result) => {
        if(error){
            console.error(error)
            return
        }

        console.log('usname:', usnameByte32)
        console.log('test:', testdateid)
        console.log('test IPFS hash:',result[0].hash)
        patientstorage.deployed().then(function(contractInstance){
            contractInstance.testCreate(usnameByte32, testdateid, Buffer.from(result[0].hash),{gas:3000000, from: ethereum.selectedAddress})
            .then(function(success){
                if(success){
                    console.log("created test on patient!");
                    
                    }else{
                      console.log("error creating test on ethereum!");
                }
            })
        })
    })
}

    return (
    <Card bg='dark'>
        <Card.Body>
        <p>检查</p>
        <Form onSubmit={handleSubmit} noValidate >
        <Form.Group controlId="Test.dateTimeForm">
            <InputGroup className="mb-3">
                <InputGroup.Prepend>
                    <InputGroup.Text>日期 | 时间</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl name="date" type="date" defaultValue={values.date} placeholder="日期" onChange={handleChange} />
                <FormControl name="time" type="time" defaultValue={values.time} autoComplete="on" placeholder="时间" onChange={handleChange}/>
            </InputGroup>
        </Form.Group>
        <Form.Group controlId="Test.doctorname">
            <Form.Label>医生</Form.Label>
            <Form.Control name="doctorName" type="text"  placeholder="医生名字" defaultValue={values.doctorName} onChange={handleChange}/>
        </Form.Group>
        <Form.Group controlId="Test.Name">
            <Form.Label>检查名</Form.Label>
            <Form.Control as="textarea" rows="2" name="testname" defaultValue={values.testName} placeholder="检查名" onChange={handleChange}/>
        </Form.Group>
        <Form.Group controlId="Test.type">
            <Form.Label>检查类型</Form.Label>
            <Form.Control as="textarea" rows="2" name="testtype" defaultValue={values.type} placeholder="检查类型" onChange={handleChange}/>
        </Form.Group>
        <Form.Group controlId="Test.address">
            <Form.Label>检查地址</Form.Label>
            <Form.Control as="textarea" rows="2" name="address" defaultValue={values.addr} placeholder="检查地址" onChange={handleChange}/>
        </Form.Group>
        <Form.Group controlId="Test.result">
            <Form.Label>检查结果</Form.Label>
            <Form.Control as="textarea" rows="2" name="result" defaultValue={values.result} placeholder="检查结果" onChange={handleChange}/>
        </Form.Group>
            <Button variant="primary" type="submit">
                确认
            </Button>
        </Form>
        </Card.Body>
    </Card>
        
    );
}
export default TestInfo;