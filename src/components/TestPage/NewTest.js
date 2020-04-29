import React from 'react';
import {Form, Card, InputGroup, FormControl, Button} from 'react-bootstrap';
import useTestForm from './useForm';
import {default as Web3} from 'web3';
import contract from 'truffle-contract';
import {ethers} from 'ethers';
import PatientStorage from "../../abi/PatientStorage.json"
import ipfs from '../../ipfs';
import {testCreate} from '../../helpers/contract'


const web3 = new Web3(Web3.givenProvider || "http://localhost:7545" );
const ethereum = window.ethereum;

const patientstorage = contract(PatientStorage);
patientstorage.setProvider(web3.currentProvider);



const NewTest = (props) => {

const TestInfo = {
    dateID:"",
    date:'',
    time:'',
    doctorName:'',
    testname:'',
    testtype:'',
    address:'',
    result:''
}
const {handleSubmit, handleChange, values} = useTestForm(submit,TestInfo);

async function submit() {
    var patientname = localStorage.getItem('p');

    console.log('submitted')
    console.log(values)
    var usnameByte32 = ethers.utils.formatBytes32String(patientname);
    var testdateid = ethers.utils.formatBytes32String(values.date+values.time)
    var valuesBuffer = Buffer.from(JSON.stringify(values));

    await ipfs.add(valuesBuffer,(error,result) => {
        if(error){
            console.error(error)
            return
        }

        console.log('usname:', usnameByte32)
        console.log('test:', testdateid)
        console.log('test IPFS hash:',result[0].hash)
        testCreate(usnameByte32, ethereum.selectedAddress, testdateid, Buffer.from(result[0].hash))
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
            <Form.Control as="textarea" rows="2" name="testname" defaultValue={values.testname} placeholder="检查名" onChange={handleChange}/>
        </Form.Group>
        <Form.Group controlId="Test.type">
            <Form.Label>检查类型</Form.Label>
            <Form.Control as="textarea" rows="2" name="testtype" defaultValue={values.testtype} placeholder="检查类型" onChange={handleChange}/>
        </Form.Group>
        <Form.Group controlId="Test.address">
            <Form.Label>检查地址</Form.Label>
            <Form.Control as="textarea" rows="2" name="address" defaultValue={values.address} placeholder="检查地址" onChange={handleChange}/>
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
export default NewTest;