import { AfterAll, BeforeAll, Given, Then } from "@cucumber/cucumber";
import assert from "assert";
import request from "supertest";
import { MiArteApp } from "../../../../src/app/MiArteApp";

let _application: MiArteApp;
let _request: request.Request;
let _response: request.Response;

BeforeAll(async () => {
  _application = new MiArteApp();
  await _application.start();
});

AfterAll(async () => {
  await _application.stop();
});

Given("I send a GET request to {string}", async (route: string) => {
  _request = request(_application.httpServer).get(route);
  _response = await _request;

  await wait(200);
});

Given(
  "I send a POST request to {string} with body:",
  async (route: string, body: string) => {
    _request = request(_application.httpServer).post(route).send(body);
    _response = await _request;

    await wait(100);
  }
);

Then("the response status code should be {int}", (code: number) => {
  assert.deepStrictEqual(
    code,
    _response.statusCode,
    `The response status code was ${_response.statusCode}`
  );
});

Then("the response body should be empty", () => {
  assert.deepStrictEqual({}, _response.body);
});

async function wait(milliseconds: number) {
  return setTimeout(() => {}, milliseconds);
}
