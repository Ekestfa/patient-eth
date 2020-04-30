import React from "react";
import Blank from './BlankDoc'
import PatientPage from './PatientPage'

const components = {
  blank: Blank,
  patientpage:PatientPage,
};

function DynamicComponent(props) {
  const Component = components[props.comp]; return <Component name={props.name}/>; 
}

export default DynamicComponent;