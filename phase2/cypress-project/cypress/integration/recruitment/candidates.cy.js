// Tests for Recruitment: Candidates Module with POM and fixtures
import candidatesPage from "../../pages/candidatePage";
import loginPage from "../../pages/loginPage";

describe("Candidates Module Tests", () => {
  beforeEach(() => {
    //visti the main page
    candidatesPage.visit();

    // put the login credentials and redirect to login page
    cy.fixture("loginData.json").then((data) => {
      const valid = data.find((tc) => tc.id === "TC_Login_01");
      loginPage.enterUsername(valid.username);
      loginPage.enterPassword(valid.password);
      loginPage.submit();

      // vist the candidates section
      candidatesPage.visitCandidatePage();
    });
  });

  it("Add new candidate with valid data", () => {
    cy.fixture("candidatesData.json").then((data) => {
      const candidate = data.find((tc) => tc.id === "TC_Rec_Cand_01");
      candidatesPage.addCandidate(
        candidate.firstName,
        candidate.lastName,
        candidate.email,
        candidate.vacancy,
        candidate.contact
      );

      // Verify candidate appears in list
      candidatesPage.resultsTable.should("contain.text", candidate.firstName);
    });
  });

  it("Mandatory fields validation on add candidate", () => {
    cy.fixture("candidatesData.json").then((data) => {
      const candidate = data.find((tc) => tc.id === "TC_Rec_Cand_02");
      candidatesPage.addCandidate(
        candidate.firstName,
        candidate.lastName,
        candidate.email,
        candidate.vacancy
      );

      // Expect validation errors
      candidatesPage.requiredField.should("contain.text", "Required");
    });
  });

  it.only("Search candidates by job title", () => {
    cy.fixture("candidatesData.json").then((data) => {
      const candidate = data.find((tc) => tc.id === "TC_Rec_Cand_03");
      candidatesPage.searchCandidates(candidate.searchCriteria.jobTitle);

      // Verify results filtered correctly
      candidatesPage.resultsTable2.should(
        "contain.text",
        candidate.searchCriteria.jobTitle
      );
    });
  });

  it("Edit candidate details", () => {
    cy.fixture("candidatesData.json").then((data) => {
      const candidate = data.find((tc) => tc.id === "TC_Rec_Cand_04");
      candidatesPage.editCandidateByEmail(
        candidate.existingCandidate.email,
        candidate.editData.lastName
      );

      candidatesPage.resultsTable.should(
        "contain.text",
        candidate.editData.lastName
      );
    });
  });

  it("Delete candidate", () => {
    cy.fixture("candidatesData.json").then((data) => {
      const candidate = data.find((tc) => tc.id === "TC_Rec_Cand_05");
      candidatesPage.deleteCandidateByEmail(candidate.candidateEmailToDelete);

      // Optionally assert no longer in list, may require refresh or wait
      candidatesPage.resultsTable.should(
        "not.contain.text",
        candidate.candidateEmailToDelete
      );
    });
  });
});
