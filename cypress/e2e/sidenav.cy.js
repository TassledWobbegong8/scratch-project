/// <reference types="cypress" />


context('Testing for subjects navigation', () => {
  const ssid = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzQ3NjRkNjkwNmFjZTc3NGMxYjMwOTYiLCJ1c2VybmFtZSI6InRlc3QiLCJpYXQiOjE2NjYwNTMxODd9.2pKte4GVBtYhhEcaxI2CBKYMr3pNqFj3ATWKyxoksUI'

  beforeEach(() => {
    cy.setCookie('ssid', ssid)
    cy.visit('http://localhost:8080/main/home')
    cy.intercept('/api/rooms/allRooms').as('allRoom')
    cy.intercept('/api/auth/verify').as('validateUser')
    cy.intercept('/api/rooms/*').as('getCurrentRoom')
  })

  context('Subjects navigations are showing correctly', () => {
    afterEach(() => {
      cy.wait(200)
      cy.get('#room-container').then((rc) => {
        if (rc.find('.mainRoom').length > 0) {
          cy.get('.mainRoom')
        } else {
          cy.get('p').contains('There are no rooms. Let\'s create one!')
        }
      })
      cy.wait('@allRoom').then(({response}) => {
        expect(response.statusCode).to.be.oneOf([200,304])
      })
      // cy.wait('@validateUser').then(({response}) => {
      //   expect(response.statusCode).to.be.oneOf([200,304])
      // })
      cy.wait('@getCurrentRoom').then(({response}) => {
        expect(response.statusCode).to.be.oneOf([200,304])
      })
    })

    specify('math render new components after click', () => {
      cy.get('button').contains('math').click()
      cy.get('h2').contains('Active math Room')
    })

    specify('english render new components after click', () => {
      cy.get('button').contains('english').click()
      cy.get('h2').contains('Active english Room')
    })

    specify('history render new components after click', () => {
      cy.get('button').contains('history').click()
      cy.get('h2').contains('Active history Room')
    })

    specify('science render new components after click', () => {
      cy.get('button').contains('science').click()
      cy.get('h2').contains('Active science Room')
    })

    specify('languages render new components after click', () => {
      cy.get('button').contains('languages').click()
      cy.get('h2').contains('Active languages Room')
    })

    specify('render new components after click', () => {
      cy.get('button').contains('miscellaneous').click()
      cy.get('h2').contains('Active miscellaneous Room')
    })

  })
})