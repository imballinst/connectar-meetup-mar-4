/// <reference types="Cypress" />

context('Read and write rants', () => {
  before(() => {
    cy.visit('/');
  });

  it('empty test', () => {
    cy.get('ol[aria-label="Rants"] li time').first().its('datetime').eq(1234);
  });
});
