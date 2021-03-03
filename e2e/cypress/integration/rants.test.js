/// <reference types="Cypress" />

import { parse, differenceInDays } from 'date-fns';

context('Read and write rants', () => {
  before(() => {
    cy.visit('/');
  });

  it('Read rant: posts should sort from newest to oldest', () => {
    const times = [];
    const timesText = [];

    cy.get('ol[aria-label="Rants"] li time')
      .each((selector) => {
        times.push(selector.get(0).getAttribute('datetime'));
        timesText.push(selector.get(0).textContent);
      })
      .then(() => {
        let olderPost;
        let newerPost;

        for (let i = 0, length = times.length; i < length; i += 1) {
          const time = times[i];
          const timeText = timesText[i];

          olderPost = time;
          const parsed = parse(timeText, 'MMMM dd, yyyy HH:mm', new Date());

          expect(isNaN(parsed)).to.eq(false);

          if (newerPost !== undefined) {
            expect(new Date(newerPost).valueOf()).gte(
              new Date(olderPost).valueOf()
            );
          }

          newerPost = time;
        }
      });
  });

  it('Write rant: normal', () => {
    const TITLE = 'This is a sample rant';
    const CONTENT =
      "I am a front-end engineer and sometimes I don't know what I am doing.";

    // Write the title.
    cy.get('form[name="submit-rant"] input[name="title"]').type(TITLE);
    cy.get('section[aria-label="Preview post"] span').should(
      'contain.text',
      TITLE
    );

    // Should show the current time.
    cy.get('section[aria-label="Preview post"] time').then((selector) => {
      const elmt = selector.get(0);

      const datetime = elmt.getAttribute('datetime');
      // The difference should be less than 2 seconds--or 2000 milliseconds--for offset.
      expect(
        Math.abs(new Date(datetime).valueOf() - new Date().valueOf())
      ).to.be.lessThan(2000);
    });

    // Write the content.
    cy.get('form[name="submit-rant"] textarea[name="content"]').type(CONTENT);
    cy.get('section[aria-label="Preview post"] p').should(
      'contain.text',
      CONTENT
    );

    // Submit the content.
    cy.get('form[name="submit-rant"] button').contains('Post').click();

    // Re-check the form and previews: should be emptied.
    cy.get('form[name="submit-rant"] input[name="title"]').should(
      'have.value',
      ''
    );
    cy.get('section[aria-label="Preview post"] span').should(
      'contain.text',
      ''
    );

    cy.get('form[name="submit-rant"] textarea[name="content"]').should(
      'have.value',
      ''
    );
    cy.get('section[aria-label="Preview post"] p').should('contain.text', '');

    // The posted rant should be the first entry of the list.
    cy.get('ol[aria-label="Rants"] li:first-child span').should(
      'have.text',
      TITLE
    );

    cy.get('ol[aria-label="Rants"] li:first-child p').should(
      'have.text',
      CONTENT
    );
  });

  it('Write rant: post contents longer than 280 characters should be cut to 280 characters with ellipsis', () => {
    const TITLE = 'This is a really long rant';
    // This is `a` 290 times.
    const CONTENT = Array.from(new Array(290), () => 'a').join('');
    const EXPECTED_RESULT = `${CONTENT.slice(0, 280)}...`;

    // Write the title.
    cy.get('form[name="submit-rant"] input[name="title"]').type(TITLE);
    cy.get('section[aria-label="Preview post"] span').should(
      'contain.text',
      TITLE
    );

    // Should show the current time.
    cy.get('section[aria-label="Preview post"] time').then((selector) => {
      const elmt = selector.get(0);

      const datetime = elmt.getAttribute('datetime');
      // The difference should be less than 2 seconds--or 2000 milliseconds--for offset.
      expect(
        Math.abs(new Date(datetime).valueOf() - new Date().valueOf())
      ).to.be.lessThan(2000);
    });

    // Write the content.
    cy.get('form[name="submit-rant"] textarea[name="content"]').type(CONTENT);
    cy.get('section[aria-label="Preview post"] p').should(
      'contain.text',
      EXPECTED_RESULT
    );

    // Submit the content.
    cy.get('form[name="submit-rant"] button').contains('Post').click();

    // Re-check the form and previews: should be emptied.
    cy.get('form[name="submit-rant"] input[name="title"]').should(
      'have.value',
      ''
    );
    cy.get('section[aria-label="Preview post"] span').should(
      'contain.text',
      ''
    );

    cy.get('form[name="submit-rant"] textarea[name="content"]').should(
      'have.value',
      ''
    );
    cy.get('section[aria-label="Preview post"] p').should('contain.text', '');

    // The posted rant should be the first entry of the list.
    cy.get('ol[aria-label="Rants"] li:first-child span').should(
      'have.text',
      TITLE
    );

    cy.get('ol[aria-label="Rants"] li:first-child p').should(
      'have.text',
      EXPECTED_RESULT
    );
  });

  it('should re-fetch when the window re-focused after blurring', () => {
    let latestTitle;

    cy.get('ol[aria-label="Rants"] li:first-child span')
      .then((el) => {
        latestTitle = el.text();
      })
      .then(() => wait(6000))
      .then(() => {
        cy.window().blur();
        cy.window().focus();
      })
      .then(() => wait(1000))
      .then(() => cy.get('ol[aria-label="Rants"] li:first-child span'))
      .then((el) => {
        expect(el.text()).to.not.eq(latestTitle);
      });
  });
});

function wait(durationMs) {
  // return a promise that resolves after 1 second
  return new Cypress.Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, durationMs);
  });
}
