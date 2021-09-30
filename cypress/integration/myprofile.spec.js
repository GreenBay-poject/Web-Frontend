const registerUrlMatcher = new RegExp("http://localhost:3000/signup");
const baseUrlMatcherProfile = new RegExp("http://localhost:3000/userprofile");
const registerUrlMatcherChangepswd = new RegExp("http://localhost:3000/changepassword");

describe('Login', function(){
    it('Sign in', function(){
        cy.visit('http://localhost:3000/signin')
        cy.get('input[type="text"]').type('mashkarharis3@gmail.com')
        cy.get('input[type="password"]').type('ABCD1234')
        cy.get('.MuiButton-label').contains('Sign In').should('be.visible').click()
        cy.contains('GreenBay', {timeout:5000}).should('be.visible')
        cy.get('button[title="profilebtn"]').should('be.visible').click()
        cy.url().should('match', baseUrlMatcherProfile);
    })

    it('Myprofile page', function(){
        cy.contains('mashkarharis3@gmail.com', {timeout:10000});
        cy.contains('ASHKAR', {timeout:5000}).should('be.visible');
        cy.get('.MuiTypography-root').contains("Change Passowrd").should('be.visible').click()
        cy.url().should('match', registerUrlMatcherChangepswd);
    })
    
    it('Change Password', function(){
        cy.get('input[type="newpassword"]').type('ABC12345')
        cy.get('input[type="confirmpassword"]').type('ABC12345')
        cy.get('.MuiButton-label',  {timeout:10000}).contains('Change Password').should('be.visible').click()
    })
})