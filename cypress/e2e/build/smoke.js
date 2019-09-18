"use strict";
/// <reference types="../support/index" />
/// <reference types="cypress" />
/// <reference types="@types/testing-library__cypress" />
describe("app", function () {
    it("should work", function () {
        cy.visit("/")
            .waitForRouteChange()
            .assertRoute("/");
    });
});
