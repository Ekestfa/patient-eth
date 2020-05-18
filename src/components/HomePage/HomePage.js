import React from 'react';
import {Nav, Button, Navbar, Container, Row, Col} from 'react-bootstrap';
import auth from '../../helpers/auth'
import HomeDynamicComponent from "./DynamicHome";

class HomePage extends React.Component {
  constructor(props){
    super(props)
    this.state={
      comp:'blank',
      renderChild:false,
    }
    this.logout = this.logout.bind(this)
    this.clicked = this.clicked.bind(this);
  }

clicked(path){
  const { comp, renderChild } = this.state;
    if(comp != path){
      this.setState({renderChild:true})
      this.setState({comp:path})
    }else{
    this.setState({comp:path})
    this.setState({renderChild:!renderChild})
  }
}

logout(){
  auth.logout(()=>{
    this.props.history.push('/');
  });
  localStorage.removeItem('p');
}

render(){
  console.log(this.state.renderChild)
  console.log(this.state.comp)
return(
<Container>
  <Row>
    <Col>
    <Navbar className="navbar navbar-default mb-10" bg="dark" variant="dark" fixed="top" style={{
  height: '50px'
}}>
    <Navbar.Brand href={'home#'} onClick={()=> this.setState({comp:'blank'})}>主页</Navbar.Brand>
            <Nav className="mr-auto" >
                <Nav.Link href="#consultations" onClick={()=> this.clicked('consultation')}
                  name={this.props.name}>诊断书</Nav.Link>
                <Nav.Link href="#tests" onClick={()=> this.clicked('testpage')}
                  name={this.props.name}>检查</Nav.Link>
            </Nav>
            <Navbar.Brand className="mr-10">{localStorage.getItem("p")}</Navbar.Brand>
            <Button variant="outline-info" onClick={this.logout}>退出</Button>
        </Navbar>
    </Col>
  </Row>
  <Row>
    <Col sm={12}>
      {  this.state.renderChild 
        ? <HomeDynamicComponent position="static" comp={this.state.comp}/>
        : <HomeDynamicComponent position="static" comp={'blank'}/>
      }
    </Col>
  </Row>
</Container>
    )}
}

export default HomePage;