import React from "react";
import Consultation from '../Consultation/Consultation';
import Blank from './Blank'
import TestPage from '../TestPage/TestPage'
import Medicine from '../Medicine/Medicine'

const components = {
  consultation: Consultation,//...
  blank: Blank,
  testpage:TestPage,
  medicine:Medicine
};

function DynamicComponent(props) {
  const Component = components[props.comp];  return <Component />;
}

export default DynamicComponent;