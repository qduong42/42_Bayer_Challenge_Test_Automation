/// <reference types="cypress" />

describe('wiki_search', () => {

  it('visit', () => {
    cy.visit('https://en.wikipedia.org/wiki/Main_Page')
  })

  it('fuzz', () => {
    cy.fuzz_attack('https://en.wikipedia.org/wiki/Main_Page', 50);
  })
  
  it('link', () => {
    cy.req_test('https://en.wikipedia.org/wiki/Main_Page')
  })

  it('check result', () => {
    cy.fixture('wiki_list.json').then((data) => {
      const list = data.list
      list.forEach((item) => {
        cy.wiki_search(item)
      });
    })
  })
})