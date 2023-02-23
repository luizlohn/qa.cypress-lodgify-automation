import { LoremIpsum } from 'lorem-ipsum';
require('../support/e2e.js');


describe('Contact Tests', () => {
  const contact = require('../fixtures/contact.json');

  beforeEach(() => {
    cy.visitContact();
  });

  it('Send a form successfully', () => {
    cy.submitContactForm(contact.contact1);
    cy.get('[data-testid="form"] > .success', { timeout: 10000 })
      .should('be.visible')
      .and('have.text', 'Your request has been sent successfully.');
  });

  context('Fields Validation', () => {
    beforeEach(function () {
      cy.contains('button', 'Send').click();
    });

    it('Should display mandatory fields label message', () => {
      cy.contains('Name is mandatory').should('be.visible');
      cy.contains('Email is mandatory').should('be.visible');
      cy.contains('Comment is mandatory').should('be.visible');
      cy.contains('Phone is mandatory').should('be.visible');
    });

    it('Should be possible set the data Travel', () => {
      cy.selectArrivalAndDepartureDate(contact.contact1.arrival, contact.contact1.departure);
    });

    it('Should be possible add text', () => {
      const lorem = new LoremIpsum({
        sentencesPerParagraph: {
          max: 8,
          min: 4
        },
        wordsPerSentence: {
          max: 16,
          min: 4
        }
      });
      cy.get('textarea[placeholder="Comment"]').type(lorem.generateSentences(5));
    });
  });
});
