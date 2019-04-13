describe(`Loading Indicator`, () => {
  beforeEach(() => {
    cy.visit('#/loading-indicator');
  });

  it('When triggered using the decorators, whatever was focused, it is not focused anymore.', () => {
    cy.get('[data-test-id="t-trigger-indicator"]').click();
    cy.get('lib-loading-indicator').should('be.visible');
  });
});
