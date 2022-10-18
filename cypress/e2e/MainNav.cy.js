/// <reference types="cypress" />

describe('Main/Top Navigation Bar', () => {
  
  beforeEach(() => {
    cy.visit('http://localhost:8080/')
    cy.get("[id=':r0:']").type('test')
    cy.get("[id=':r1:']").type('testtest')
    cy.contains('button','Login').click()
  })

  it('Should return the home page', () => {
    cy.get("[id='home-link']").click()
    cy.get("[id='main-container']").get("[id='no-subject']").should("be.visible")
  })

})