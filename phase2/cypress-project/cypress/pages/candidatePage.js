// Handles Candidates page actions and elements

class CandidatesPage {
  visit() {
    cy.visit(
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
    );
  }

  visitCandidatePage() {
    cy.visit(
      "https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/viewCandidates"
    );
  }

  // get recruitmentPage() {
  //   return cy.get(":nth-child(5) > .oxd-main-menu-item > .oxd-text");
  // }

  // get candidatesSection() {
  //   return cy.get(".--visited > .oxd-topbar-body-nav-tab-item");
  // }

  get addCandidateButton() {
    return cy.get(".orangehrm-header-container > .oxd-button");
  }

  get firstNameInput() {
    return cy.get(
      ".--name-grouped-field > :nth-child(1) > :nth-child(2) > .oxd-input"
    );
  }

  get lastNameInput() {
    return cy.get(
      ".--name-grouped-field > :nth-child(3) > :nth-child(2) > .oxd-input"
    );
  }

  get emailInput() {
    return cy.get(
      ":nth-child(3) > .oxd-grid-3 > :nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-input"
    );
  }

  get vacancyDropdown() {
    return cy.get(".oxd-select-wrapper").eq(0);
  }

  get contactInput() {
    return cy.get(".oxd-select-text");
  }

  get saveButton() {
    return cy.get(".oxd-button--secondary");
  }

  get errorMessages() {
    return cy.get(".validation-error"); // sample selector for validation errors
  }

  get requiredField() {
    return cy.get(".--name-grouped-field > :nth-child(1) > .oxd-text");
  }

  get searchJobTitleInput() {
    return cy.get(
      ":nth-child(1) > .oxd-grid-4 > :nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text"
    );
  }

  get searchButton() {
    return cy.get(".oxd-form-actions > .oxd-button--secondary");
  }

  get resultsTable1() {
    return cy.get(".oxd-layout-context > :nth-child(1) > .oxd-form");
  }

  get resultsTable2() {
    return cy.get(".orangehrm-container");
  }

  addCandidate(firstName, lastName, email, vacancy, contact) {
    this.addCandidateButton.click();
    if (firstName) {
      this.firstNameInput.type(firstName);
    }

    if (lastName) {
      this.lastNameInput.type(lastName);
    }

    if (email) {
      this.emailInput.type(email);
    }

    this.vacancyDropdown.click();
    cy.get(".oxd-select-dropdown > :nth-child(1)").click();

    if (contact) {
      this.contactInput.type(contact);
    }

    this.saveButton.click();
  }

  searchCandidates(jobTitle) {
    this.searchJobTitleInput.eq(0).click();
    cy.get(".oxd-select-dropdown > :nth-child(21)").click();
    this.searchButton.click();
  }

  deleteCandidateByEmail(email) {
    this.resultsTable
      .contains("td", email)
      .parent("tr")
      .find('input[type="checkbox"]')
      .check();
    cy.get("#btnDelete").click();
    cy.get("#dialogDeleteBtn").click(); // confirm delete
  }

  editCandidateByEmail(email, newLastName) {
    this.resultsTable
      .contains("td", email)
      .parent("tr")
      .find("a")
      .first()
      .click();
    this.lastNameInput.clear().type(newLastName);
    this.saveButton.click();
  }
}

export default new CandidatesPage();
