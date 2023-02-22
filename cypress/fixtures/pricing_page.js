

class PricingPage {

  
    /*On "Lodgify Pricing" page, add a test to verify that the "Yearly" plan selecting 50 rentals displays: $64 for Starter plan $375 for Professional plan $525 for Ultimate plan */
    validateYearlyPlanValue() { 

      cy.get('[data-price-period="2"]').contains('Yearly')
      cy.get('#scroll-prop-plan').clear().type('50')
      cy.contains('.price-card-starter > .price-item','$64')
      cy.contains(':nth-child(2) > .price-item','$375')
      cy.contains(':nth-child(3) > .price-item','$525')
    }

    /*On "Lodgify Pricing" page, add a test to verify that the change of currency (located just below the pricing options) properly changes the currency of the pricing options. 
    The way you do so, and the extra verification steps are up to you (such as verifying the currency price difference) */
    verifyCurrenceChange() {
      let currencies = cy.get('.price-currency-select')
      currencies.click

       }
      

    /* Using your own criteria, add tests according to what you think should be important to cover in this page "Lodgify Pricing". (Optional) */
    verifyChangeMonths() {
      cy.get('.price-card-starter > .price-item > :nth-child(1) > .plan-price').then(($value) => {
          let getText = $value.text()
          cy.log(getText)
          if(getText == '$12'){
            cy.get('#scroll-prop-plan').clear().type('70')
            let change = cy.get('.price-card-starter > .price-item > :nth-child(1) > .plan-price')
            change.contains('$74')
          }

        }
      ) }

  }
  
  export default PricingPage;