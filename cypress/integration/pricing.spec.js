require('../support/e2e.js');

context('Fields Validation', () => {
  let data;
  before(function () {
    cy.visitPricing();
    cy.fixture('benefits/prices.json').then(function (fdata) {
      data = fdata;
    });
  });

  it('Should Display the correct value of price', () => {
    cy.get('[data-price-period="2"]').contains('Yearly');
    cy.get('#scroll-prop-plan').clear().type('50');
    cy.contains('.price-card-starter > .price-item', '$64');
    cy.contains(':nth-child(2) > .price-item', '$375');
    cy.contains(':nth-child(3) > .price-item', '$525');
  });

  it('Change currence: EUR to USD', () => {
    cy.get('#scroll-prop-plan').clear().type('1');
    cy.get('.price-currency-select').select('eur');
    cy.get('.price-card-starter > .price-item > :nth-child(1) > .plan-price').invoke('text')
      .should('contains', data.year.starter.eur);

    cy.get('.price-currency-select').select('usd');
    cy.get('.price-card-starter > .price-item > :nth-child(1) > .plan-price').invoke('text')
      .should('contains', data.year.starter.usd);
  });

  it('Change currence: USD to GBP', () => {
    cy.get('#scroll-prop-plan').clear().type('1');
    cy.get('.price-currency-select').select('usd');
    cy.get('.price-card-starter > .price-item > :nth-child(1) > .plan-price').invoke('text')
      .should('contains', data.year.starter.usd);
    cy.get('.price-currency-select').select('gbp');
    cy.get('.price-card-starter > .price-item > :nth-child(1) > .plan-price').invoke('text')
      .should('contains', data.year.starter.gbp);
  });

  it('Change currence: GBP to USD', () => {
    cy.get('#scroll-prop-plan').clear().type('1');
    cy.get('.price-currency-select').select('gbp');
    cy.get('.price-card-starter > .price-item > :nth-child(1) > .plan-price').invoke('text')
      .should('contains', data.year.starter.gbp);

    cy.get('.price-currency-select').select('usd');
    cy.get('.price-card-starter > .price-item > :nth-child(1) > .plan-price').invoke('text')
      .should('contains', data.year.starter.usd);
  });

  it('Months changes pricing options', () => {
    cy.get('.price-card-starter > .price-item > :nth-child(1) > .plan-price').then(($value) => {
      const getText = $value.text();
      if (getText === '$12') {
        cy.get('#scroll-prop-plan').clear().type('70');
        const change = cy.get('.price-card-starter > .price-item > :nth-child(1) > .plan-price');
        change.contains('$74');
      }
    }
    );
  });
  it('Verify text of plans', () => {
    // cy.log(data.starter.booking);
  });

  it('Should display the prices in EUR', () => {
    cy.get('#scroll-prop-plan').clear().type('1');
    cy.get('.price-card-starter > .price-item > :nth-child(1) > .plan-price').then(($value) => {
      expect(data.year.starter.eur).to.equal($value.text());
    });
  });
});
