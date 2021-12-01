import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import ReactTestUtils, { act } from "react-dom/test-utils";
import pretty from "pretty";
import Question from "../../components/UI/Questions/question";

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

const question = {
  q_id: "12",
  questionPerson: "Rahal Athukorala",
  questionTitle: "Emergency_Wildfire_Unit@Deforestation in sinharaja",
  questionDescription:
    "There is a new road throgh the shell of sinharaja, Authorities know about this?",
  questionDate: "2021-09-27T17:43:49.889Z",
};

describe("should render correctly", () => {
  it("renders correctly when question properties has passed as props", () => {
    act(() => {
      render(
        <Question
          q_id={question.q_id}
          questionPerson={question.questionPerson}
          questionTitle={question.questionTitle}
          questionDate={question.questionDate}
          questionDescription={question.questionDescription}
        />,
        container
      );
    });
    expect(pretty(container.innerHTML)).toMatchInlineSnapshot(`
      "<div class=\\"MuiBox-root MuiBox-root-13\\">
        <div class=\\"MuiBox-root MuiBox-root-14\\">
          <div class=\\"MuiGrid-root MuiGrid-container\\">
            <div class=\\"MuiGrid-root makeStyles-paper-2 MuiGrid-item MuiGrid-grid-xs-9 MuiGrid-grid-sm-11\\">
              <div class=\\"MuiGrid-root makeStyles-paper-2 MuiGrid-container\\">
                <div class=\\"MuiBox-root MuiBox-root-15\\"> <img src=\\"/question.png\\" width=\\"30px\\" alt=\\"userlogo\\"></div>
                <div class=\\"MuiBox-root MuiBox-root-16\\" id=\\"Qp\\"> Rahal Athukorala</div>
                <div class=\\"MuiBox-root MuiBox-root-17 makeStyles-paper2-3\\" id=\\"Qdate\\"> 2021-09-27</div>
              </div>
            </div>
            <div class=\\"MuiGrid-root makeStyles-paper-2 MuiGrid-item MuiGrid-grid-xs-3 MuiGrid-grid-sm-1\\"></div>
          </div>
        </div><text class=\\"makeStyles-font2-5\\" id=\\"Qt\\"><u>Deforestation in sinharaja</u></text><br>
        <div class=\\"MuiBox-root MuiBox-root-18 makeStyles-font3-6\\" id=\\"Qd\\"><text>There is a new road throgh the shell of sinharaja, Authorities know about this?</text></div>
      </div>"
    `);
  });
});

describe("should render the correct values which have been passed", () => {
  it("should have correct question person name", () => {
    act(() => {
      render(
        <Question
          questionPerson={question.questionPerson}
          questionTitle={question.questionTitle}
          questionDate={question.questionDate}
        />,
        container
      );
    });
    expect(container.querySelector("#Qp").textContent).toBe(
      ` ${question.questionPerson}` 
    ); 
  });
  it("should have correct question title", () => {
    act(() => {
      render(
        <Question
          questionTitle={question.questionTitle}
          questionDate={question.questionDate}
        />,
        container
      );
    });
    expect(container.querySelector("#Qt").textContent).toBe(
      `Deforestation in sinharaja`
    );
  });
  it("should have correct question date", () => {
    act(() => {
      render(
        <Question
          questionDate={question.questionDate}
          questionTitle={question.questionTitle}
        />,
        container
      );
    });
    expect(container.querySelector("#Qdate").textContent).toBe(` 2021-09-27`);
  });
  it("should have correct question description", () => {
    act(() => {
      render(
        <Question
          questionDescription={question.questionDescription}
          questionTitle={question.questionTitle}
          questionDate={question.questionDate}
        />,
        container
      );
    });
    expect(container.querySelector("#Qd").textContent).toBe(
      `${question.questionDescription}`
    );
  });
});
