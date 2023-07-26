describe('visit the web app', () => {
  it('visit', () => {
    cy.visit('https://app-web-berlin42-50e7ace7d4d7.herokuapp.com/')
  })
})

describe('first XSS test', () => {
	it('click', () => {
		cy.visit('https://app-web-berlin42-50e7ace7d4d7.herokuapp.com/');
		cy.contains('Reflected XSS Example 1').click();
		cy.url().should('eq', 'https://app-web-berlin42-50e7ace7d4d7.herokuapp.com/reflected_xss?foobar=Hello%20world!');
		cy.location('pathname').should('eq', '/reflected_xss');
	})
})