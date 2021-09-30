const baseUrlMatcher = new RegExp("http://localhost:3000/");
const baseUrlMatcherReport = new RegExp("http://localhost:3000/landreport");
const baseUrlMatcherDReport = new RegExp("http://localhost:3000/deforestationreport");
const baseUrlMatcherFeed = new RegExp("http://localhost:3000/feedpage");
const baseUrlMatcherNotes = new RegExp("http://localhost:3000/notespage");
const baseUrlMatcherQuestions = new RegExp("http://localhost:3000/questions");
const baseUrlMatcherProfile = new RegExp("http://localhost:3000/userprofile");

describe('Landing page', function(){
    it('Landing Page - myprofile button', function(){
        cy.visit('http://localhost:3000/signin')
        cy.get('input[type="text"]').type('thilakarathnadilshan1024@gmail.com')
        cy.get('input[type="password"]').type('ABC123456')
        cy.get('.MuiButton-label').contains('Sign In').should('be.visible').click()
        cy.contains('GreenBay', {timeout:5000}).should('be.visible')
        cy.get('button[title="Feed"]', {timeout:100000}).should('be.visible').click()
        cy.url().should('match', baseUrlMatcherFeed);
    })

    it('Check the api request', function(){
        let res
        cy.request({
            url: 'https://greenbayrestapi.herokuapp.com/feed/view_posts', method: 'GET'
            }, {timeout:5000})
          .then(resp => {
            expect(resp.status).to.eq(200)})
    })

    it('Check Add Post', function(){
        cy.wait(1000)
        cy.get('.MuiButton-label').contains('Upload New Post').should('be.visible').click()
        cy.get('.addtitleinput').type('Testing Email')
        cy.get('.ql-editor').type('Testing description')
        cy.get('.postaddingbtn').contains('Post').should('be.visible').click()
        cy.visit('http://localhost:3000/signin')
        cy.get('input[type="text"]').type('thilakarathnadilshan1024@gmail.com')
        cy.get('input[type="password"]').type('ABC123456')
        cy.get('.MuiButton-label').contains('Sign In').should('be.visible').click()
        cy.contains('GreenBay', {timeout:5000}).should('be.visible')
        cy.get('button[title="Feed"]', {timeout:100000}).should('be.visible').click()
        cy.url().should('match', baseUrlMatcherFeed);
    })

    it('Check New Post', function(){
        cy.contains('Testing Email', {timeout:5000}).should('be.visible')
        cy.contains('Testing description', {timeout:5000}).should('be.visible')
    })

    it('Delete New Post', function(){
        cy.get('.TestingEmail').should('be.visible').click()
        cy.get('.postyesbtn').should('be.visible').click()
        cy.contains('Testing Email', {timeout:5000}).should('be.visible')
        cy.contains('Testing description', {timeout:5000}).should('be.visible')
        cy.get('.TestingEmail', {timeout:5000}).should('be.visible').click()
        cy.get('.postnobtn').should('be.visible').click()
        cy.contains('Testing Email', {timeout:5000}).should('not.be.disabled')
        cy.contains('Testing description', {timeout:5000}).should('not.be.disabled')
    })

    it('Check for normal user', function(){
        cy.visit('http://localhost:3000/signin')
        cy.get('input[type="text"]').type('rahalathukorala@gmail.com')
        cy.get('input[type="password"]').type('ABC123456')
        cy.get('.MuiButton-label').contains('Sign In').should('be.visible').click()
        cy.contains('GreenBay', {timeout:5000}).should('be.visible')
        cy.get('button[title="Feed"]', {timeout:100000}).should('be.visible').click()
        cy.url().should('match', baseUrlMatcherFeed);
        cy.get('.MuiButton-label').contains('Upload New Post').should('not.be.disabled')
    })    
})