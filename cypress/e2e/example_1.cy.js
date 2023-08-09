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
		cy.log("script executed!");
	})
})

describe('test case: test link 2', () => {
	let link = encodeURIComponent('"><script>alert("XSS attack!");</script>')
	it ('break the class', () => {
		cy.visit('https://app-web-berlin42-50e7ace7d4d7.herokuapp.com/reflected_xss_2?foo=' + link);
	})
})

describe('local site', () => {
  it('visit', () => {
    cy.visit('csrf.html')
		cy.visit('https://app-web-berlin42-50e7ace7d4d7.herokuapp.com/reflected_xss_2?foo=123');
  })
})

describe('test business level', () => {
  it.only('business', () => {
    cy.visit('https://app-web-berlin42-50e7ace7d4d7.herokuapp.com');
    cy.a_test(':nth-child(3) > a', '/reflected_xss_3?foo=bar')
  })
})  

describe("http request", () => {
  it("http request", () => {
    cy.intercept('GET', '*.js').as('get_js');
    cy.visit('https://app-web-berlin42-50e7ace7d4d7.herokuapp.com/auth_bypass')
    cy.wait('@get_js')
    cy.get('@get_js').then((interception) => {
      const jsPath = interception.request.url;
      cy.log(jsPath)
      cy.request(jsPath).then((Response) => {
        const jsContent = Response.body;
        const functionNamePattern = /function\s+(\w+)\s*\(/
        const match = jsContent.match(functionNamePattern);
        if (match) {
          const functionName = match[1];
          const args = 'user42';

          cy.intercept('GET', '**').as('get_html')
          cy.window().then((win) => {
            win[functionName](args)
            // cy.get()
          })
          cy.wait('@get_html')
          cy.get('@get_html').then((interception) => {
            // cy.log(interception.Response.body)
            const banRequest = interception.request.url
            cy.log(banRequest)
            cy.visit(banRequest)
            cy.get('body').should('not.contain', "Good job admin, you've just permanently banned user42!")
          })
        }
    })
    });
    
    
    // cy.wait('@get_js')
    // cy.get('@get_js');
    
  })

})