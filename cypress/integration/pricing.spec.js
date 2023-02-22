require('../support/e2e.js');

context('Fields Validation', () => {
  before(function () {
    cy.visitPricing();
  });

  it('Should Display the correct value of price', () => {
    cy.get('[data-price-period="2"]').contains('Yearly');
    cy.get('#scroll-prop-plan').clear().type('50');
    cy.contains('.price-card-starter > .price-item', '$64');
    cy.contains(':nth-child(2) > .price-item', '$375');
    cy.contains(':nth-child(3) > .price-item', '$525');
  });
  it('Currency properly changes the currency of the pricing options', () => {
    cy.get('.price-card-starter > .price-item > :nth-child(1) > .plan-price').invoke('text').then(($value_1) => {
      cy.get('.price-currency-select').select('gbp');
      cy.get('.price-card-starter > .price-item > :nth-child(1) > .plan-price').invoke('text').then(($value_2) => {
        expect($value_1).to.not.equal($value_2);
      });
    });
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
    let starter
    cy.log(cy.fixture('benefits/starter.txt'));
    cy.fixture('benefits/starter.txt').then(function (data) {
      this.starter = data;
    });
     cy.log(starter)
  });
});
