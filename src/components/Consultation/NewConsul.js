import React from 'react';
import {Form, Card, InputGroup, FormControl, Button} from 'react-bootstrap';
import {default as Web3} from 'web3';
import contract from 'truffle-contract';
import {ethers} from 'ethers';
import PatientStorage from "../../abi/PatientStorage.json"
import ipfs from '../../ipfs';
import {consultationCreate} from '../../helpers/contract'
import validateConsul from './validateConsul'


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
                creator:'',
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
    this.checkCreator = this.checkCreator.bind(this);
}

handleChange = (event) => {
    const { consultationInfo } = this.state;
    const {name, value} = event.target;
    this.setState({consultationInfo:{...consultationInfo,[name] : value}});
    this.handleValidate()
  }
  
  
handleSubmit = event => {
    const { consultationInfo, canSubmit, errors } = this.state;
    event.preventDefault();
    this.handleValidate()
    if(Object.keys(errors).length === 0 && canSubmit){
        this.submit()
    }
  };

handleValidate = () => {
    const { errors, consultationInfo } = this.state;
    this.setState({errors:validateConsul(consultationInfo)})
    if(Object.keys(errors).length === 0){
        this.setState({canSubmit:true})
    }
    else {
        this.setState({canSubmit:false})
    }
}

checkCreator = () => {
    const { consultationInfo } = this.state;
    var patientname = localStorage.getItem('p');
    this.setState({consultationInfo:{...consultationInfo,creator:patientname}})
    if(patientname===null){
        patientname = this.props.name
        this.setState({consultationInfo:{...consultationInfo,creator:this.props.creator}})
    }
    return patientname
}


submit() {
    const { consultationInfo, submitted, canSubmit } = this.state;
    var patientname = this.checkCreator()
    this.setState({submitted: true})

    var usnameByte32 = ethers.utils.formatBytes32String(patientname);
    var consuldateid = ethers.utils.formatBytes32String(consultationInfo.date+consultationInfo.time)//values.date+values.time)
    var consBuffer = Buffer.from(JSON.stringify(consultationInfo));
    ipfs.add(consBuffer,(error,result) => {
        if(error){
            console.error(error)
            this.setState({submitted: false})
            return
        }

        console.log('病人名:', usnameByte32)
        console.log('诊断书编号：', consuldateid)
        console.log('诊断书IPFS哈希地址',result[0].hash)
        console.log('创建者:', consultationInfo.creator)
        consultationCreate(usnameByte32, ethereum.selectedAddress, consuldateid, Buffer.from(result[0].hash), this.submitControl)
    })
}

submitControl(){
    this.setState({submitted: false})
    this.clear()
}

clear(){
    const { consultationInfo } = this.state 
    this.setState({ consultationInfo:{...consultationInfo,
        dateID:"",
        date:'',
        time:'',
        doctorName:'',
        addr:'',
        disease:'',
        description:'',
        medicine:'',
    }})
    this.handleValidate()
}

componentDidMount(){
    this.checkCreator()
    this.handleValidate()
}

render(){
    const { consultationInfo, submitted, errors } = this.state;
return (
    <div   aria-live="polite"
    aria-atomic="true"
    style={{
      position: 'relative',
      minHeight: '100px',
    }}>
    <Card bg='light' variant='light' className="mt-lg-5 .d-xl-0" style={{ margin: '50px 0 50px 0'}}>
        <Card.Body bg='light' variant='light'>
        <p>诊断书</p>
            <Form  variant='light' onSubmit={this.handleSubmit} noValidate >

            <Form.Group controlId="Consul.dateTimeForm">
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text>日期 | 时间</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl name="date" type="date" value={consultationInfo.date} placeholder="日期" onChange={this.handleChange} 
                    style={{
                        borderBottomColor: errors.date ? 'red' : 'green',   borderBottomWidth: 1
                    }}/>
                    <FormControl name="time" type="time" value={consultationInfo.time} autoComplete="on" placeholder="时间" onChange={this.handleChange}
                      style={{
                        borderBottomColor: errors.time ? 'red' : 'green',   borderBottomWidth: 1
                    }} />
                </InputGroup>
            </Form.Group>
            {/* {errors.doctorName && <p>{errors.doctorName}</p>} */}
            <Form.Group controlId="Consul.doctorForm">
                <Form.Label>医生</Form.Label>
                {
                    this.props.creator 
                    ? <Form.Control name="doctorName" type="text"  placeholder="医生名字" value={consultationInfo.doctorName = this.props.creator} disabled onChange={this.handleChange} style={{borderBottomColor: errors.doctorName ? 'red' : 'green',   borderBottomWidth: 1}}/>
                    : <Form.Control name="doctorName" type="text"  placeholder="医生名字" value={consultationInfo.doctorName} onChange={this.handleChange} style={{borderBottomColor: errors.doctorName ? 'red' : 'green',   borderBottomWidth: 1}}/>
                }
            </Form.Group>
            {/* {errors.addr && <p>{errors.addr}</p>} */}
            <Form.Group controlId="Consul.addressForm">
                <Form.Label>地址</Form.Label>
                <Form.Control as="textarea" rows="3" name="addr" value={consultationInfo.addr} placeholder="看病地址" onChange={this.handleChange}
                style={{
                    borderBottomColor: errors.addr ? 'red' : 'green',   borderBottomWidth: 1
                }}/>
            </Form.Group>
            {/* {errors.disease && <p>{errors.disease}</p>} */}
            <Form.Group controlId="Consul.diseaseForm">
                <Form.Label>疾病信息</Form.Label>
                <Form.Control as="textarea" rows="1" name="disease" value={consultationInfo.disease} placeholder="疾病情况" onChange={this.handleChange}
                style={{
                    borderBottomColor: errors.disease ? 'red' : 'green',   borderBottomWidth: 1
                }}/>
            </Form.Group>
            {/* {errors.description && <p>{errors.description}</p>} */}
            <Form.Group controlId="Consul.descriptionForm">
                <Form.Label>疾病与病人情况描述</Form.Label>
                <Form.Control as="textarea" rows="3" name="description" value={consultationInfo.description} placeholder="疾病情况" onChange={this.handleChange}
                style={{
                    borderBottomColor: errors.description ? 'red' : 'green',   borderBottomWidth: 1
                }}/>
            </Form.Group>
            {/* {errors.medicine && <p>{errors.medicine}</p>} */}
            <Form.Group controlId="Consul.medicineForm">
                <Form.Label>药信息</Form.Label>
                <Form.Control as="textarea" rows="5" name="medicine" value={consultationInfo.medicine} placeholder="药信息" onChange={this.handleChange}
                style={{
                    borderBottomColor: errors.medicine ? 'red' : 'green',   borderBottomWidth: 1
                }}/>
            </Form.Group>
            {
                submitted
                ? <Button className="mr-3" variant="primary" type="submit" disabled >确认</Button>
                : <Button className="mr-3" variant="primary" type="submit" >确认</Button> //style={{marginRight:'5px'}}
            }
            <Button variant="danger" type="submit" onClick={this.clear} >清除</Button>
            {
            submitted
            ? <h3>正在上传，请稍候！</h3>
            : <></>
            }
            </Form>
        </Card.Body>
    </Card>
    </div>
 )}
}
export default NewConsul;