require('../support/e2e.js');

context('Fields Validation', () => {
  beforeEach(function () {
    cy.visitContact();
    cy.contains('button', 'Send').click();
  });
  
  it('"Name" is mandatory and a message should be displayed in case this field in left empt ', () => {
    cy.get('[data-testid=form]')
      .get(':nth-child(1) > :nth-child(1) > .input > .ui').should('have.text', 'Name is mandatory');
  });
  it('"Email" is mandatory and a message should be displayed in case this field in left empt ', () => {
    cy.visitContact();
    cy.get('[data-testid=form]')
      .get('.eight > .input > .ui').should('have.text', 'Email is mandatory');
  });
  it('"Comment" is mandatory and a message should be displayed in case this field in left empt ', () => {
    cy.visitContact();
    cy.get('[data-testid=form]')
      .get(':nth-child(4) > .input > .ui').should('have.text', 'Comment is mandatory');
  });
  it('"Phone" is mandatory and a message should be displayed in case this field in left empt ', () => {
    cy.visitContact();
    cy.get('[data-testid=form]')
      .get('.PhoneInput').should('have.text', 'Phone is mandatory');
  });
  it('Should be possible set the data Travel', () => {
    cy.visitContact();

    cy.get('.DateRangePickerInput_calendarIcon').click();
    cy.get('.DayPickerNavigation_rightButton__horizontalDefault > .DayPickerNavigation_svg__horizontal').click();
    cy.get("[aria-label='Friday, April 14, 2023']").click();
    cy.get('.DayPickerNavigation_rightButton__horizontalDefault > .DayPickerNavigation_svg__horizontal').click();
    cy.get('.DayPickerNavigation_rightButton__horizontalDefault > .DayPickerNavigation_svg__horizontal').click();
    cy.get("[aria-label='Wednesday, June 14, 2023']").click();
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
  it('"Send a forms with all fields fill ', () => {
    cy.visitContact();
    cy.get('[data-testid="form"] > :nth-child(1) > :nth-child(1) > .ui > input').type(name);
    cy.get('.eight > .ui > input').type(email);
    cy.get('.PhoneInput').type(phone);
    cy.get('.four > .ui > input').type(guests);
    
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

    cy.get('.DateRangePickerInput_calendarIcon').click();
    cy.get('.DayPickerNavigation_rightButton__horizontalDefault > .DayPickerNavigation_svg__horizontal').click();
    cy.get("[aria-label='Friday, April 14, 2023']").click();
    cy.get('.DayPickerNavigation_rightButton__horizontalDefault > .DayPickerNavigation_svg__horizontal').click();
    cy.get('.DayPickerNavigation_rightButton__horizontalDefault > .DayPickerNavigation_svg__horizontal').click();
    cy.get("[aria-label='Wednesday, June 14, 2023']").click();


    cy.contains('button', 'Send').click();
    cy.get('[data-testid="form"] > .success', { timeout: 10000 }).and('be.visible').should('contain', 'Your request has been sent successfully.');
});
});
