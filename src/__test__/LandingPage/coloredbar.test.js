import React from 'react';
import ReactDOM from 'react-dom';
import Coloredbar from "../../components/UI/LandingPage/coloredbar";
import {render} from "@testing-library/react";

it("renders without crashing",()=>{
    const div=document.createElement("div");
    ReactDOM.render(<Coloredbar></Coloredbar>,div)
}) 