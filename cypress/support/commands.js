/// <reference types="cypress" />
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

function generateRandomText(length) {
	const characters = '!?@#$^&*()_+';
	let randomText = '';
  
	for (let i = 0; i < length; i++) {
	  const randomIndex = Math.floor(Math.random() * characters.length);
	  randomText += characters[randomIndex];
	}
	return randomText;
  }

Cypress.Commands.add("fuzz_attack", (url, n) => {
	let link = url + generateRandomText(10);
  cy.request({
    method: 'GET',
    url: link,
    failOnStatusCode: false
  }).then((Response) => {
    if (Response.status != 200 && Response.status != 404)
    {
      cy.visit(link, {failOnStatusCode: true});
    }
    else if (n > 1)
      cy.fuzz_attack(url, n-1);
  })
});

//Only works for same domain
Cypress.Commands.add("a_test", (element, url) => {
  //verify the href, don't click through
  cy.get(element).should('have.attr', 'href')
  .and('include', url)

  cy.url().then((newurl) => {
    cy.get(element).should('have.prop', 'href')
    .and('equal', newurl + url.substring(1))
  })

  //click to the new page
  cy.get(element).click()
  cy.url().should('include', url)
  cy.go('back')

  //visit extracting the link
  cy.get(element).then(($a) => {
    const href = $a.prop('href')
    cy.visit(href);
    cy.url().should('include', url);
  })
})