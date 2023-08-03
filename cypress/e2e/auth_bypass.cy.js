describe("http request", () => {
  it.only("http request", () => {
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
  })

})