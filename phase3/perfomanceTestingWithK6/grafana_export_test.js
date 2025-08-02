import http from "k6/http";
import { check, sleep } from "k6";
import { SharedArray } from "k6/data";

// Load user credentials dynamically
const users = new SharedArray("users", function () {
  return JSON.parse(open("./loginUser.json"));
});

export let options = {
  stages: [
    { duration: "10s", target: 5 },
    { duration: "20s", target: 10 },
    { duration: "20s", target: 10 },
    { duration: "10s", target: 0 },
  ],
  thresholds: {
    http_req_duration: ["p(95)<700"],
    http_req_failed: ["rate<0.01"],
  },
  // You can optionally configure cloud integration here
  // cloud: {
  //   projectID: 3790378,
  //   name: "Grafana Export Test",
  // },
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

  let res = http.post(`${BASE_URL}/web/index.php/auth/login`, payload, params);

  check(res, {
    "status is 200": (r) => r.status === 200,
  });

  sleep(1);
}
