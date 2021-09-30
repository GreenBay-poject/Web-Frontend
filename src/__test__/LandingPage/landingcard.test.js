import React from 'react';
import ReactDOM from 'react-dom';
import Landingcard from "../../components/UI/LandingPage/landingcard";
import {render} from "@testing-library/react";

it("renders without crashing",()=>{
    const div=document.createElement("div");
    ReactDOM.render(<Landingcard></Landingcard>,div)
}) 