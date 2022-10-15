/// <reference types="cypress" />

describe('test', () => { 
  beforeEach(() => {
    cy.visit('http://localhost:8080/')
  })

  context('login for existing user', () => { 
    it('displays 2 input field and a login button', () => {
      cy.get('input').should('have.length', 2)
      cy.get('input').first().parent().should('have.text', 'Username')
      cy.get('input').last().parent().should('have.text', 'Password')
      cy.get('button').should('have.length', 1)
      cy.get('button').should('have.text', 'Login')
    })
  
    it('login and logout by the test user', () => {
      cy.intercept('POST', '/api/auth/login').as('login')
      cy.intercept('/api/auth/logout').as('logout')

      cy.get('input').first().type('test')
      cy.get('input').last().type('testtest')
      cy.get('button').contains('Login').click()
      cy.wait('@login').then(({response}) => {
        expect(response.statusCode).to.eq(200)
      })
      cy.get('h2').contains('Subjects')
      cy.get('button').contains('Logout').click()
      cy.wait('@logout').then(({response}) => {
        expect(response.statusCode).to.eq(304)
      })
    })
  })

  context('check incorrect username or password', () => {
    it('user with incorrect password', () => {
      cy.intercept('POST', '/api/auth/login').as('login')

      cy.get('input').first().type('test')
      cy.get('input').last().type('testtest1')
      cy.get('button').contains('Login').click()
      cy.wait('@login').then(({response}) => {
        expect(response.statusCode).to.not.eq(200)
      })
      cy.get('.warning').contains('Your Login Information is Incorrect')
    })

    it('user with incorrect username / user not yet signup', () => {
      cy.intercept('POST', '/api/auth/login').as('login')

      cy.get('input').first().type('tset')
      cy.get('input').last().type('testtest1')
      cy.get('button').contains('Login').click()
      cy.wait('@login').then(({response}) => {
        expect(response.statusCode).to.not.eq(200)
      })
      cy.get('.warning').contains('Your Login Information is Incorrect')
    })

  })

  context('signup new user', () => {
    beforeEach(() => {
      cy.get('span').contains('Click here!').click().then(() => {
        fetch('/api/users/test', {method: 'DELETE'})
      })
    })

    it('route to signup page', () => {
      cy.get('h2').contains('Signup Details')
    })

    it('displays 3 input field and a signup button', () => {
      cy.get('input').should('have.length', 3)
      cy.get('input').parent().contains('Username')
      cy.get('input').parent().contains('Nickname')
      cy.get('input').parent().contains('Password')
      cy.get('button').should('have.length', 1)
      cy.get('button').should('have.text', 'Signup')
    })

    it('signup new user as -> cypress ', () => { 
      cy.intercept('POST', '/api/users').as('signup')

      cy.get('input').eq(0).type('cypress')
      cy.get('input').eq(1).type('cypress')
      cy.get('input').eq(2).type('cypress1')
      cy.get('button').contains('Signup').click()
      cy.wait('@signup').then(({response}) => {
        expect(response.statusCode).to.eq(200)
      })
      cy.get('h2').contains('Subjects')
    })

  })

  context.only('avoid signup with an existing username', () => {
    beforeEach(() => {
      cy.get('span').contains('Click here!').click()
    })
    it('route to signup page', () => {
      cy.get('h2').contains('Signup Details')
    })

    it('try signup with an existing username', () => {
      cy.get('input').eq(0).type('test')
      cy.get('input').eq(1).type('test')
      cy.get('input').eq(2).type('cypress1')
      // should not able to move forward. but still passing.
    })
  })


})