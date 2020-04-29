import React from "react";
import BlankTest from "./BlankTest";
import NewTest from "./NewTest";
import TestList from "./TestList"


const components = {
//   CreateNewConsulComponent: NewConsul,
     blanktest:BlankTest,
     newtest:NewTest,
     testlist:TestList
};

function DynamicComponent(props) {
  const Component = components[props.comp];  return <Component />;
}

export default DynamicComponent;