import { LoremIpsum } from 'lorem-ipsum';
require('../support/e2e.js');

context('Fields Validation', () => {
  let data;

  before(function () {
    cy.visitContact();
    cy.contains('button', 'Send').click();
    cy.fixture('contact.json').then(function (fdata) {
      data = fdata;
    });
  });

  it('"Name" is mandatory and a message should be displayed in case this field in left empt ', () => {
    cy.get('[data-testid=form]')
      .get(':nth-child(1) > :nth-child(1) > .input > .ui').should('have.text', 'Name is mandatory');
  });

  it('"Email" is mandatory and a message should be displayed in case this field in left empt ', () => {
    cy.get('[data-testid=form]')
      .get('.eight > .input > .ui').should('have.text', 'Email is mandatory');
  });

  it('"Comment" is mandatory and a message should be displayed in case this field in left empt ', () => {
    cy.get('[data-testid=form]')
      .get(':nth-child(4) > .input > .ui').should('have.text', 'Comment is mandatory');
  });

  it('"Phone" is mandatory and a message should be displayed in case this field in left empt ', () => {
    cy.get('[data-testid=form]')
      .get('.PhoneInput').should('have.text', 'Phone is mandatory');
  });

  it('Should be possible set the data Travel', () => {
    cy.get('.DateRangePickerInput_calendarIcon').click();
    cy.get('.DayPickerNavigation_rightButton__horizontalDefault > .DayPickerNavigation_svg__horizontal').click();
    cy.get('[aria-label=' + data.contact1.arrival + ']').click();
    cy.get('.DayPickerNavigation_rightButton__horizontalDefault > .DayPickerNavigation_svg__horizontal').click();
    cy.get('.DayPickerNavigation_rightButton__horizontalDefault > .DayPickerNavigation_svg__horizontal').click();
    cy.get('[aria-label=' + data.contact1.departure + ']').click();
  });
  
  it('Should be possible add text', () => {
    cy.visitContact();
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
  });
});

context('Send a contact forms', () => {
  let data;

  before(function () {
    cy.visitContact();
    cy.contains('button', 'Send').click();
    cy.fixture('contact.json').then(function (fdata) {
      data = fdata;
    });
  });
  it('"Send a forms with all fields fill ', () => {
    cy.visitContact();
    cy.get('[data-testid="form"] > :nth-child(1) > :nth-child(1) > .ui > input').type(data.contact1.name);
    cy.get('.eight > .ui > input').type(data.contact1.email);
    cy.get('.PhoneInput').type(data.contact1.phone);
    cy.get('.four > .ui > input').type(data.contact1.guests);

    const lorem = new LoremIpsum({
      sentencesPerParagraph: {
        max: 8, min: 4
      },
      wordsPerSentence: {
        max: 16, min: 4
      }
    });
    cy.get('.input > textarea').type(lorem.generateSentences(5));

    cy.get('.DateRangePickerInput_calendarIcon').click();
    cy.get('.DayPickerNavigation_rightButton__horizontalDefault > .DayPickerNavigation_svg__horizontal').click();
    cy.get('[aria-label=' + data.contact1.arrival + ']').click();
    cy.get('.DayPickerNavigation_rightButton__horizontalDefault > .DayPickerNavigation_svg__horizontal').click();
    cy.get('.DayPickerNavigation_rightButton__horizontalDefault > .DayPickerNavigation_svg__horizontal').click();
    cy.get('[aria-label=' + data.contact1.departure + ']').click();

    cy.contains('button', 'Send').click();
    cy.get('[data-testid="form"] > .success', { timeout: 10000 }).and('be.visible').should('contain', 'Your request has been sent successfully.');
  });
});
