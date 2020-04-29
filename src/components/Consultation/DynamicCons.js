import React from "react";
import NewConsul from "./NewConsul"
import BlankConsul from "./BlankConsul"
import ConsulList from "./ConsulList"

const components = {
  CreateNewConsulComponent: NewConsul,
  Blank: BlankConsul,
  ConsulList: ConsulList
};

function DynamicComponent(props) {
  const Component = components[props.comp];  return <Component />;
}

export default DynamicComponent;