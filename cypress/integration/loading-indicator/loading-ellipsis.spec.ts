describe(`Loading Ellipsis`, () => {
  beforeEach(() => {
    cy.visit('#/loading-ellipsis');
  });

  it('Loading indicator can be customised using components provided in the configuration', () => {
    cy.get('[data-test-id="cy-trigger-indicator"]').click();
    cy.get('btp-overlay').should('be.visible');
    cy.get('.btp-loading-indicator__container').should('exist');
    cy.get('btp-ellipsis').should('exist');
  });
});
