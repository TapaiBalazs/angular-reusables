describe(`Loading Spinner`, () => {
  beforeEach(() => {
    cy.visit('#/error-handler');
  });

  it('When triggered using the decorators, whatever was focused, it is not focused anymore.', () => {
    cy.server({
      force404: true
    });
    cy.get('[data-test-id="cy-trigger-404-error"]').click();
    cy.get('.btp-error-handler__container').should('exist');
  });
});
