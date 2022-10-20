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

  it('Should return the profile page', () => {
    cy.intercept("GET", "http://localhost:8080/api/users", {
      fixture: "testUserInfo.json"
    })
    cy.get("[class='main-nav']").get("[id='profile-link']").click()
    cy.get("[id='profile-tab']").should("be.visible")
    cy.get("[id='saved-rooms-tab']").should("be.visible")
    cy.get("[class='profile-room-container']").contains("Hosted Rooms:").should("be.visible")

    cy.get("[id='saved-rooms-tab']").click()
    cy.get("[class='profile-room-container']").contains("Saved Rooms:").should("be.visible")

  })

  it('Should return the Settings page', () => {
    cy.get("[class='main-nav']").get("[id='settings-link']").click()
    cy.get("[id='settings-container']").contains("Login Details").should("be.visible")
    cy.contains('button','Submit').should("be.visible")
  })
})