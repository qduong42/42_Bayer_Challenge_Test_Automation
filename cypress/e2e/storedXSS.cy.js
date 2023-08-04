describe('visit the page', () => {
  it('visit', () => {
    cy.visit('https://app-web-berlin42-50e7ace7d4d7.herokuapp.com/stored_xss')
  })
})

describe('normal input', () => {
  it('simple string', () => {
    const input = "test"
    cy.visit('https://app-web-berlin42-50e7ace7d4d7.herokuapp.com/stored_xss')
    cy.get('input[name="stored_payload"]').type(input)
    cy.get('[type="submit"]').click()
    cy.get('body').contains(input)
  })
})

describe('XSS attack', () => {
  it('alert script', () => {
    const script = "<script>alert('whatsup')</script>"
    cy.visit('https://app-web-berlin42-50e7ace7d4d7.herokuapp.com/stored_xss')
    cy.get('[name="stored_payload"]').type(script)
    cy.get('[type="submit"]').click()
    cy.on('window:alert', (t) => {
      expect(t).to.not.include('whatsup')
    })
  })
})
