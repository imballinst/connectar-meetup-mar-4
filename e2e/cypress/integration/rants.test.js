/// <reference types="Cypress" />

context('Read and write rants', () => {
  before(() => {
    cy.visit(Cypress.env('E2E_BASE_URL'));
  });

  it('empty test', () => {});
});
