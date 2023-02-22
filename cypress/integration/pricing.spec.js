import PricingPage from '../fixtures/pricing_page';
require('../support/e2e.js');

context('Fields Validation', () => {
  it('Should Display the correct value of price', () => {
    cy.visitPricing();

    new PricingPage().validateYearlyPlanValue();
  });
  it('Currency properly changes the currency of the pricing options', () => {
    cy.visitPricing();

    new PricingPage().verifyCurrenceChange();
  });
  it('Months changes pricing options', () => {
    cy.visitPricing();

    new PricingPage().verifyChangeMonths();
  });
});
