const registerUrlMatcher = new RegExp("http://localhost:3000/signup");
const baseUrlMatcherProfile = new RegExp("http://localhost:3000/userprofile");
const registerUrlMatcherChangepswd = new RegExp("http://localhost:3000/changepassword");

describe('Login', function(){
    it('Sign in', function(){
        cy.visit('http://localhost:3000/signin')
        cy.get('input[type="text"]').type('thilakarathnadilshan1024@gmail.com')
        cy.get('input[type="password"]').type('ABC123456')
        cy.get('.MuiButton-label').contains('Sign In').should('be.visible').click()
        cy.contains('GreenBay', {timeout:10000000000}).should('be.visible')
        cy.get('button[title="profilebtn"]').should('be.visible').click()
        cy.url().should('match', baseUrlMatcherProfile);
    })

    it('Myprofile page', function(){
        cy.contains('thilakarathnadilshan1024@gmail.com', {timeout:10000});
        cy.contains('Thilakarathna', {timeout:100000}).should('be.visible');
        cy.get('#changepaswdbtn').should('be.visible').click()
        cy.url().should('match', registerUrlMatcherChangepswd);
    })
    
    it('Change Password', function(){
        cy.get('input[type="newpassword"]').type('ABC123456')
        cy.get('input[type="confirmpassword"]').type('ABC123456')
        cy.get('.MuiButton-label',  {timeout:10000}).contains('Change Password').should('be.visible').click()
        cy.wait(5000)
        // cy.contains('Passwords Changed', {timeout:100000}).should('be.visible');
    })

    it('Invalid Change Password', function(){
        cy.get('input[type="newpassword"]').type('ABC1234')
        cy.get('input[type="confirmpassword"]').type('ABC12345')
        cy.get('.MuiButton-label',  {timeout:10000}).contains('Change Password').should('be.visible').click()
        // cy.contains('Error Occured!', {timeout:100000}).should('be.visible');
    })
})