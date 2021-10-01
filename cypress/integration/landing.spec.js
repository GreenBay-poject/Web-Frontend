const baseUrlMatcher = new RegExp("http://localhost:3000/");
const baseUrlMatcherReport = new RegExp("http://localhost:3000/landreport");
const baseUrlMatcherDReport = new RegExp("http://localhost:3000/deforestationreport");
const baseUrlMatcherFeed = new RegExp("http://localhost:3000/feedpage");
const baseUrlMatcherNotes = new RegExp("http://localhost:3000/notespage");
const baseUrlMatcherQuestions = new RegExp("http://localhost:3000/questions");
const baseUrlMatcherProfile = new RegExp("http://localhost:3000/userprofile");

describe('Landing page', function(){
    it('Landing Page - Explore Map button', function(){
        cy.visit('http://localhost:3000')
        cy.get('button[title="LandReport"]').should('be.visible').click()
        cy.url().should('match', baseUrlMatcherReport);
        cy.visit('http://localhost:3000')
        cy.get('button[title="DeforestationReport"]').should('be.visible').click()
        cy.url().should('match', baseUrlMatcherDReport);
        cy.contains('Select location', {timeout:5000}).should('be.visible')
    })

    it('Landing Page - Explore Notes button', function(){
        cy.visit('http://localhost:3000/')
        cy.get('button[title="Notes"]').should('be.visible').click()
        cy.url().should('match', baseUrlMatcherNotes);
    })

    it('Landing Page - Explore Q and A button', function(){
        cy.visit('http://localhost:3000/')
        cy.get('button[title="Q&A"]').should('be.visible').click()
        cy.url().should('match', baseUrlMatcherQuestions);
    })

    it('Landing Page - Feed button', function(){
        cy.visit('http://localhost:3000/')
        cy.get('button[title="Feed"]').should('be.visible').click()
        cy.url().should('match', baseUrlMatcherFeed);
    })

    it('Landing Page - signin button', function(){
        cy.visit('http://localhost:3000/')
        cy.get('button[title="profilebtn"]').should('be.visible').click()
        cy.url().should('match', baseUrlMatcher);
    })

    it('Landing Page - myprofile button', function(){
        cy.visit('http://localhost:3000/signin')
        cy.get('input[type="text"]').type('thilakarathnadilshan1024@gmail.com')
        cy.get('input[type="password"]').type('ABC123456')
        cy.get('.MuiButton-label').contains('Sign In').should('be.visible').click()
        cy.contains('GreenBay', {timeout:5000}).should('be.visible')
        cy.get('button[title="profilebtn"]').should('be.visible').click()
        cy.url().should('match', baseUrlMatcherProfile);
    })
})