/// <reference types="cypress" />

describe('CSRF testing', () => {
  it ('Check if website is \'lright', () => {
    cy.visit('https://app-web-berlin42-50e7ace7d4d7.herokuapp.com/')
    cy.get(':nth-child(5) > a').click()
    cy.get('[name="account_number"]').type("123456")
    cy.get('[type="submit"]').click()
    cy.get('body').contains("123456")
    cy.get('[name="account_number"]').type("999999999911120302104210491204021")
    cy.get('[type="submit"]').click()
    cy.get('body').contains("999999999911120302104210491204021")
  })
  it('CSRF attack', () => {
    cy.visit('https://app-web-berlin42-50e7ace7d4d7.herokuapp.com/')
    cy.get(':nth-child(5) > a').click()
    cy.get('[name="account_number"]').type("123456")
    cy.get('[type="submit"]').click()
    cy.get('body').contains("123456")

    cy.visit('https://csrfattack42.000webhostapp.com/')
    cy.visit('https://app-web-berlin42-50e7ace7d4d7.herokuapp.com/')
    cy.get(':nth-child(5) > a').click()
    cy.get('body').should('not.contain', "Attacker account number")
  })
})