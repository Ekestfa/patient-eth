import React from "react";
import Consultation from '../Consultation/Consultation';
import Blank from './Blank'
import TestInfo from '../TestInfo/TestInfo'
import Medicine from '../Medicine/Medicine'

const components = {
  consultation: Consultation,//...
  blank: Blank,
  testinfo:TestInfo,
  medicine:Medicine
};

function DynamicComponent(props) {
  const Component = components[props.comp];  return <Component />;
}

export default DynamicComponent;