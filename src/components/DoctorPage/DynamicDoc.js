import React from "react";
import Blank from './BlankDoc'
import PatientPage from './PatientPage'
import x from './x'

const components = {
  blank: Blank,
  patientpage:PatientPage,
  x:x
};

function DynamicComponent(props) {
  const Component = components[props.comp]; return <Component name={props.name}/>; 
}

export default DynamicComponent;