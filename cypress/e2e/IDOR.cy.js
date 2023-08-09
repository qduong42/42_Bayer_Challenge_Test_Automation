/// <reference types="cypress" />

describe('IDOR', () => {

  it('Basic test', () => {
    cy.visit('https://app-web-berlin42-50e7ace7d4d7.herokuapp.com/')
    cy.get(':nth-child(9) > a').click();
    cy.url().then((url) => {
      expect(url).eq("https://app-web-berlin42-50e7ace7d4d7.herokuapp.com/private_pages/123/document.html")
    })
  })

  it('Fuzzing', () => {
    cy.fuzz_attack('https://app-web-berlin42-50e7ace7d4d7.herokuapp.com/private_pages/123/document.html', 50)
  })
  
  it('Change user and check status', () => {
    cy.request('https://app-web-berlin42-50e7ace7d4d7.herokuapp.com/private_pages/121/document.html')
    .then((Response) => {
      expect(Response.status).eq(401);
    })
  })

  it('Change user and check page body', () => {
    cy.visit('https://app-web-berlin42-50e7ace7d4d7.herokuapp.com/private_pages/121/document.html');
    cy.get('body').should("not.contain", "This is a private page that should only be viewable by user 121. You've exploited an insecure direct object reference to view this!")
  })
})