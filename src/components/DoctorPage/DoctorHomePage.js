import React from 'react';
import {Nav, Form, FormControl, Button, Navbar, Container, Row, Col} from 'react-bootstrap';
import auth from '../../helpers/auth'
import {default as Web3} from 'web3';
import contract from 'truffle-contract';
import {ethers} from 'ethers';
import PatientStorage from "../../abi/PatientStorage.json"
import DynamicComponent from "./DynamicDoc"
import {Card} from 'react-bootstrap'
import ipfs from '../../ipfs';
const Patient = require('../../abi/Patient.json');


const web3 = new Web3(Web3.givenProvider || "http://localhost:7545" );
const ethereum = window.ethereum;

const patientstorage = contract(PatientStorage);
patientstorage.setProvider(web3.currentProvider);

class DoctorHomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchedPatient:[{}],
      submitted:false,
      found:false,
      searchtext:'',
      array:[],
      parsed:[{}],
      comp:'blank'
    }
    // const [searchedPatient, setSearchedpatient] = useState([{}]);
    // const [submitted, setSubmitted] = useState(false)
    // 
    // const [comp, changeComp] = useState('blank');

  this.handleChange = this.handleChange.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
  this.submit = this.submit.bind(this);
  this.logout = this.logout.bind(this);
  this.getContracts = this.getContracts.bind(this);
  this.IPFSREADER = this.IPFSREADER.bind(this);
  this.toPageBlanker = this.toPageBlanker.bind(this);
  }
  

 submit(){
   const {searchtext} = this.state;
    var usnameByte32 = ethers.utils.formatBytes32String(searchtext);
    
    patientstorage.deployed().then(contractInstance => {
        contractInstance.patientNameTaken(usnameByte32,{from:ethereum.selectedAddress})
        .then(result => {
          if(result){
            contractInstance.getPatientByPatientName(usnameByte32).then(result2 => {
              // console.log(result2)
              this.setState({searchedPatient : searchtext});
              this.setState({submitted : true})
              this.setState({found:true})
              this.getContracts(usnameByte32)
              this.setState({comp:'patientpage'})
            })
          }else{
            console.log('病人不存在')
            this.setState({searchedPatient : ''});
            this.setState({submitted : true})
          }
      })
    })
}

getContracts(usnameByte32){
  patientstorage.deployed().then(contractInstance => {
    contractInstance.getPatientContractAddressByPatientName(usnameByte32).then(result => {
        const PatientContract = new web3.eth.Contract(Patient.abi,result)
        PatientContract.methods.getConsultationsIpfsList().call({from: ethereum.selectedAddress}).then(result => {
              this.setState({array:result})
              for(var i=0; i<result.length; i++){
                // console.log("ethersUtil:",ethers.utils.toUtf8String(result[i]))
                this.IPFSREADER(result[i]);
                // console.log("reading:",result[i])
            }
          })
        })
      })
}

 IPFSREADER = element => {
  const {parsed} = this.state
  let convertedIPFSaddress = ethers.utils.toUtf8String(element)
  ipfs.cat(convertedIPFSaddress).then(result => {
      let cons = result.toString('utf8')
      const consdata = JSON.parse(cons);
      // console.log("cons:",parsed)
      // this.setState({...[parsed],parsed:[consdata]}) // pushing object into array, and after will be recreated
      // this.setState({parsed:consdata}) //pushing object
      // this.setState(parsed => [...data, parsed]);
      this.setState({parsed: [...this.state.parsed, consdata]})
  })
}

toPageBlanker(){
  this.setState({found:false})
  this.setState({comp:'blank'})
}

logout(){
  auth.logout(()=>{
    this.props.history.push('/');
  });
  localStorage.removeItem('d');
}

handleChange = event => {
  const {name, value} = event.target;
  this.setState({[name] : value});
  // console.log(name+':'+value)
}

handleSubmit = event => {
  event.preventDefault();
  // //handling errors
  // setErrors(validate(searchvalue))
  // setIsSubmitting(true)
    this.submit()
};

render(){
  const {searchedPatient,searchtext, submitted,found,array,parsed} = this.state;
  console.log("render parsed:",parsed)
  // const rendata = 
  // Object.keys(this.state.searchedPatient).map(function(object, i){
  //   return <div className={"row"} key={i}> 
  //              {[ object ,
  //                 // remove the key
  //                 <b className="fosfo" key={i}> {object} </b> , 
  //                 object
  //              ]}
  //          </div>; 
  // })
    const rendata =  Object.values(array).map(function(key) {
    return <option value={key} className = 'asd'>{key}</option>
  });
  
return(
<Container>
  <Row>
    <Col>
    <Navbar className="navbar navbar-default" bg="dark" variant="dark" fixed="top">
    <Navbar.Brand href="#" onClick={this.toPageBlanker} >Home</Navbar.Brand>
            <Nav className="mr-auto">
            <Form inline fixed="right" onSubmit={this.handleSubmit} noValidate fixed="center">
                <FormControl type="text" onChange={this.handleChange} name="searchtext" value={this.state.searchtext}
                    placeholder="Search" 
                    className="mr-sm-2" 
                    fixed="center" />
                <Button onClick={this.submit} variant="outline-info">Search</Button>
            </Form>
            <label>{localStorage.getItem("d")}</label>
            <Button variant="outline-info" onClick={this.logout}>退出</Button>
            </Nav>
        </Navbar>
    </Col>
    </Row>

    <Row>
    {/* <Col sm={2}>sm=2</Col> */}
    <Col lg={12}>
      <DynamicComponent comp={this.state.comp} name={searchedPatient}/>
      {/* {
            found===true &&
            // console.log(searchedPatient, submitted)
            Object.keys(this.state.searchedPatient).map((keyName,i)=>(
              <h1>{i}:{this.state.searchedPatient[keyName]}</h1>
            ))
      } */}
         {/* {rendata} */}

    </Col>
  </Row>
</Container>
    )
  }
}


export default DoctorHomePage;