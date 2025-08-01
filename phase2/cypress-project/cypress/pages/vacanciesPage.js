// Handles Vacancies page actions and elements

class VacanciesPage {
  visit() {
    cy.visit(
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
    ); // adjust URL accordingly
  }
  visitVacancyPage() {
    cy.visit(
      "https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/viewJobVacancy"
    );
  }
  get addVacancyButton() {
    return cy.get(".orangehrm-header-container > .oxd-button");
  }

  get vacancyName() {
    return cy.get(
      ".oxd-form > :nth-child(1) > :nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-input"
    );
  }

  get jobTitleInput() {
    return cy.get(".oxd-select-text");
  }

  get hiringManagerInput() {
    return cy.get(".oxd-autocomplete-text-input > input");
  }

  get numberOfPositionsInput() {
    return cy.get(
      ".oxd-grid-2 > .oxd-grid-item > .oxd-input-group > :nth-child(2) > .oxd-input"
    );
  }

  get descriptionInput() {
    return cy.get(".oxd-textarea");
  }

  get saveButton() {
    return cy.get(".oxd-button--secondary");
  }

  get errorMessages() {
    return cy.get(
      ":nth-child(3) > :nth-child(1) > .oxd-input-group > .oxd-text"
    );
  }

  get searchJobTitleInput() {
    return cy.get(
      ":nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text"
    );
  }

  get searchButton() {
    return cy.get(".oxd-form-actions > .oxd-button--secondary");
  }

  get resultsTable() {
    return cy.get(".oxd-table-body");
  }

  addVacancy(jobTitle, manager, numberOfPositions, description) {
    this.addVacancyButton.click();
    this.jobTitleInput.type(jobTitle);
    this.hiringManagerInput.type(manager);
    this.numberOfPositionsInput.type(numberOfPositions.toString());
    this.descriptionInput.type(description);
    this.saveButton.click();
  }

  searchVacancies(jobTitle) {
    this.searchJobTitleInput.select(jobTitle);
    this.searchButton.click();
  }

  editVacancyByTitle(title, newNumberOfPositions) {
    this.resultsTable
      .contains("td", title)
      .parent("tr")
      .find("a")
      .first()
      .click();
    this.numberOfPositionsInput.clear().type(newNumberOfPositions.toString());
    this.saveButton.click();
  }

  deleteVacancyByTitle(title) {
    this.resultsTable
      .contains("td", title)
      .parent("tr")
      .find('input[type="checkbox"]')
      .check();
    cy.get("#btnDelete").click();
    cy.get("#dialogDeleteBtn").click(); // confirm delete
  }
}

export default new VacanciesPage();
