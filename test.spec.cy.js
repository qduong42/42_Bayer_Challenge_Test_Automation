/// <reference types="cypress" />

function extractFoobarValue(input) {
  const foobarIndex = input.indexOf("foobar=");

  if (foobarIndex !== -1) {
    let foobarValue = input.substring(foobarIndex + 7);
    const queryParamSeparatorIndex = foobarValue.indexOf("&");
    if (queryParamSeparatorIndex !== -1) {
      foobarValue = foobarValue.substring(0, queryParamSeparatorIndex);
    }
    return foobarValue;
  } else {
    return "";
  }
}

function changeAfterFoobar(inputString, newValue) {
  const foobarIndex = inputString.indexOf("foobar=");
  if (foobarIndex !== -1) {
    const prefix = inputString.substring(0, foobarIndex + 7);
    const postfix = inputString.substring(foobarIndex + 7);
    return prefix + newValue + postfix;
  } else {
    return inputString;
  }
}

function generateRandomText(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomText = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomText += characters[randomIndex];
  }

  return randomText;
}

describe('Test link "Reflected XSS Example 1"', () => {
  it('Check random link', () => {
    cy.visit('https://app-web-berlin42-50e7ace7d4d7.herokuapp.com/')
    cy.get(':nth-child(1) > a').click()
    cy.get('body').contains("The following text is reflected from the url:")
    cy.url().then((url) => {
      let newurl = changeAfterFoobar(url, generateRandomText(10));
      cy.visit(newurl);
      cy.get('body').contains(extractFoobarValue(decodeURIComponent(newurl)))
    })
  })
})