const registerUrlMatcher = new RegExp("http://localhost:3000/signup");
const loginUrlMatcher = new RegExp("http://localhost:3000/signin");
const basicUrlMatcher = new RegExp("http://localhost:3000/");
const baseUrlMatcherDReport = new RegExp("http://localhost:3000/deforestationreport");
const baseUrlMatcherProfile = new RegExp("http://localhost:3000/userprofile");

describe('Login', function(){
    it('Deforestation Report Page', function(){
        cy.visit('http://localhost:3000')
        cy.get('button[title="DeforestationReport"]').should('be.visible').click()
        cy.url().should('match', baseUrlMatcherDReport);
        cy.contains('Select location', {timeout:5000}).should('be.visible')
    })

    it('Select A location', function(){
        cy.get('.Mui-disabled').should('be.disabled')
        cy.get('#addlocationbtn', {timeout:5000}).should('be.visible').click()
        cy.wait(10000)
        cy.get('.MuiButton-contained').contains('Next').should('be.visible').click()
        cy.contains('Select Date', {timeout:5000}).should('be.visible')
    })

    it('Select two dates', function(){
        cy.get('#demo-controlled-open-select').click()
        cy.contains('2018-12-19', {timeout:5000}).should('be.visible').click()
        cy.get('.selectenddate').click()
        cy.contains('2019-01-08', {timeout:5000}).should('be.visible').click()
        cy.get('.MuiButton-contained').contains('Next').should('be.visible').click()
    })

    it('Images tab', function(){
        cy.contains('Get the report', {timeout:5000}).should('be.visible')
        cy.get('#getthereportbtn').should('be.visible').click()
        cy.contains('Deforestation Report', {timeout:5000}).should('be.visible')
    })

})