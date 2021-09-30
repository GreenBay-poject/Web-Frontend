const baseUrlMatcher = new RegExp("http://localhost:3000/");
const baseUrlMatcherAuth = new RegExp("http://localhost:3000/signin");
const baseUrlMatcherReport = new RegExp("http://localhost:3000/landreport");
const baseUrlMatcherDReport = new RegExp("http://localhost:3000/deforestationreport");
const baseUrlMatcherFeed = new RegExp("http://localhost:3000/feedpage");
const baseUrlMatcherNotes = new RegExp("http://localhost:3000/notespage");
const baseUrlMatcherQuestions = new RegExp("http://localhost:3000/questions");
const baseUrlMatcherProfile = new RegExp("http://localhost:3000/userprofile");

describe('Access Control', function(){
    it('Landing Page - Explore Map button', function(){
        cy.visit('http://localhost:3000/notespage')
        cy.get('.textinput').should('be.visible').type('Save the forest')
        cy.get('.addnotebtn').should('be.visible').click()
        cy.url().should('match', baseUrlMatcherAuth);
        cy.get('input[type="text"]').type('thilakarathnadilshan1024@gmail.com')
        cy.get('input[type="password"]').type('ABC123456')
        cy.get('.MuiButton-label').contains('Sign In').should('be.visible').click()
    })

    it('Landing Page - Explore Notes button', function(){
        cy.get('button[title="Notes"]').should('be.visible').click()
        cy.get('.textinput').should('be.visible').type('Save the forest Testing111')
        cy.get('.addnotebtn').should('be.visible').click()
    })

    it('Check new Note', function(){
        cy.visit('http://localhost:3000/signin')
        cy.get('input[type="text"]').type('thilakarathnadilshan1024@gmail.com')
        cy.get('input[type="password"]').type('ABC123456')
        cy.get('.MuiButton-label').contains('Sign In').should('be.visible').click()
        cy.get('button[title="Notes"]').should('be.visible').click()
        cy.reload()
        cy.contains('Testing111', {timeout:5000}).should('be.visible')
    })

    it('DeletePrivateNote', function(){
        cy.get('.dltbtn').should('be.visible').click()
        cy.get('.noteyesbtn').should('be.visible').click()
        cy.contains('Testing111', {timeout:5000}).should('be.visible')
        cy.get('.dltbtn', {timeout:5000}).should('be.visible').click()
        cy.get('.notenobtn').should('be.visible').click()
        cy.contains('Testing111', {timeout:5000}).should('not.be.disabled')
    })
})