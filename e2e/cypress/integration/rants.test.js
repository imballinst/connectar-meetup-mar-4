/// <reference types="Cypress" />

context('Read and write rants', () => {
  before(() => {
    cy.visit('/');
  });

  it('Read rant: posts should sort from newest to oldest', () => {
    const times = [];

    cy.get('ol[aria-label="Rants"] li time')
      .each((selector) => {
        times.push(selector.get(0).getAttribute('datetime'));
      })
      .then(() => {
        let olderPost;
        let newerPost;

        for (const time of times) {
          olderPost = time;

          if (newerPost !== undefined) {
            expect(new Date(newerPost).valueOf()).greaterThan(
              new Date(olderPost).valueOf()
            );
          }

          newerPost = time;
        }
      });
  });

  it('Write rant', () => {
    // Write the title.
    cy.get('form[name="submit-rant"] input[name="title"]').type(
      'This is a sample rant'
    );
    cy.get('section[aria-label="Preview post"] span').should(
      'contain.text',
      'This is a sample rant'
    );
    // Should show the current time.
    cy.get('section[aria-label="Preview post"] time').then((selector) => {
      const elmt = selector.get(0);
      console.log(elmt);
      const datetime = elmt.getAttribute('datetime');
      // The difference should be less than 2 seconds--or 2000 milliseconds--for offset.
      expect(
        Math.abs(new Date(datetime).valueOf() - new Date().valueOf())
      ).to.be.lessThan(2000);
    });

    // Write the content.
    cy.get('form[name="submit-rant"] textarea[name="content"]').type(
      "I am a front-end engineer and sometimes I don't know what I am doing."
    );
    cy.get('section[aria-label="Preview post"] p').should(
      'contain.text',
      "I am a front-end engineer and sometimes I don't know what I am doing."
    );
  });
});
