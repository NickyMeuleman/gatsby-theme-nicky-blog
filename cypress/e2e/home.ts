/// <reference types="../support/index" />
/// <reference types="cypress" />
/// <reference types="@types/testing-library__cypress" />

describe(`example`, () => {
  it(`contains keyword`, () => {
    cy.visit(`/`)
      .waitForRouteChange()
      .findAllByText(/nmeuleman/i)
  })
})
