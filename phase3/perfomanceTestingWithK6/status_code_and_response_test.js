import http from "k6/http";
import { check, group, sleep } from "k6";

export let options = {
  vus: 5,
  duration: "30s",
  thresholds: {
    http_req_failed: ["rate<0.01"],
  },
};

const BASE_URL = "https://opensource-demo.orangehrmlive.com";

const validUser = { username: "user1", password: "pass1" };
const invalidUser = { username: "userX", password: "passX" };

export default function () {
  group("Valid Login Test", () => {
    const payload = JSON.stringify(validUser);
    const params = { headers: { "Content-Type": "application/json" } };

    let res = http.post(`${BASE_URL}/web/index.php/auth/login`, payload, params);

    check(res, {
      "status is 200": (r) => r.status === 200,
      "response contains success": (r) => r.body && !r.body.includes("Invalid"),
      "content-type json": (r) => r.headers["Content-Type"] && r.headers["Content-Type"].includes("application/json"),
    });
  });

  group("Invalid Login Test", () => {
    const payload = JSON.stringify(invalidUser);
    const params = { headers: { "Content-Type": "application/json" } };

    let res = http.post(`${BASE_URL}/web/index.php/auth/login`, payload, params);

    check(res, {
      "status is 401": (r) => r.status === 401,
      "response contains Unauthorized": (r) => r.body && r.body.includes("Unauthorized"),
    });
  });

  sleep(1);
}
