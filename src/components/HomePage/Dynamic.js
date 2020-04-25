import React from "react";
import Consultation from '../Consultation/Consultation';
import Blank from './Blank'

const components = {
  consultation: Consultation,//...
  blank: Blank
};

function DynamicComponent(props) {
  const Component = components[props.comp];  return <Component />;
}

export default DynamicComponent;