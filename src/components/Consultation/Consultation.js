import React from 'react';
import {Form, Card, InputGroup, FormControl, Button} from 'react-bootstrap';
import useForm from './useForm';
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

const Consultation = (props) => {

const consultationInfo = {
    dateID:"",
    date:'',
    time:'',
    doctorName:'',
    addr:'',
    disease:'',
    medicine:[{
        medicineName:'',
        medicineUsageTimes:'',
        medicineUsageInfo:'',
        medicineFinishTime:''
    }]
}
const {handleSubmit, handleChange, values} = useForm(submit,consultationInfo);

async function submit() {
    console.log(values)
    var usnameByte32 = ethers.utils.formatBytes32String(patientname);
    var consuldateid = ethers.utils.formatBytes32String(values.date+values.time)
    var valuesBuffer = Buffer.from(JSON.stringify(values));

    web3.eth.defaultAccount = accounts[0]

    await ipfs.add(valuesBuffer,(error,result) => {
        if(error){
            console.error(error)
            return
        }

        console.log('usname:', usnameByte32)
        console.log('consuldate:', consuldateid)
        console.log('consultation IPFS hash:',result[0].hash)
        patientstorage.deployed().then(function(contractInstance){
            contractInstance.consultationCreate(usnameByte32, consuldateid, Buffer.from(result[0].hash),{gas:3000000, from: ethereum.selectedAddress})
            .then(function(success){
                if(success){
                    console.log("created consultation on patient!");
                    
                    }else{
                      console.log("error creating consultation on ethereum!");
                }
            })
        })
    })
}

    return (
    <Card bg='dark'>
        <Card.Body>
        <p>诊断书</p>
        <Form onSubmit={handleSubmit} noValidate >
        <Form.Group controlId="Consul.dateTimeForm">
            <InputGroup className="mb-3">
                <InputGroup.Prepend>
                    <InputGroup.Text>日期 | 时间</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl name="date" type="date" defaultValue={values.date} placeholder="日期" onChange={handleChange} />
                <FormControl name="time" type="time" defaultValue={values.time} autoComplete="on" placeholder="时间" onChange={handleChange}/>
            </InputGroup>
        </Form.Group>
        <Form.Group controlId="Consul.doctorForm">
            <Form.Label>医生</Form.Label>
            <Form.Control name="doctorName" type="text"  placeholder="医生名字" defaultValue={values.doctorName} onChange={handleChange}/>
        </Form.Group>
        <Form.Group controlId="Consul.addressForm">
            <Form.Label>地址</Form.Label>
            <Form.Control as="textarea" rows="2" name="addr" defaultValue={values.addr} placeholder="看病地址" onChange={handleChange}/>
        </Form.Group>
        <Form.Group controlId="Consul.diseaseForm">
            <Form.Label>疾病信息</Form.Label>
            <Form.Control as="textarea" rows="2" name="disease" defaultValue={values.disease} placeholder="疾病情况" onChange={handleChange}/>
        </Form.Group>
        <Form.Group controlId="Consul.medicineForm">
            <Form.Label>药信息</Form.Label>
            <Form.Control as="textarea" rows="2" name="medicine" defaultValue={values.medicine} placeholder="药信息" onChange={handleChange}/>
        </Form.Group>
            <Button variant="primary" type="submit">
                确认
            </Button>
        </Form>
        </Card.Body>
    </Card>
        
    );
}
export default Consultation;