import http from "k6/http";
import { check } from "k6";
import { SharedArray } from "k6/data";

// Parameterization: Load user credentials from external file
const users = new SharedArray("users", function () {
  return JSON.parse(open("./loginUser.json"));
});

export const options = {
  scenarios: {
    constant_rate: {
      executor: "constant-arrival-rate",
      rate: 50, // Requests per second
      timeUnit: "1s",
      duration: "20s", // Test duration
      preAllocatedVUs: 10, // Pre-allocated virtual users
      maxVUs: 100, // Maximum virtual users
    },
  },
  cloud: {
    // Project: Capstone  Project (Software Testing & QA)
    projectID: 3790378,
    // Test runs with the same name groups test runs together.
    name: "ConstantArrivalTime (01/08/2025-12:47:32)",
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
  let res = http.post(
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
