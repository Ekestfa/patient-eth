import React from "react";
import Blank from './BlankDoc'
import PatientPage from './PatientPage'
import Consultation from '../Consultation/Consultation'
import TestPage from '../TestPage/TestPage'

const components = {
  blank: Blank,
  patientpage:PatientPage,
  consultation:Consultation,
  test:TestPage
};
function DynamicComponent(props) {
  const Component = components[props.comp]; return <Component name={props.name} creator={props.creator}/>; 
}

export default DynamicComponent;