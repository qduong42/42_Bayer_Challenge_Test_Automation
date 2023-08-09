/// <reference types="cypress" />

// function extractFoobarValue(input) {
//   const foobarIndex = input.indexOf("foobar=");

//   if (foobarIndex !== -1) {
//     let foobarValue = input.substring(foobarIndex + 7);
//     const queryParamSeparatorIndex = foobarValue.indexOf("&");
//     if (queryParamSeparatorIndex !== -1) {
//       foobarValue = foobarValue.substring(0, queryParamSeparatorIndex);
//     }
//     return foobarValue;
//   } else {
//     return "";
//   }
// }

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
  //example (https...?foobar=var1&foobar=var2&foobar=var3...&foobar=var'numberOfVars')
  //number of vars is random and the var value is also randomly generated
  //then this code makes sure that the variables are also present in the body of the website
  it('Open link with a bunch of variables', () => {
    let numberOfVars = Math.floor(1 + Math.random() * 9)
    let link = 'https://app-web-berlin42-50e7ace7d4d7.herokuapp.com/reflected_xss'
    for (let i = 0; i < numberOfVars; i++) {
      if (!i)
        link += "?foobar="
      else
        link += "&foobar="
      link += generateRandomText(10);
    }
    cy.visit(link)
    cy.get('body').contains("The following text is reflected from the url:")
    cy.location('search').then((searchQueryObject) => {
      const decodedQueryString = decodeURIComponent(searchQueryObject).substring(1).replaceAll("foobar=", "").replaceAll("&", ",");
      cy.log(`Search Query as a String: ${decodedQueryString}`);
      cy.get('body').contains(decodedQueryString);
    });
  })

  it('Fuzzing', () => {
    cy.fuzz_attack('https://app-web-berlin42-50e7ace7d4d7.herokuapp.com/reflected_xss', 50);
  })
  //from the main page it opens the link to the XSS 1
  //then it injects an alert simply by changing the link's value
  //then we expect to not have an alert??(or expect to have(we did't decide yet))
  //? do we expect the website to have vulnerabilities or not (while testing)
  it('XSS attack', () => {
    cy.visit('https://app-web-berlin42-50e7ace7d4d7.herokuapp.com/')
    cy.get(':nth-child(1) > a').click()
    cy.get('body').contains("The following text is reflected from the url:")
    cy.url().then((url) => {
      let newurl = changeAfterFoobar(url, "<script>alert('Hacked')</script>")
      cy.visit(newurl)
    })
    cy.on('window:alert',(t)=>{
      expect(t).to.not.include('Hacked')
   })
  })
})

describe("http request", () => {
  it("http request", () => {
    cy.request('GET', 'https://app-web-berlin42-50e7ace7d4d7.herokuapp.com/reflected_xss', {
      foobar: '123'
    }).then((Response) => {
      cy.log(Response)
      expect(Response.status).to.equal(200)
    })
  })
})