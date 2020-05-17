import React from "react";
import Consultation from '../Consultation/Consultation';
import Blank from './Blank'
import TestPage from '../TestPage/TestPage'

const components = {
  consultation: Consultation,//...
  blank: Blank,
  testpage:TestPage,
};

function HomeDynamicComponent(props) {
  const Component = components[props.comp];  return <Component/>;
}

export default HomeDynamicComponent;