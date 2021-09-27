describe('Login', function(){
    it('Sign in', function(){
        cy.visit('http://localhost:3000/signin')
        cy.get('input[type="text"]').type('mashkarharis3@gmail.com')
        cy.get('input[type="password"]').type('ABCD1234')
        cy.get('.MuiButton-label').contains('Sign In').should('be.visible').click()
        cy.contains('GreenBay', {timeout:5000}).should('be.visible')
    })

    it('Landing Page - Explore Map button', function(){
        // cy.visit('http://localhost:3000/')
        cy.get('.MuiButton-label').contains('Map').should('be.visible').click()
        cy.contains('Select location', {timeout:5000}).should('be.visible')
    })

    // it('Landing Page - Explore Notes button', function(){
    //     cy.visit('http://localhost:3000/')
    //     cy.get('.MuiButton-label').contains('NOTES').should('be.visible').click()
    //     cy.contains('ADD NOTE', {timeout:5000}).should('be.visible')
    // })

    // it('Landing Page - Explore Q and A button', function(){
    //     cy.visit('http://localhost:3000/')
    //     cy.get('.MuiButton-label').contains('EXPLORE Q&A').should('be.visible').click()
    //     cy.contains('Authorities', {timeout:5000}).should('be.visible')
    // })

    // it('Landing Page - Explore Feed button', function(){
    //     cy.visit('http://localhost:3000')
    //     cy.get('.MuiButton-label').contains('EXPLORE FEED').should('be.visible').click()
    //     cy.contains('Page', {timeout:5000}).should('be.visible')
    // })
})