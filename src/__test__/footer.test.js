import React from 'react';
import ReactDOM from 'react-dom';
import Footer from "../components/UI/footer";
import {render} from "@testing-library/react";

it("renders without crashing",()=>{
    const div=document.createElement("div");
    ReactDOM.render(<Footer></Footer>,div)
})
