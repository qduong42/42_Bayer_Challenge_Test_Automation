
/// <reference types="cypress" />

describe('Fuzzing', () => {
  it("Just check as it is", () => {
    
    cy.visit('https://app-web-berlin42-50e7ace7d4d7.herokuapp.com')
    cy.get(':nth-child(6) > a').click()
    // cy.get('body').should('contain', 'Fuzzing is an important tool in penetration testing; the core idea is that by passing unexpected inputs to a server, you can get it to perform in potentially exploitable ways.');
  })

  it("Fuzzing attack", () => {
    cy.fuzz_attack('https://app-web-berlin42-50e7ace7d4d7.herokuapp.com/fuzzing/fuzz.html', 50)
    // cy.get('body').should('contain', 'Fuzzing is an important tool in penetration testing; the core idea is that by passing unexpected inputs to a server, you can get it to perform in potentially exploitable ways.');
  })
})