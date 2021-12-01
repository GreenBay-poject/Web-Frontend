import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import ReactTestUtils, { act } from "react-dom/test-utils";
import pretty from "pretty";
import Reply from "../../components/UI/Questions/answer";

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});
afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

const reply = [
  {
    Answere: "Yes it is a legally authorized",
    DatePosted: "2021-09-29T10:26:35",
    AuthorsID: "ASHKAR MHM",
  },
];

describe("should render correctly", () => {
  it("renders correctly when reply properties has passed as props", () => {
    act(() => {
      render(<Reply details={reply} />, container);
    });
    expect(pretty(container.innerHTML)).toMatchInlineSnapshot(`
      "<div class=\\"MuiBox-root MuiBox-root-12\\">
        <div class=\\"MuiBox-root MuiBox-root-13\\">
          <div class=\\"MuiGrid-root makeStyles-paper-2 MuiGrid-container\\">
            <div class=\\"MuiBox-root MuiBox-root-14\\"><svg class=\\"MuiSvgIcon-root\\" focusable=\\"false\\" viewBox=\\"0 0 24 24\\" aria-hidden=\\"true\\">
                <path d=\\"M10 9V5l-7 7 7 7v-4.1c5 0 8.5 1.6 11 5.1-1-5-4-10-11-11z\\"></path>
              </svg></div>
            <div class=\\"MuiBox-root MuiBox-root-15\\"><img src=\\"/reply.png\\" width=\\"25px\\" alt=\\"user logo\\"></div>
            <div class=\\"MuiBox-root MuiBox-root-16\\" id=\\"Ansp\\">ASHKAR MHM</div>
            <div class=\\"MuiBox-root MuiBox-root-17 makeStyles-paper2-3\\" id=\\"Ansd\\">2021-09-29</div>
          </div>
          <div class=\\"MuiBox-root MuiBox-root-18 makeStyles-font4-7\\" id=\\"Ans\\"><text>Yes it is a legally authorized</text></div>
        </div>
      </div>"
    `);
  });
});

describe("should render the correct values which have been passed", () => {
  it("should have correct reply person name", () => {
    act(() => {
      render(<Reply details={reply} />, container);
    });
    expect(container.querySelector("#Ansp").textContent).toBe(
      `${reply[0].AuthorsID}`
    );
  });
  it("should have correct reply date", () => {
    act(() => {
      render(<Reply details={reply} />, container);
    });
    expect(container.querySelector("#Ansd").textContent).toBe(`2021-09-29`);
  });
  it("should have correct reply", () => {
    act(() => {
      render(<Reply details={reply} />, container);
    });
    expect(container.querySelector("#Ans").textContent).toBe(
      `${reply[0].Answere}` 
    );
  });
});
