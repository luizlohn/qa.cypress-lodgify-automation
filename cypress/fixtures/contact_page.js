import {LoremIpsum} from 'lorem-ipsum'


class ContactPage {

    /*On "Contact" page, add a test to verify that the field validations
     appear according to the following requirements. 
     "Name" is mandatory and a message should be displayed in case this field
      is left empty 
      "Phone number" is mandatory and a message should be displayed in case this field is left empty 
      "Email address" is mandatory and a message should be displayed in case this field is left empty 
      "Comment" is mandatory and a message should be displayed in case this field is left empty 
      This test should pick the date of arrival 
      "April 14th" and date of departure 
      "June 14" to verify the datepicker is working 
      as expected This test should also add a random Lorem Ipsum of your choice to "Comment" field
    */
 


    getNameFieldValidation() { 
      cy.contains('button', 'Send').click()
      const test = cy.get('[data-testid=form]')
        .get(':nth-child(1) > :nth-child(1) > .input > .ui').should('have.text','Name is mandatory')  
    }

    getPhoneValidation() {
      cy.contains('button', 'Send').click()
      const test = cy.get('[data-testid=form]')
        .get('.PhoneInput').should('have.text','Name is mandatory')  
    }
    
    getEmailValidation() {
      cy.contains('button', 'Send').click()
      const test = cy.get('[data-testid=form]')
        .get('.eight > .input > .ui').should('have.text','Email is mandatory')  
    }

    getCommentsValidation() {
      cy.contains('button', 'Send').click()
      const test = cy.get('[data-testid=form]')
        .get(':nth-child(4) > .input > .ui').should('have.text','Comment is mandatory')  
    }

    setDataTravel(){
        cy.get(".DateRangePickerInput_calendarIcon").click();
        cy.get('.DayPickerNavigation_rightButton__horizontalDefault > .DayPickerNavigation_svg__horizontal').click()
        cy.get("[aria-label='Friday, April 14, 2023']").click()
        cy.get('.DayPickerNavigation_rightButton__horizontalDefault > .DayPickerNavigation_svg__horizontal').click()
        cy.get('.DayPickerNavigation_rightButton__horizontalDefault > .DayPickerNavigation_svg__horizontal').click()
        cy.get("[aria-label='Wednesday, June 14, 2023']").click()  
    }

    setComments(){
      const lorem = new LoremIpsum({
        sentencesPerParagraph: {
          max: 8,
          min: 4,
        },
        wordsPerSentence: {
          max: 16,
          min: 4,
        },
      })
      cy.get('.input > textarea').type(lorem.generateSentences(5))

    }
  }
  
  export default ContactPage;