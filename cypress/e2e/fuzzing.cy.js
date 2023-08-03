
/// <reference types="cypress" />

/* This function is randomly generating 'length'
  of symbols in order to try and break the page*/
function generateRandomText(length) {
  const characters = '!?@#$^&*()_+';
  let randomText = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomText += characters[randomIndex];
  }
  return randomText;
}

/* This is going to send 'n' requests until
    it actually breaks the website */
function makeRequest(n){
  let link = 'https://app-web-berlin42-50e7ace7d4d7.herokuapp.com/fuzzing/fuzz.html' + generateRandomText(10);
  cy.request({
    method: 'GET',
    url: link,
    failOnStatusCode: false
  }).then((Response) => {
    if (Response.status == 500)
    {
      cy.visit(link, {failOnStatusCode: false});
    }
    else if (n > 1)
      makeRequest(n-1);
  })
}

describe('Fuzzing', () => {
  it("Just check as it is", () => {
    
    cy.visit('https://app-web-berlin42-50e7ace7d4d7.herokuapp.com')
    cy.get(':nth-child(6) > a').click()
    cy.get('body').should('contain', 'Fuzzing is an important tool in penetration testing; the core idea is that by passing unexpected inputs to a server, you can get it to perform in potentially exploitable ways.');
  })

  it("Fuzzing attack", () => {
    makeRequest(50)
    cy.get('body').should('contain', 'Fuzzing is an important tool in penetration testing; the core idea is that by passing unexpected inputs to a server, you can get it to perform in potentially exploitable ways.');
  })
})