"use strict";
/// <reference types="../support/index" />
/// <reference types="cypress" />
/// <reference types="@types/testing-library__cypress" />
describe("example", function () {
    it("contains keyword", function () {
        cy.visit("/")
            .waitForRouteChange()
            .findAllByText(/nmeuleman/i);
    });
});
