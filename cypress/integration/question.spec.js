const baseUrlMatcher = new RegExp("http://localhost:3000/");
const baseUrlMatcherReport = new RegExp("http://localhost:3000/landreport");
const baseUrlMatcherDReport = new RegExp(
  "http://localhost:3000/deforestationreport"
);
const baseUrlMatcherFeed = new RegExp("http://localhost:3000/feedpage");
const baseUrlMatcherNotes = new RegExp("http://localhost:3000/notespage");
const baseUrlMatcherQuestions = new RegExp("http://localhost:3000/questions");
const baseUrlMatcherProfile = new RegExp("http://localhost:3000/userprofile");

describe("Landing page", function () {
  it("Landing Page - myprofile button", function () {
    cy.visit("http://localhost:3000/signin");
    cy.get('input[type="text"]').type("rahalathukorala@gmail.com");
    cy.get('input[type="password"]').type("ABC123456");
    cy.get(".MuiButton-label").contains("Sign In").should("be.visible").click();
    cy.contains("GreenBay", { timeout: 5000 }).should("be.visible");
    cy.get('button[title="Q&A"]', { timeout: 100000 })
      .should("be.visible")
      .click();
    cy.url().should("match", baseUrlMatcherQuestions);
  });

  it("Check Add Question", function () {
    cy.wait(1000);
    cy.get(".MuiButton-label")
      .contains("Ask Question")
      .should("be.visible")
      .click();
    cy.get("#outlined-title").type("Testing Question");
    cy.get("#outlined-description").type(
      "this should be added to database after submitting by a normal user.not a athority member"
    );
    cy.get(".MuiButton-label").contains("Submit").should("be.visible").click();
    cy.wait(5000);
  });

  it("Add reply", function () {
    cy.visit("http://localhost:3000/signin");
    cy.wait(100);
    cy.get('input[type="text"]').type("thilakarathnadilshan1024@gmail.com");
    cy.get('input[type="password"]').type("ABC123456");
    cy.get(".MuiButton-label").contains("Sign In").should("be.visible").click();
    cy.contains("GreenBay", { timeout: 5000 }).should("be.visible");
    cy.get('button[title="Q&A"]', { timeout: 10000 })
      .should("be.visible")
      .click();
    cy.url().should("match", baseUrlMatcherQuestions);
    cy.get("#new", { timeout: 5000 }).should("be.visible").click();
    cy.get("#outlined-textarea").type("Testing reply is typing automatically");
    cy.get(".MuiButton-label").contains("Submit").should("be.visible").click();
    cy.wait(5000);
  });

  it("Delete Question", function () {
    cy.get("#deletebutton").should("be.visible").click();
    cy.get(".MuiButton-label").contains("Yes").should("be.visible").click();

  });

  it("Changing Authority", function () {
    cy.contains("Pollute Managing Unit").should("be.visible").click();
    cy.wait(1000);
    cy.contains("Endemic Tree Unit").should("be.visible").click();
    cy.wait(1000);
    cy.contains("Emergency Wildfire Unit").should("be.visible").click();
    cy.wait(1000);
    cy.contains("Land & Soil Ministry").should("be.visible").click();
    cy.wait(1000);
    cy.contains("Geographical Unit").should("be.visible").click();
    cy.wait(1000);
    cy.contains("Other Units").should("be.visible").click();
    cy.wait(1000);
    cy.contains("Wild Care Ministry").should("be.visible").click();

  });
});
