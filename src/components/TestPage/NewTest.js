import React from 'react';
import {Form, Card, InputGroup, FormControl, Button} from 'react-bootstrap';
import {default as Web3} from 'web3';
import contract from 'truffle-contract';
import {ethers} from 'ethers';
import PatientStorage from "../../abi/PatientStorage.json"
import ipfs from '../../ipfs';
import {testCreate} from '../../helpers/contract'
import validateTest from './validateTest'

const web3 = new Web3(Web3.givenProvider || "http://localhost:7545" );
const ethereum = window.ethereum;

const patientstorage = contract(PatientStorage);
patientstorage.setProvider(web3.currentProvider);

class NewTest extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            testInfo:{
                dateID:"",
                date:'',
                time:'',
                doctorName:'',
                testname:'',
                testtype:'',
                address:'',
                result:'',
                creator:''
        },
        submitted: false,
        canSubmit: false,
        errors:{}
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.submit = this.submit.bind(this);
    this.submitControl = this.submitControl.bind(this);
    this.clear = this.clear.bind(this);
    this.handleValidate = this.handleValidate.bind(this);
}

handleChange = (event) => {
    const { testInfo } = this.state;
    const {name, value} = event.target;
    this.setState({testInfo:{...testInfo,[name] : value}});
    this.handleValidate()
    console.log(testInfo)
  }
  
  
handleSubmit = event => {
    const { canSubmit, errors } = this.state;
    event.preventDefault();
    this.handleValidate()
    if(Object.keys(errors).length === 0 && canSubmit){
        this.submit()
    }
  };

handleValidate = () => {
    const { errors, testInfo } = this.state;
    this.setState({errors:validateTest(testInfo)})
    if(Object.keys(errors).length === 0){
        this.setState({canSubmit:true})
    }
    else {
        this.setState({canSubmit:false})
    }
}

submit() {
    const { testInfo} = this.state;
    var patientname = localStorage.getItem('p');
    console.log('patientnamebylogin:',patientname)
    this.setState({testInfo:{creator:patientname}})
    console.log('patientnamebysearch:',patientname)
    if(patientname===null){
        patientname = this.props.name
        console.log('patientnamebydoctor:',patientname)
    }
    this.setState({submitted: true})

    var usnameByte32 = ethers.utils.formatBytes32String(patientname);
    var testdateid = ethers.utils.formatBytes32String(testInfo.doctorName)//values.date+values.time)
    var valuesBuffer = Buffer.from(JSON.stringify(testInfo));

    ipfs.add(valuesBuffer,(error,result) => {
        if(error){
            console.error(error)
            return
        }

        console.log('病人名:', usnameByte32)
        console.log('检查编号：', testdateid)
        console.log('检查IPFS哈希地址',result[0].hash)
        console.log('创建者:', testInfo.creator)
        testCreate(usnameByte32, ethereum.selectedAddress, testdateid, Buffer.from(result[0].hash), this.submitControl)
    })
}

submitControl(){
    this.setState({submitted: false})
    this.clear()
}

clear(){
    const { testInfo } = this.state 
    this.setState({ testInfo:{...testInfo,
        dateID:"",
        date:'',
        time:'',
        doctorName:'',
        testname:'',
        testtype:'',
        address:'',
        result:'',
    }})
    this.handleValidate()
}

componentDidMount(){
    const { testInfo } = this.state;
    const { creator } = this.props;
    var patientname = localStorage.getItem('p');
    this.setState({testInfo:{...testInfo,creator:patientname}})
    console.log(patientname)
    if(patientname===null){
        patientname = this.props.name
        this.setState({testInfo:{...testInfo,creator:this.props.creator}})
    }
    console.log('查找的医生：',this.props.creator)
    console.log('创建者：', testInfo.creator)
    this.handleValidate()
}

render(){
    const { testInfo, errors, submitted } = this.state;
    console.log(errors)
    return (
        <Card bg='light' variant='light' className="mt-lg-5 .d-xl-0"  style={{ margin: '50px 0 50px 0'}}>
            <Card.Body>
            <p>检查</p>
            <Form onSubmit={this.handleSubmit} noValidate >
            <Form.Group controlId="Test.dateTimeForm">
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text>日期 | 时间</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl name="date" type="date" value={testInfo.date} placeholder="日期" onChange={this.handleChange} 
                    style={{
                        borderBottomColor: errors.date ? 'red' : 'green',   borderBottomWidth: 1
                    }}/>
                    <FormControl name="time" type="time" value={testInfo.time} autoComplete="on" placeholder="时间" onChange={this.handleChange}
                    style={{
                        borderBottomColor: errors.time ? 'red' : 'green',   borderBottomWidth: 1
                    }}/>
                </InputGroup>
            </Form.Group>
            <Form.Group controlId="Test.doctorname">
                <Form.Label>医生</Form.Label>
                <Form.Control name="doctorName" type="text"  placeholder="医生名字" value={testInfo.doctorName} onChange={this.handleChange}
                style={{
                    borderBottomColor: errors.doctorName ? 'red' : 'green',   borderBottomWidth: 1
                }}/>
            </Form.Group>
            <Form.Group controlId="Test.Name">
                <Form.Label>检查名</Form.Label>
                <Form.Control as="textarea" rows="2" name="testname" value={testInfo.testname} placeholder="检查名" onChange={this.handleChange}
                style={{
                    borderBottomColor: errors.testname ? 'red' : 'green',   borderBottomWidth: 1
                }}/>
            </Form.Group>
            <Form.Group controlId="Test.type">
                <Form.Label>检查类型</Form.Label>
                <Form.Control as="textarea" rows="2" name="testtype" value={testInfo.testtype} placeholder="检查类型" onChange={this.handleChange}
                style={{
                    borderBottomColor: errors.testtype ? 'red' : 'green',   borderBottomWidth: 1
                }}/>
            </Form.Group>
            <Form.Group controlId="Test.address">
                <Form.Label>检查地址</Form.Label>
                <Form.Control as="textarea" rows="2" name="address" value={testInfo.address} placeholder="检查地址" onChange={this.handleChange}
                style={{
                    borderBottomColor: errors.address ? 'red' : 'green',   borderBottomWidth: 1
                }}/>
            </Form.Group>
            <Form.Group controlId="Test.result">
                <Form.Label>检查结果</Form.Label>
                <Form.Control as="textarea" rows="2" name="result" value={testInfo.result} placeholder="检查结果" onChange={this.handleChange}
                style={{
                    borderBottomColor: errors.result ? 'red' : 'green',   borderBottomWidth: 1
                }}/>
            </Form.Group>
                {
                    submitted
                    ? <Button className="mr-3" variant="primary" type="submit" disabled >确认</Button>
                    : <Button className="mr-3" variant="primary" type="submit" >确认</Button> 
                }
                <Button variant="danger" type="submit" onClick={this.clear} >清除</Button>
            </Form>
                {
                    submitted
                    ? <h3>正在上传，请稍候！</h3>
                    : <></>
                }
            </Card.Body>
        </Card>
        );
    }
}
export default NewTest;