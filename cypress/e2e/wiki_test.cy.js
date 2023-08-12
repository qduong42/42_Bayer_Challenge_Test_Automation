describe('wiki_search', () => {
  it.only('check result', () => {
    cy.fixture('wiki_list.json').then((data) => {
      const list = data.list
      list.forEach((item) => {
        cy.wiki_search(item)
      });
    })
  })
})