/// <reference types="cypress" />

describe(`Loading Spinner`, () => {
  beforeEach(() => {
    cy.visit('#/error-handler');
  });

  it('Displays an error dialog when an http request returns with 404 and the error is not caught', () => {
    cy.server({
      force404: true,
    });
    cy.get('[data-test-id="cy-trigger-404-error"]').click();
    cy.get('.btp-error-handler__container').should('exist');
    cy.contains('Http failure response for http://localhost:4200/__cypress/xhrs/http://localhost:4200/wrong/url: 404 Not Found');
    cy.get('.btp-error-handler__dismiss').should('have.focus');
  });

  it('Displays an error dialog when a runtime error is thrown', () => {
    cy.server({
      force404: true,
    });
    cy.get('[data-test-id="cy-trigger-runtime-error"]').click();
    cy.get('.btp-error-handler__container').should('exist');
    cy.contains('this is a runtime error');
    cy.get('.btp-error-handler__dismiss').should('have.focus');
  });
});
