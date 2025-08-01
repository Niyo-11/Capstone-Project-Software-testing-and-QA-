import http from "k6/http";
import { check } from "k6";
import { SharedArray } from "k6/data";

// Parameterization: Load user credentials from external file
const users = new SharedArray("users", function () {
  return JSON.parse(open("./loginUser.json"));
});

export const options = {
  scenarios: {
    ramping: {
      executor: "ramping-arrival-rate",
      startRate: 10,
      timeUnit: "1s",
      stages: [
        { target: 100, duration: "20s" }, // Ramp up to 100 RPS over 20 seconds
        { target: 100, duration: "30s" }, // Stay at 100 RPS for 30 seconds
        { target: 20, duration: "20s" }, // Ramp down to 20 RPS over 20 seconds
      ],
      preAllocatedVUs: 50,
      maxVUs: 200,
    },
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
    // "login success flag present": (r) => r.body && !r.body.includes("Invalid"),
  });

  sleep(1); // Simulating think-time between logins
}
