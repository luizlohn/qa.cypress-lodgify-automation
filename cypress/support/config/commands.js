// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import { faker } from '@faker-js/faker';

Cypress.Commands.add('visitContact', () => {
  cy.visit('http://localhost:8080/Contact.html');
  cy.title().should('include', 'Contact');
});

Cypress.Commands.add('visitPricing', () => {
  cy.visit('http://localhost:8080/pricing.html');
});

Cypress.Commands.add('submitContactForm', (contact) => {
  cy.get('input[placeholder="Name"]').type(contact.name);
  cy.get('input[placeholder="Email"]').type(contact.email);
  cy.get('input[placeholder="Phone"]').type(contact.phone);
  cy.get('input[placeholder="Guests"]').type(contact.guests);
  cy.selectArrivalAndDepartureDate(contact.arrival, contact.departure);
  cy.get('textarea[placeholder="Comment"]').type(faker.lorem.sentences(2));
  cy.contains('button', 'Send').click();
});

Cypress.Commands.add('selectArrivalAndDepartureDate', (arrival, departure) => {
  cy.get('.DateRangePickerInput_calendarIcon').click();
  cy.get('.DayPickerNavigation_rightButton__horizontalDefault > .DayPickerNavigation_svg__horizontal').click();
  cy.get(`td[aria-label=${arrival}]`).click();
  cy.get('.DayPickerNavigation_rightButton__horizontalDefault > .DayPickerNavigation_svg__horizontal').click();
  cy.get('.DayPickerNavigation_rightButton__horizontalDefault > .DayPickerNavigation_svg__horizontal').click();
  cy.get(`td[aria-label=${departure}]`).click();
});
