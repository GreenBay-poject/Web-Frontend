import React from 'react';
import ReactDOM from 'react-dom';
import Mapexplore from "../../components/UI/LandingPage/mapexplore";
import {render} from "@testing-library/react";

it("renders without crashing",()=>{
    const div=document.createElement("div");
    ReactDOM.render(<Mapexplore></Mapexplore>,div)
})