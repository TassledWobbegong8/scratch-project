/// <reference types="cypress" />

context('main navbar', () => {
  const ssid =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzQ3NjRkNjkwNmFjZTc3NGMxYjMwOTYiLCJ1c2VybmFtZSI6InRlc3QiLCJpYXQiOjE2NjYwNTMxODd9.2pKte4GVBtYhhEcaxI2CBKYMr3pNqFj3ATWKyxoksUI';

  beforeEach(() => {
    cy.setCookie('ssid', ssid);
    cy.visit('http://localhost:8080/main/home');
  });

  // beforeEach(() => {
  //   cy.visit('http://localhost:8080/');
  //   cy.get('input').first().type('test');
  //   cy.get('input').last().type('testtest');
  //   cy.get('button').contains('Login').click();
  // });

  specify('should have main navbar and each button should take you to the proper page', () => {
    cy.get('#home-link').should('exist').and('have.text', 'Home');
    cy.get('#logout-link').should('exist').and('have.text', 'Logout');

    cy.get('#profile-link').should('exist').and('have.text', 'Profile').click();
    cy.location('pathname').should('eq', '/main/profile');
    cy.get('#home-link').should('exist').and('have.text', 'Home').click();
    cy.location('pathname').should('eq', '/main/home');

    // cy.get('#settings-link').should('exist').and('have.text', 'Settings').click();
    // cy.location('pathname').should('eq', '/main/settings');
    // cy.get('#home-link').should('exist').and('have.text', 'Home').click();
    // cy.location('pathname').should('eq', '/main/home');
  });

  specify('profile should have your name and username rendered based on your login', () => {
    cy.get('#profile-link').click();
    cy.location('pathname').should('eq', '/main/profile');

    cy.get('h1').should('have.text', 'test-user');
    cy.get('.profile-field').should('have.text', '@test');
  });

  specify('button in profile/room manager tab should create/update/delete a room', () => {
    cy.get('#profile-link').click();
    cy.get('#profile-tab').click();
    cy.get('#open-add-room').click();
    cy.get('#subject-select').type('Science{enter}');
    cy.get('#room-editor-modal-btns > button').contains('Add new room').click();
    cy.get('#room-editor-modal-btns > button').contains('Cancel').click();
    cy.get('.profile-room > p').contains('science').should('be.visible');

    cy.get('#open-room-btn').click();
    cy.location('pathname').should('eq', '/main/room');
    cy.get('#profile-link').click();
    cy.location('pathname').should('eq', '/main/profile');

    cy.get('#edit-room-btn').click();
    cy.get('#subject-select').type('Math{enter}');
    cy.get('#room-editor-modal-btns > button').contains('Update room').click();
    cy.get('.profile-room > p').contains('math').should('be.visible');

    // after deletion, the delete button should not exist/render, therefore the div is gone too
    cy.get('#delete-room-btn').click();
    cy.get('#delete-room-btn').should('not.exist');
  });

  specify('button in profile/saved rooms tab should show saved rooms and allow to join or remove', () => {
    // create new room first to save that later
    cy.get('#profile-link').click();
    cy.get('#profile-tab').click();
    cy.get('#open-add-room').click();
    cy.get('#subject-select').type('Miscellaneous{enter}');
    cy.get('#room-editor-modal-btns > button').contains('Add new room').click();
    cy.get('#room-editor-modal-btns > button').contains('Cancel').click();

    // join room
    cy.get('#home-link').click();
    cy.location('pathname').should('eq', '/main/home');
    cy.get('button').contains('miscellaneous').click();
    cy.contains('test-user Room').click();
    cy.get('button').contains('Join Room').click();
    cy.location('pathname').should('eq', '/main/room');
    cy.get('.room-page').should('be.visible');
    cy.get('#exit-room-btn').click();
    cy.location('pathname').should('eq', '/main/home');

    // save room
    cy.get('button').contains('miscellaneous').click();
    cy.contains('test-user Room').click();
    cy.get('#saveMyRoom').click();
    cy.get('#profile-link').click();
    cy.location('pathname').should('eq', '/main/profile');
    cy.get('#saved-rooms-tab').click();
    cy.get('.saved-room').should('be.visible');
    cy.get('#joinRoom').click();
    cy.location('pathname').should('eq', '/main/room');
    cy.get('.room-page').should('be.visible');
    cy.get('#profile-link').click();
    cy.location('pathname').should('eq', '/main/profile');
    cy.get('#saved-rooms-tab').click();
    cy.get('#removeMyRoom').click();
    cy.get('#removeMyRoom').should('not.exist');
    cy.get('#profile-tab').click();
    cy.get('#delete-room-btn').click();
    cy.get('#delete-room-btn').should('not.exist');
  });
});
