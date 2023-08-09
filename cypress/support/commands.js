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