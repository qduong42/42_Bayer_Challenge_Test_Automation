describe('visit the web app', () => {
  it('visit', () => {
    cy.visit('https://app-web-berlin42-50e7ace7d4d7.herokuapp.com/')
  })
})

describe('get into first test url', () => {
	it('visit', () => {
		cy.visit('https://app-web-berlin42-50e7ace7d4d7.herokuapp.com/');
		
		// click!
		cy.contains('Reflected XSS Example 1').click();
		cy.url().should('eq', 'https://app-web-berlin42-50e7ace7d4d7.herokuapp.com/reflected_xss?foobar=Hello%20world!');
		
		// verify path
		cy.location('pathname').should('eq', '/reflected_xss');
		
		// verify query string
		cy.location('search').should('eq', '?foobar=Hello%20world!');

		cy.visit('https://app-web-berlin42-50e7ace7d4d7.herokuapp.com/reflected_xss?foobar=test');


	})
})

describe('test case: query string', () => {
	it ('XSS reflection', () => {
		cy.visit('https://app-web-berlin42-50e7ace7d4d7.herokuapp.com/reflected_xss?foobar=test');
		cy.contains('The following text is reflected from the url: test').should('be.visible');
	})
})

describe('test case: two query string', () => {
	it ('XSS reflection', () => {
		cy.visit('https://app-web-berlin42-50e7ace7d4d7.herokuapp.com/reflected_xss?foobar=test&foobar=asd');
		cy.contains('The following text is reflected from the url: test,asd').should('be.visible');
	})
})

describe('test case: XSS attack script', () => {
	it ('XSS reflection', () => {
		cy.visit('https://app-web-berlin42-50e7ace7d4d7.herokuapp.com/reflected_xss?foobar=<script>alert("XSS attack!");</script>');
		
		cy.contains('The following text is reflected from the url: ').should('be.visible');
		
		cy.on('window:alert', (message) => {
			expect(message).to.equal('XSS attack!');
		})
	})
})
