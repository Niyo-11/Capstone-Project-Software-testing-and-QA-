# OrangeHRM QA & Performance Testing

## Overview

This repository contains the **Phase 2 (Functional & Automation Testing)** and **Phase 3 (Performance Testing)** deliverables for the OrangeHRM Web Application as part of the Software Testing & QA capstone project.

- Functional test automation using **Cypress** with Page Object Model and fixtures.
- Performance testing with **k6**, including user credential parameterization, assertions, and scenarios.
- Integration with **Grafana** for performance metrics visualization.
- Test data and configuration files supporting all test scripts.

## Project Structure

│ ├── integration/ # Cypress test specs for functional tests
│ ├── support/ # Cypress support files & POM classes
│ ├── fixtures/ # Test data JSON files
├── performance-testing/
│ ├── loginUser.json # User credentials for k6 tests
│ ├── login_performance_test.js
│ ├── performance_assertions_test.js
│ ├── grafana_export_test.js
│ ├── status_code_and_response_test.js
├── README.md
└── package.json


## How to Run Functional Tests (Phase 2)

1. Install dependencies:  

npm install


2. Run Cypress tests locally:  

npx cypress open

or to run headlessly:  

npx cypress run


3. Configuration and test data are located in `/cypress/fixtures` and page object models in `/cypress/support`.

## How to Run Performance Tests (Phase 3)

1. Ensure **k6** is installed:  
https://k6.io/docs/getting-started/installation

2. Run the desired performance test script inside the `performance-testing` folder:

Example running login performance test:  

k6 run login_performance_test.js


3. To export metrics to Grafana via InfluxDB:

Start InfluxDB locally and run k6 with:  

k6 run --out influxdb=http://localhost:8086/k6 grafana_export_test.js


4. View detailed dashboards on Grafana (configured separately).

## Key Features and Coverage

- **Functional Testing:** Validations for Recruitment module (candidates, vacancies) with data-driven and reusable logic.
- **Performance Testing:** 
- Parameterized load tests with multiple users.
- Assertions on response times, failure rates, and throughput.
- Scenario-based tests for ramping users up/down.
- Export and visualization with Grafana.
- **Clean project organization** for ease of understanding and maintenance.

## Contact / Support

For questions or issues, please contact:

**Your Name**  
Email: your.email@example.com

## License

This project is open source and available under the MIT License.
