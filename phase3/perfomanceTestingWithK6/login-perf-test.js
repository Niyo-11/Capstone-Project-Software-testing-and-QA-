import http from "k6/http";
import { check, sleep } from "k6";
import { SharedArray } from "k6/data";

// Parameterization: Load user credentials from external file
const users = new SharedArray("users", function () {
  return JSON.parse(open("./loginUser.json"));
});

// k6 options: stages define ramp-up, steady, ramp-down loads
export let options = {
  stages: [
    { duration: "10s", target: 5 },
    { duration: "20s", target: 10 },
    { duration: "20s", target: 10 },
    { duration: "10s", target: 0 },
  ],
  thresholds: {
    http_req_duration: ["p(95)<700"], // 95% of requests < 700ms
    http_req_failed: ["rate<0.01"], // errors < 1%
  },
  cloud: {
    // Project: Capstone  Project (Software Testing & QA)
    projectID: 3790378,
    // Test runs with the same name groups test runs together.
    name: "Test (01/08/2025-12:57:00)",
  },
};

const BASE_URL = "https://opensource-demo.orangehrmlive.com";
export default function () {
  // Pick a random user for each iteration
  const user = users[Math.floor(Math.random() * users.length)];

  // login POST body and headers;
  const payload = {
    username: user.username,
    password: user.password,
  };
  const headers = { "Content-Type": "application/json" };
  // Update endpoint path if your login endpoint differs
  let res = http.get(
    `${BASE_URL}/web/index.php/auth/login`,
    JSON.stringify(payload),
    { headers }
  );

  // Assertions/checks: status, content, errors
  check(res, {
    "response code is 200": (r) => r.status === 200,
    "login success flag present": (r) => r.body && !r.body.includes("Invalid"),
  });

  sleep(1); // Simulating think-time between logins
}
