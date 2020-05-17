import React from 'react';
import {Nav,Container, Row, Navbar} from 'react-bootstrap';
import DynamicComponent from './DynamicTest'


class TestPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            comp:'blanktest',
            isClose:true,
            patientname:''
        }
    }

    componentDidMount(){
        const {name} = this.props;
        var pname = localStorage.getItem('p');
        if(pname===null){
            pname = name
        }
        this.setState({patientname:pname})
    }

render(){
    const {comp, isClose, patientname} = this.state;
    const { creator } = this.props;
    return (
        <Container>
            { isClose &&
            <Row>
            <Navbar className="navbar" bg="dark" variant="dark" fixed="top">
                <Nav  className="justify-content-center mr-auto" fixed="top" bg="dark" variant="dark" >
                    <Nav.Item>
                        <Nav.Link onClick={()=> this.setState({isClose:false})}  href="#"
                        >返回</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link onClick={()=> this.setState({comp:'newtest'})} href="#tests#new">新建</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link onClick={()=> this.setState({comp:'testlist'})} href="#tests#list">列出历史</Nav.Link>
                    </Nav.Item>
                </Nav>
                    <Navbar.Brand> {patientname}的检查{this.props.creator!=null && <>{ ' < ' + creator}</>} </Navbar.Brand>
            </Navbar>
            </Row>
            }
            { isClose 
                ?<DynamicComponent comp={comp} name={this.props.name} creator={this.props.creator}/>
                :<DynamicComponent comp='blanktest' name={this.props.name} creator={this.props.creator}/>
            }
        </Container>
        );
    }
}
export default TestPage;