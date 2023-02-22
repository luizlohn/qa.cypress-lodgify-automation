import ContactPage from "../fixtures/contact_page";
require('../support/e2e.js')


context('Fields Validation', () => {
  it('"Name" is mandatory and a message should be displayed in case this field in left empt ', () => {
    cy.visitContact()
    new ContactPage().getNameFieldValidation()
  
    

  })
  it('"Email" is mandatory and a message should be displayed in case this field in left empt ', () => {
    cy.visitContact()

    new ContactPage().getEmailValidation()
    

  })
  it('"Comment" is mandatory and a message should be displayed in case this field in left empt ', () => {
    cy.visitContact()

    new ContactPage().getCommentsValidation()
    

  })
  it('"Phone" is mandatory and a message should be displayed in case this field in left empt ', () => {
    cy.visitContact()

    new ContactPage().getPhoneValidation()
    

  })
  it('Should be possible set the data Travel', () => {
    cy.visitContact()

    new ContactPage().setDataTravel()
    

  })
  it('Should be possible add text', () => {
    cy.visitContact()

    new ContactPage().setComments()
  

  })
})

