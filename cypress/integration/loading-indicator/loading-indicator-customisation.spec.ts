describe(`Loading Ellipsis`, () => {

  it('Loading indicator can be customised using components imported from the library', () => {
    cy.visit('#/loading-ellipsis');
    cy.get('[data-test-id="cy-trigger-indicator"]').click();
    cy.get('btp-overlay').should('be.visible');
    cy.get('.btp-loading-indicator__container').should('exist');
    cy.get('btp-ellipsis').should('exist');
  });

  it('Loading indicator can be customised using components created application side', () => {
    cy.visit('#/loading-message');
    cy.get('[data-test-id="cy-trigger-indicator"]').click();
    cy.get('btp-overlay').should('be.visible');
    cy.get('.btp-loading-indicator__container').should('exist');
    cy.get('app-loading-message').should('exist');
  });
});
