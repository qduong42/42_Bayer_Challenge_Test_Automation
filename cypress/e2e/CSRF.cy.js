/// <reference types="cypress" />

describe('CSRF testing', () => {

  /*This one is just changing the account number and
  checking if the body is modified as a result*/
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

  it('Fuzzing', () => {
    cy.fuzz_attack('https://app-web-berlin42-50e7ace7d4d7.herokuapp.com/csrf', 50);
  })

  /*This one is launching an CSRF attack, opening an html file
  locally stored in a folder 'misc'*/
  it('CSRF attack (local)', () => {
    cy.visit('misc/CSRF_hosted_website.html')
    cy.origin('https://app-web-berlin42-50e7ace7d4d7.herokuapp.com', () => {
        cy.visit('');
        cy.get(':nth-child(5) > a').click()
        cy.get('body').should('not.contain', "Attacker account number")
    })
  })

  /*This one is launching an CSRF attack,
  externally hosted html file (from a third party)
  it is also first making sure that the account number of the user
  is changed to '123456'*/
  it('CSRF attack (hosted)', () => {
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