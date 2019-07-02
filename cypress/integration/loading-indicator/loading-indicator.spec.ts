/// <reference types="cypress" />
describe(`Loading Spinner`, () => {
  beforeEach(() => {
    cy.visit('#/loading-indicator/spinner');
  });

  it('When triggered using the decorators, whatever was focused, it is not focused anymore.', () => {
    cy.get('[data-test-id="cy-trigger-indicator"]').click();
    cy.get('btp-overlay').should('be.visible');
    cy.get('.btp-loading-indicator__container').should('exist');
    cy.get('btp-spinner').should('exist');
  });

  it(`Spinner's appearance can be customised and it should have color: red`, () => {
    cy.get('[data-test-id="cy-trigger-indicator"]').click();
    cy.get('.btp-spinner').children().should('have.css', 'border-color')
      .and('eq', 'rgb(255, 0, 0) rgba(0, 0, 0, 0) rgba(0, 0, 0, 0)');
    cy.get('.btp-spinner').children().should('have.css', 'border-width')
      .and('eq', '10px');
  });

  it('The loading-indicator disappears after the stop decorator is called', () => {
    cy.get('[data-test-id="cy-trigger-indicator"]').click();
    cy.get('btp-overlay').should('be.visible');
    cy.wait(100);
    cy.get('btp-overlay').should('not.be.visible');
  });

  it('Loading indicator can be customised using components imported from the library', () => {
    cy.get('[data-test-id="cy_ellipsis_link"]').click();
    cy.get('[data-test-id="cy-trigger-indicator"]').click();
    cy.get('btp-overlay').should('be.visible');
    cy.get('.btp-loading-indicator__container').should('exist');
    cy.get('btp-ellipsis').should('exist');
  });

  it(`Ellipsis appearance can be customised and it should have color: purple`, () => {
    cy.get('[data-test-id="cy_ellipsis_link"]').click();
    cy.get('[data-test-id="cy-trigger-indicator"]').click();
    cy.get('.btp-ellipsis').children().should('have.css', 'background-color')
      .and('eq', 'rgb(123, 31, 162)');
  });

  it('Loading indicator can be customised using components created application side', () => {
    cy.get('[data-test-id="cy_message_link"]').click();
    cy.get('[data-test-id="cy-trigger-indicator"]').click();
    cy.get('btp-overlay').should('be.visible');
    cy.get('.btp-loading-indicator__container').should('exist');
    cy.get('app-loading-message').should('exist');
  });
});
