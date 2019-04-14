describe(`Loading Indicator`, () => {
  beforeEach(() => {
    cy.visit('#/loading-indicator');
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
});
