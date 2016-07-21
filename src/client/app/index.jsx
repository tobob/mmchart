import React from 'react';
import { render } from "react-dom";
import { initialize } from "./app";


const reactRoot = window.document.getElementById("app");
initialize().then(({provider}) => {
  render(provider, reactRoot);
});