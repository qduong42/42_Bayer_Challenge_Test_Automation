/// <reference types="cypress" />
// "><script>alert('Hello')</script>

function changeAfterFoobar(inputString, newValue) {
  const foobarIndex = inputString.indexOf("foobar=");
  if (foobarIndex !== -1) {
    const prefix = inputString.substring(0, foobarIndex + 7);
    const postfix = inputString.substring(foobarIndex + 7);
    return prefix + newValue;
  } else {
    return inputString;
  }
}

describe('Test link "Reflected XSS Example 2"', () => {
  //Inject an XSS attack by closing the div class with (">\")infront of the injection
  it('XSS attack', () => {
    cy.visit('https://app-web-berlin42-50e7ace7d4d7.herokuapp.com/')
    cy.get(':nth-child(1) > a').click()
    cy.get('body').contains("The following text is reflected from the url:")
    cy.url().then((url) => {
      let newurl = changeAfterFoobar(url, ">\"<script>alert('Hacked')</script>")
      cy.visit(newurl)
    })
    cy.on('window:alert',(t)=>{
      expect(t).to.not.include('Hacked')
   })
  })
})