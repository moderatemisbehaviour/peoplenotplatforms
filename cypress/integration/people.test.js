describe.only('Landing on the home page.', function () {
  before(function () {
    cy.visit('/person/create')
    cy.visit('/')
  })

  it('Displays the slogan', function () {
    cy.get('.name').should('have.text', 'Follow people, not platforms')
  })

  it('Displays the logo.', function () {
    cy.get('.Avatar')
  })

  it('Displays a search box.', function () {
    cy.get('.Search input')
  })

  it('Focuses the search box.', function () {
    cy.get('.Search input').focused()
  })

  it.skip("Displays a 'learn more' button in the content area", () => {})
})

describe('Searching for a publisher profile.', function () {
  beforeEach(function () {
    cy.task('createPerson').as('person')
    cy.visit('/')
  })

  it('Displays search results when text is entered into the search input.', function () {
    cy.get('.Search input').type('Si').should('have.value', 'Si')
    cy.get('.SearchResult').should('not.have.length', 0)
  })

  it('Displays no more than 5 results at a time.', function () {
    cy.task('createPerson').as('person')
    cy.task('createPerson').as('person')
    cy.task('createPerson').as('person')
    cy.task('createPerson').as('person')
    cy.task('createPerson').as('person')
    cy.task('createPerson').as('person')
    cy.get('.Search input').type('Si').should('have.value', 'Si')
    cy.get('.SearchResult').should('have.length', 5)
  })

  it('Stops displaying search results when text is cleared from the search input.', function () {
    cy.get('.Search input').type('Si').should('have.value', 'Si')
    cy.get('.Search input').clear().should('have.value', '')
    cy.get('.SearchResult').should('have.length', 0)
  })

  it.skip('Allows the user to select a search result with the keyboard.', function () {
    cy.get('.Search input').type('Si').type('{downarrow}')
    cy.focused().should('have.text', 'Siobhan Wilson')
    cy.get('.SearchResult:first').click() // TODO: Find out how to simulate user pressing {enter}
    cy.location('pathname').should('eq', '/person/1')
  })

  it('Closes the search results when one is selected', function () {
    cy.get('.SearchResults').should('have.length', 0)
  })

  it('Closes the search results when the search input loses focus', function () {

  })
})

describe('Creating a publisher profile.', function () {
  beforeEach(function () {
    cy.visit('/person/create')
  })

  describe('validating URLs', function () {
    it('should disable the input whilst it has an invalid URL', function () {
      cy.get('#the-input').type('Siobhan Wilson')
      cy.get('#next').should('not.have.attr', 'disabled')
      cy.get('#next').click()

      cy.get('#next').should('have.attr', 'disabled')
      cy.get('#the-input').type('invalid URL')
      cy.get('#next').should('have.attr', 'disabled')

      cy.get('#the-input').clear().type('http://example.com')
      cy.get('#next').should('not.have.attr', 'disabled')
    })

    it('should give the input the invalid style', function () {
      cy.get('#the-input').type('Siobhan Wilson').should('not.have.class', 'invalid')
      cy.get('#next').click()

      cy.get('#the-input').should('not.have.class', 'invalid').type('invalid URL').should('have.class', 'invalid')

      cy.get('#the-input').clear().type('http://example.com').should('not.have.class', 'invalid')
    })
  })
})

describe('Viewing a publisher profile.', function () {
  beforeEach(function () {
    cy.task('createPerson').then((person) => {
      cy.visit(`/person/${person._id}`)
      cy.get('.name').should('have.text', 'Siobhan Wilson') // TODO: Come up with a better way to wait for render.
    })
  })

  it("Updates the avatar to show the person's profile photo.", function () {
    // TODO: Decide how we are going to create test fixtures.
  })

  it("Shows links to the publisher's profiles", function () {
    cy.get('.Profile').should('have.length', 3)
    cy.get('.Profile a').first().should('have.attr', 'href').and('eq', 'https://twitter.com/siobhanisback')
    cy.get('.Profile a').eq(1).should('have.attr', 'href').and('eq', 'https://www.youtube.com/user/siobhanwilsonmusic')
    cy.get('.Profile a').eq(2).should('have.attr', 'href').and('eq', 'https://www.facebook.com/siobhanwilsonmusic')
  })

  it("Masks the publisher's photo to create a circular frame", function () {
    cy.get('.Avatar img').should('have.css', 'border-radius').should('equal', '50%')
  })

  it("Displays a 'return home' button at the bottom of the page", function () {
    cy.get('.HomeLink').should('have.length', 1).click()
    cy.location('pathname').should('eq', '/')
  })
})