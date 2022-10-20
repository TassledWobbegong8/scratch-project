/// <reference types="cypress" />

describe('Subject Navigation Bar', () => {
  
  beforeEach(() => {
    cy.visit('http://localhost:8080/')
    cy.get("[id=':r0:']").type('test')
    cy.get("[id=':r1:']").type('testtest')
    cy.contains('button','Login').click()
  })

  it('Should return the Miscellaneous rooms', () => {
    cy.intercept("GET", "http://localhost:8080/api/rooms/miscellaneous", {
      fixture: "testRooms.json"
    })
    cy.get("[id='subject-links-container']").contains('miscellaneous').click()
    cy.get("[id='room-container']").contains('miscellaneous').should("be.visible")
    cy.get("[id='room-container']").contains('test Room').click()
    cy.get("[id='main-button']").contains('button','Join Room').click()
    cy.contains('Blackboard').click()
    cy.get("[id='revealColorSelect']").click()
    cy.get("[id='addNewColor']").click()
    cy.get("[style='background-color: rgb(0, 0, 0);']").should("be.visible")
  })
  


})