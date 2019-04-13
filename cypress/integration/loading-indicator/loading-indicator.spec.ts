describe(`Loading Indicator`, () => {
  beforeEach(() => {
    cy.visit('#/loading-indicator');
  });

  it('When triggered using the decorators, whatever was focused, it is not focused anymore.', () => {
    cy.get('[data-test-id="cy-trigger-indicator"]').click();
    cy.get('btp-loading-indicator').should('be.visible');
  });

  it('The loading-indicator disappears after the stop decorator is called', () => {
    cy.get('[data-test-id="cy-trigger-indicator"]').click();
    cy.get('btp-loading-indicator').should('be.visible');
    cy.wait(500);
    cy.get('btp-loading-indicator').should('not.be.visible');
  });
});
