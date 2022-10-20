/// <reference types="cypress" />

describe('Front page', () => {

  beforeEach(() => {
    cy.visit('http://localhost:8080/')
  })

  it('should display login page', () => {
    cy.contains('#main-logo', 'studify').should('be.visible')
    cy.contains('Login Details').should('be.visible')
    cy.contains('button', 'Login').should('be.visible')
  })

  it('should display signup page', () => {
    cy.contains("span", "Click here!").click()
    cy.contains("Signup Details").should("be.visible")
  })

  it('should log in', () => {
    cy.get("[id=':r0:']").type("test")
    cy.get("[id=':r1:']").type("testtest")
    cy.contains('button','Login').click()
    cy.get("[id='logout-link']").should('be.visible')
  })

  it('should log out', () => {
    cy.get("[id=':r0:']").type("test")
    cy.get("[id=':r1:']").type("testtest")
    cy.contains('button','Login').click()
    cy.get("[id='logout-link']").contains("Logout").click()
    cy.contains('#main-logo', 'studify').should('be.visible')
    cy.contains('Login Details').should('be.visible')
  })
})