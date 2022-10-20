/// <reference types="cypress" />

describe('Subject Navigation Bar', () => {
  
  beforeEach(() => {
    cy.visit('http://localhost:8080/')
    cy.get("[id=':r0:']").type('test')
    cy.get("[id=':r1:']").type('testtest')
    cy.contains('button','Login').click()
  })

  it('Should return the No Subject page', () => {
    cy.get("[id='main-container']").get("[id='no-subject']").should("be.visible")
  })

  it('Should return the Math rooms', () => {
    cy.intercept("GET", "http://localhost:8080/api/rooms/math", {
      fixture: "testRooms.json"
    })
    cy.get("[id='subject-links-container']").contains("math").click()
    cy.get("[id='room-container']").contains('math').should("be.visible")
    cy.get("[id='room-container']").contains('test Room').click()
    cy.get("[id='main-button']").contains('button','Back').click()
  })

  it('Should return the English rooms', () => {
    cy.intercept("GET", "http://localhost:8080/api/rooms/english", {
      fixture: "testRooms.json"
    })
    cy.get("[id='subject-links-container']").contains("english").click()
    cy.get("[id='room-container']").contains('english').should("be.visible")
    cy.get("[id='room-container']").contains('test Room').click()
    cy.get("[id='main-button']").contains('button','Back').click()
  })

  it('Should return the History rooms', () => {
        cy.intercept("GET", "http://localhost:8080/api/rooms/history", {
      fixture: "testRooms.json"
    })
    cy.get("[id='subject-links-container']").contains("history").click()
    cy.get("[id='room-container']").contains('history').should("be.visible")
    cy.get("[id='room-container']").contains('test Room').click()
    cy.get("[id='main-button']").contains('button','Back').click()
  })

  it('Should return the Science rooms', () => {
    cy.intercept("GET", "http://localhost:8080/api/rooms/science", {
      fixture: "testRooms.json"
    })
    cy.get("[id='subject-links-container']").contains("science").click()
    cy.get("[id='room-container']").contains('science').should("be.visible")
    cy.get("[id='room-container']").contains('test Room').click()
    cy.get("[id='main-button']").contains('button','Back').click()
  })

  it('Should return the Language rooms', () => {
    cy.intercept("GET", "http://localhost:8080/api/rooms/languages", {
      fixture: "testRooms.json"
    })
    cy.get("[id='subject-links-container']").contains("languages").click()
    cy.get("[id='room-container']").contains('languages').should("be.visible")
    cy.get("[id='room-container']").contains('test Room').click()
    cy.get("[id='main-button']").contains('button','Back').click()
  })

  it('Should return the Miscellaneous rooms', () => {
    cy.intercept("GET", "http://localhost:8080/api/rooms/miscellaneous", {
      fixture: "testRooms.json"
    })
    cy.get("[id='subject-links-container']").contains('miscellaneous').click()
    cy.get("[id='room-container']").contains('miscellaneous').should("be.visible")
    cy.get("[id='room-container']").contains('test Room').click()
    cy.get("[id='main-button']").contains('button','Back').click()
  })
  


})