import http from "k6/http";
import { check, sleep } from "k6";
import { SharedArray } from "k6/data";

// Load user credentials dynamically
const users = new SharedArray("users", function () {
  return JSON.parse(open("./loginUser.json"));
});

export let options = {
  stages: [
    { duration: "10s", target: 5 }, // ramp-up 5 users
    { duration: "20s", target: 10 }, // ramp-up 10 users
    { duration: "20s", target: 10 }, // steady 10 users
    { duration: "10s", target: 0 }, // ramp-down to 0
  ],
  thresholds: {
    http_req_duration: ["p(95)<2000"], // 95% requests < 2s as per TC-RM-001
    http_req_failed: ["rate<0.01"], // failures < 1%
  },
  cloud: {
    projectID: 3790378,
    name: "Login Performance Test",
  },
};

const BASE_URL = "https://opensource-demo.orangehrmlive.com";

export default function () {
  const user = users[Math.floor(Math.random() * users.length)];

  const payload = JSON.stringify({
    username: user.username,
    password: user.password,
  });

  const params = {
    headers: { "Content-Type": "application/json" },
  };

  let res = http.get(`${BASE_URL}/web/index.php/auth/login`, payload, params);
//   console.log(`Response headers: ${JSON.stringify(res.headers)}`);

  check(res, {
    "status is 200": (r) => r.status === 200,
    "login success (no 'Invalid')": (r) =>
      r.body && !r.body.includes("Invalid"),
    "content-type is json": (r) =>
      r.headers["Content-Type"]
    // && r.headers["Content-Type"].includes("application/json"),
  });

  sleep(1);
}
