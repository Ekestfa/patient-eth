import React from 'react';
import {Nav, Form, FormControl, Button, Navbar, Container, Row, Col} from 'react-bootstrap';
import auth from '../../helpers/auth'
import {default as Web3} from 'web3';
import contract from 'truffle-contract';
import {ethers} from 'ethers';
import PatientStorage from "../../abi/PatientStorage.json"
import DynamicComponent from "./DynamicDoc"


const web3 = new Web3(Web3.givenProvider || "http://localhost:7545" );
const ethereum = window.ethereum;

const patientstorage = contract(PatientStorage);
patientstorage.setProvider(web3.currentProvider);

class DoctorHomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchedPatient:[{}],
      creator:'',
      submitted:false,
      found:false,
      searchtext:'',
      array:[],
      parsed:[{}],
      comp:'blank'
    }

  this.handleChange = this.handleChange.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
  this.submit = this.submit.bind(this);
  this.logout = this.logout.bind(this);
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
              this.setState({comp:'patientpage'})
            })
          }else{
            console.error('病人不存在')
            this.setState({searchedPatient : ''});
            this.setState({submitted : true})
            this.setState({found:false})
          }
      })
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
}

handleSubmit = event => {
  event.preventDefault();
    this.submit()
};

componentDidMount(){
  // const { creator } = this.state;
  this.setState({creator:localStorage.getItem('d')})
}

componentDidUpdate(){
  console.log(this.props.location.hash)
}

render(){
  const {searchedPatient, creator, found } = this.state;
return(
<Container>
  <Row>
    <Col>
    <Navbar className="navbar navbar-default" bg="dark" variant="dark" fixed="top" >
    <Navbar.Brand href="#" onClick={this.toPageBlanker} >主页</Navbar.Brand>
            <Nav className="mr-auto">
            <Form inline="trye" fixed="right" onSubmit={this.handleSubmit} noValidate >
                <FormControl type="text" onChange={this.handleChange} name="searchtext" value={this.state.searchtext}
                    placeholder="Search" 
                    className="mr-sm-2" 
                    fixed="center" />
                <Button onClick={this.submit} variant="outline-info">查询病人</Button>
            </Form>
            </Nav>
            <Navbar.Brand variant="outline-info" >{localStorage.getItem("d")}</Navbar.Brand>
            <Button  variant="outline-info" onClick={this.logout}>退出</Button>
        </Navbar>
    </Col>
    </Row>
    <Row>
    {/* <Col sm={2}>sm=2</Col> */}
    <Col lg={12}>
        <DynamicComponent comp={this.state.comp} name={searchedPatient} creator={creator} fixed="bottom"/>
    </Col>
  </Row>
</Container>
    )
  }
}


export default DoctorHomePage;