/// <reference types="cypress" />

describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://app-web-berlin42-50e7ace7d4d7.herokuapp.com/')
    cy.get('a').each((link, index) => {
      // Generate a selector for the current <a> element
      const selector = `a:eq(${index})`;
      cy.a_test(selector, link.attr('href'));
      // Log the generated selector
      // cy.log(selector);
    });
      // cy.log(`Link: ${href}`);
      // cy.a_test(':nth-child('+$link.attr('a')+') > a', href)
  })
})