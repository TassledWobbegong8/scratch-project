/// <reference types="cypress" />

context('main navbar', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/');
    cy.get('input').first().type('test');
    cy.get('input').last().type('testtest');
    cy.get('button').contains('Login').click();
  });
  specify('should have main navbar and each button should take you to the proper page', () => {
    cy.get('button#home-link').should('exist').and('have.text', 'Home');
    cy.get('button#logout-link').should('exist').and('have.text', 'Logout');

    cy.get('button#profile-link').should('exist').and('have.text', 'Profile').click();
    cy.location('pathname').should('eq', '/main/profile');
    cy.get('button#home-link').should('exist').and('have.text', 'Home').click();
    cy.location('pathname').should('eq', '/main/home');

    cy.get('button#settings-link').should('exist').and('have.text', 'Settings').click();
    cy.location('pathname').should('eq', '/main/settings');
    cy.get('button#home-link').should('exist').and('have.text', 'Home').click();
    cy.location('pathname').should('eq', '/main/home');
  });

  specify('profile should have your name and username rendered based on your login', () => {
    cy.get('button#profile-link').click();
    cy.location('pathname').should('eq', '/main/profile');

    cy.get('h1').should('have.text', 'test-user');
    cy.get('p.profile-field').should('have.text', '@test');
  });

  // specify.only('button in profile/room manager tab should create a new room', () => {
  //   cy.get('button#profile-link').click();
  //   cy.location('pathname').should('eq', '/main/profile');

  //   cy.get('button#open-add-room').click();
    
  // });

  // cy.get('button#profile-tab').should('have.text', 'Room Manager').click();

  // cy.get('button#saved-rooms-tab').should('have.text', 'Saved Rooms').click();

  specify('settings button should take you to the settings page', () => {
    cy.get('button#settings-link').click();
    cy.location('pathname').should('eq', '/main/settings');
  });
});
