import { LoremIpsum } from 'lorem-ipsum';

class ContactPage {
  getNameFieldValidation () {
    cy.contains('button', 'Send').click();
    cy.get('[data-testid=form]')
      .get(':nth-child(1) > :nth-child(1) > .input > .ui').should('have.text', 'Name is mandatory');
  }

  getPhoneValidation () {
    cy.contains('button', 'Send').click();
    cy.get('[data-testid=form]')
      .get('.PhoneInput').should('have.text', 'Name is mandatory');
  }

  getEmailValidation () {
    cy.contains('button', 'Send').click();
    cy.get('[data-testid=form]')
      .get('.eight > .input > .ui').should('have.text', 'Email is mandatory');
  }

  getCommentsValidation () {
    cy.contains('button', 'Send').click();
    cy.get('[data-testid=form]')
      .get(':nth-child(4) > .input > .ui').should('have.text', 'Comment is mandatory');
  }

  setName (name) {
    cy.get('[data-testid="form"] > :nth-child(1) > :nth-child(1) > .ui > input').type(name);
  }

  setPhone (phone) {
    cy.get('.PhoneInput').type(phone);
  }

  setEmail (email) {
    cy.get('.eight > .ui > input').type(email);
  }

  setGuests (guests) {
    cy.get('.four > .ui > input').type(guests);
  }

  setDataTravel () {
    cy.get('.DateRangePickerInput_calendarIcon').click();
    cy.get('.DayPickerNavigation_rightButton__horizontalDefault > .DayPickerNavigation_svg__horizontal').click();
    cy.get("[aria-label='Friday, April 14, 2023']").click();
    cy.get('.DayPickerNavigation_rightButton__horizontalDefault > .DayPickerNavigation_svg__horizontal').click();
    cy.get('.DayPickerNavigation_rightButton__horizontalDefault > .DayPickerNavigation_svg__horizontal').click();
    cy.get("[aria-label='Wednesday, June 14, 2023']").click();
  }

  setComments () {
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
    cy.get('.input > textarea').type(lorem.generateSentences(5));
  }
}

export default ContactPage;
