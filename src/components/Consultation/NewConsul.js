import React from 'react';
import {Form, Card, InputGroup, FormControl, Button} from 'react-bootstrap';
import useForm from './useForm';
import {default as Web3} from 'web3';
import contract from 'truffle-contract';
import {ethers} from 'ethers';
import PatientStorage from "../../abi/PatientStorage.json"
import ipfs from '../../ipfs';
import {consultationCreate} from '../../helpers/contract'
import auth from '../../helpers/auth';

const web3 = new Web3(Web3.givenProvider || "http://localhost:7545" );
const ethereum = window.ethereum;

const patientstorage = contract(PatientStorage);
patientstorage.setProvider(web3.currentProvider);

const NewConsul = (props) => {
const consultationInfo = {
    dateID:"",
    date:'',
    time:'',
    doctorName:'',
    addr:'',
    disease:'',
    medicine:''
    // medicine:[{
    //     medicineName:'',
    //     medicineUsageTimes:'',
    //     medicineUsageInfo:'',
    //     medicineFinishTime:''
    // }]
}
const {handleSubmit, handleChange, values} = useForm(submit,consultationInfo);

async function submit() {
    var patientname;
    if(!auth.isAuthenticated){
        patientname = props.name
    }else patientname = localStorage.getItem('p');
    console.log(values)
    var usnameByte32 = ethers.utils.formatBytes32String(patientname);
    var consuldateid = ethers.utils.formatBytes32String(values.doctorName)//values.date+values.time)
    var valuesBuffer = Buffer.from(JSON.stringify(values));

    await ipfs.add(valuesBuffer,(error,result) => {
        if(error){
            console.error(error)
            return
        }

        console.log('usname:', usnameByte32)
        console.log('consuldate:', consuldateid)
        console.log('consultation IPFS hash:',result[0].hash)
        consultationCreate(usnameByte32, ethereum.selectedAddress, consuldateid, Buffer.from(result[0].hash))
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
                <Form.Control as="textarea" rows="3" name="addr" defaultValue={values.addr} placeholder="看病地址" onChange={handleChange}/>
            </Form.Group>
            <Form.Group controlId="Consul.diseaseForm">
                <Form.Label>疾病信息</Form.Label>
                <Form.Control as="textarea" rows="4" name="disease" defaultValue={values.disease} placeholder="疾病情况" onChange={handleChange}/>
            </Form.Group>
            <Form.Group controlId="Consul.medicineForm">
                <Form.Label>药信息</Form.Label>
                <Form.Control as="textarea" rows="5" name="medicine" defaultValue={values.medicine} placeholder="药信息" onChange={handleChange}/>
            </Form.Group>
                <Button variant="primary" type="submit">
                    确认
                </Button>
            </Form>
        </Card.Body>
    </Card>
 )
}
export default NewConsul;