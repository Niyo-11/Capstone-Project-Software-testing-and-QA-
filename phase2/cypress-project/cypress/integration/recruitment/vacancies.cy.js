// Tests for Recruitment: Vacancies Module with POM and fixtures
import VacanciesPage from "../../pages/vacanciesPage";
import loginPage from "../../pages/loginPage";

describe("Vacancies Module Tests", () => {
  beforeEach(() => {
    //visti the main page
    VacanciesPage.visit();

    // put the login credentials and redirect to login page
    cy.fixture("loginData.json").then((data) => {
      const valid = data.find((tc) => tc.id === "TC_Login_01");
      loginPage.enterUsername(valid.username);
      loginPage.enterPassword(valid.password);
      loginPage.submit();

      // vist the candidates section
      VacanciesPage.visitVacancyPage();
    });
  });

  it("Add new vacancy with valid data", () => {
    cy.fixture("vacanciesData.json").then((data) => {
      const vacancy = data.find((tc) => tc.id === "TC_Rec_Vac_01");
      VacanciesPage.addVacancy(
        vacancy.jobTitle,
        vacancy.hiringManager,
        vacancy.numberOfPositions,
        vacancy.description
      );

      VacanciesPage.resultsTable.should("contain.text", vacancy.jobTitle);
    });
  });

  it("Mandatory fields validation on add vacancy", () => {
    cy.fixture("vacanciesData.json").then((data) => {
      const vacancy = data.find((tc) => tc.id === "TC_Rec_Vac_02");
      VacanciesPage.addVacancy(
        vacancy.jobTitle,
        vacancy.hiringManager,
        vacancy.numberOfPositions || "",
        vacancy.description
      );

      VacanciesPage.errorMessages.should("exist");
    });
  });

  it("Search vacancies by job title", () => {
    cy.fixture("vacanciesData.json").then((data) => {
      const vacancy = data.find((tc) => tc.id === "TC_Rec_Vac_03");
      VacanciesPage.searchVacancies(vacancy.searchCriteria.jobTitle);

      VacanciesPage.resultsTable.should(
        "contain.text",
        vacancy.searchCriteria.jobTitle
      );
    });
  });

  it("Edit vacancy details", () => {
    cy.fixture("vacanciesData.json").then((data) => {
      const vacancy = data.find((tc) => tc.id === "TC_Rec_Vac_04");
      VacanciesPage.editVacancyByTitle(
        vacancy.existingVacancyTitle,
        vacancy.editData.numberOfPositions
      );

      VacanciesPage.resultsTable.should(
        "contain.text",
        vacancy.editData.numberOfPositions.toString()
      );
    });
  });

  it("Delete vacancy", () => {
    cy.fixture("vacanciesData.json").then((data) => {
      const vacancy = data.find((tc) => tc.id === "TC_Rec_Vac_05");
      VacanciesPage.deleteVacancyByTitle(vacancy.vacancyTitleToDelete);
      VacanciesPage.resultsTable.should(
        "not.contain.text",
        vacancy.vacancyTitleToDelete
      );
    });
  });
});
