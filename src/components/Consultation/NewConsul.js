import React from 'react';
import {Form, Card, InputGroup, FormControl, Button} from 'react-bootstrap';
import {default as Web3} from 'web3';
import contract from 'truffle-contract';
import {ethers} from 'ethers';
import PatientStorage from "../../abi/PatientStorage.json"
import ipfs from '../../ipfs';
import {consultationCreate} from '../../helpers/contract'

const web3 = new Web3(Web3.givenProvider || "http://localhost:7545" );
const ethereum = window.ethereum;

const patientstorage = contract(PatientStorage);
patientstorage.setProvider(web3.currentProvider);

class NewConsul extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            consultationInfo:{
                dateID:"",
                date:'',
                time:'',
                doctorName:'',
                addr:'',
                disease:'',
                description:'',
                medicine:'',
                creator:''
        }
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.submit = this.submit.bind(this);
}

handleChange = (event) => {
    const { consultationInfo } = this.state;
    const {name, value} = event.target;
    this.setState({consultationInfo:{...consultationInfo,[name] : value}});
    // console.log(name+':'+value)
  }
  
  
handleSubmit = event => {
    event.preventDefault();
  };

submit() {
    const { consultationInfo } = this.state;
    var patientname = localStorage.getItem('p');
    this.setState({consultationInfo:{creator:patientname}})
    if(patientname===null){
        patientname = this.props.name
    }

    var usnameByte32 = ethers.utils.formatBytes32String(patientname);
    var consuldateid = ethers.utils.formatBytes32String(consultationInfo.doctorName)//values.date+values.time)
    var valuesBuffer = Buffer.from(JSON.stringify(consultationInfo));

    ipfs.add(valuesBuffer,(error,result) => {
        if(error){
            console.error(error)
            return
        }

        console.log('病人名:', usnameByte32)
        console.log('诊断书编号：', consuldateid)
        console.log('诊断书IPFS哈希地址',result[0].hash)
        console.log('创建者:', consultationInfo.creator)
        consultationCreate(usnameByte32, ethereum.selectedAddress, consuldateid, Buffer.from(result[0].hash))
    })
}

componentDidMount(){
    // const { consultationInfo } = this.state;
    var patientname = localStorage.getItem('p');
    this.setState({consultationInfo:{creator:patientname}})
    if(patientname===null){
        patientname = this.props.name
        this.setState({consultationInfo:{creator:this.props.creator}})
    }
}

render(){
    const { consultationInfo } = this.state;
return (
    <Card bg='dark' lg='true'>
        <Card.Body>
        <p>诊断书</p>
            <Form onSubmit={this.handleSubmit} noValidate >
            <Form.Group controlId="Consul.dateTimeForm">
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text>日期 | 时间</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl name="date" type="date" value={consultationInfo.date} placeholder="日期" onChange={this.handleChange} />
                    <FormControl name="time" type="time" defaultValue={consultationInfo.time} autoComplete="on" placeholder="时间" onChange={this.handleChange}/>
                </InputGroup>
            </Form.Group>
            <Form.Group controlId="Consul.doctorForm">
                <Form.Label>医生</Form.Label>
                <Form.Control name="doctorName" type="text"  placeholder="医生名字" defaultValue={consultationInfo.doctorName} onChange={this.handleChange}/>
            </Form.Group>
            <Form.Group controlId="Consul.addressForm">
                <Form.Label>地址</Form.Label>
                <Form.Control as="textarea" rows="3" name="addr" defaultValue={consultationInfo.addr} placeholder="看病地址" onChange={this.handleChange}/>
            </Form.Group>
            <Form.Group controlId="Consul.diseaseForm">
                <Form.Label>疾病信息</Form.Label>
                <Form.Control as="textarea" rows="1" name="disease" defaultValue={consultationInfo.disease} placeholder="疾病情况" onChange={this.handleChange}/>
            </Form.Group>
            <Form.Group controlId="Consul.descriptionForm">
                <Form.Label>疾病与病人情况描述</Form.Label>
                <Form.Control as="textarea" rows="3" name="description" defaultValue={consultationInfo.description} placeholder="疾病情况" onChange={this.handleChange}/>
            </Form.Group>
            <Form.Group controlId="Consul.medicineForm">
                <Form.Label>药信息</Form.Label>
                <Form.Control as="textarea" rows="5" name="medicine" defaultValue={consultationInfo.medicine} placeholder="药信息" onChange={this.handleChange}/>
            </Form.Group>
                <Button variant="primary" type="submit" onClick={this.submit}>
                    确认
                </Button>
            </Form>
        </Card.Body>
    </Card>
 )}
}
export default NewConsul;