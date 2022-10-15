/// <reference types="cypress" />

context('main navbar', () => {
  before(() => {
    cy.visit('http://localhost:8080/');
    cy.get('input').first().type('test');
    cy.get('input').last().type('testtest');
    cy.get('button').contains('Login').click();
  });
  specify('should have main navbar', () => {
    cy.get('button#home-link').should('exist').and('have.text', 'Home');
    cy.get('button#profile-link').should('exist').and('have.text', 'Profile');
    cy.get('button#settings-link').should('exist').and('have.text', 'Settings');
    cy.get('button#logout-link').should('exist').and('have.text', 'Logout');
  });

  specify('home button should take you to the homepage', () => {
    cy.get('button#profile-link').click();
    cy.get('button#home-link').click();
    cy.location('pathname').should('eq', '/main/home');
  });
  specify.only('profile button should take you to the profile page', () => {
    cy.get('button#profile-link').click();
    cy.location('pathname').should('eq', '/main/profile');

    cy.get('h1').should('have.text', 'test-user');
    cy.get('p.profile-field').should('have.text', '@test');

    cy.get('button#saved-rooms-tab').should('have.text', 'Saved Rooms').click();
    cy.get


    cy.get('button#profile-tab').should('have.text', 'Room Manager');

  });
  specify('settings button should take you to the settings page', () => {
    cy.get('button#settings-link').click();
    cy.location('pathname').should('eq', '/main/settings');
  });
});
