require('../support/e2e.js');

describe('Prices Features', () => {
  // Instance prices and benefits
  const prices = require('../fixtures/benefits/prices.json');
  const benefits = require('../fixtures/benefits/benefits.json');

  //Before Each teste
  beforeEach(() => {
    cy.visitPricing();
  });

  context('Prices Validation', () => {
    it('Verify text of plans', () => {
      const teste = cy.get('body > div.content-wrapper > div.section.pad-top-0.pad-bot-2 > div.container-fluid > div.row.halign-center.price-grid > div.col-auto.price-card-starter > div > div.plan-feature-lists.wd-lg.push-top-2 > ul');
      expect(teste).to.not.contains(benefits.professional);
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
        .should('contains', prices.year.starter.eur);

      cy.get('.price-currency-select').select('usd');
      cy.get('.price-card-starter > .price-item > :nth-child(1) > .plan-price').invoke('text')
        .should('contains', prices.year.starter.usd);
    });

    it('Change currence: USD to GBP', () => {
      cy.get('#scroll-prop-plan').clear().type('1');
      cy.get('.price-currency-select').select('usd');
      cy.get('.price-card-starter > .price-item > :nth-child(1) > .plan-price').invoke('text')
        .should('contains', prices.year.starter.usd);
      cy.get('.price-currency-select').select('gbp');
      cy.get('.price-card-starter > .price-item > :nth-child(1) > .plan-price').invoke('text')
        .should('contains', prices.year.starter.gbp);
    });

    it('Change currence: GBP to USD', () => {
      cy.get('#scroll-prop-plan').clear().type('1');
      cy.get('.price-currency-select').select('gbp');
      cy.get('.price-card-starter > .price-item > :nth-child(1) > .plan-price').invoke('text')
        .should('contains', prices.year.starter.gbp);

      cy.get('.price-currency-select').select('usd');
      cy.get('.price-card-starter > .price-item > :nth-child(1) > .plan-price').invoke('text')
        .should('contains', prices.year.starter.usd);
    });

    it('Months changes pricing options', () => {
      if (cy.get(':nth-child(1) > .price-item > :nth-child(1) > .plan-price').invoke('text') == '$12') {
        cy.get('#scroll-prop-plan').clear().type('70');
        cy.get('.price-card-starter > .price-item > :nth-child(1) > .plan-price').should('contains', '$74');
      }
    });
    it('Should display the prices in EUR', () => {
      cy.get('#scroll-prop-plan').clear().type('1');
      cy.get('.price-card-starter > .price-item > :nth-child(1) > .plan-price').then(($value) => {
        expect(prices.year.starter.eur).to.equal($value.text());
      });
    });
  });
});
