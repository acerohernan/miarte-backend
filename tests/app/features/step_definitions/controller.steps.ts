import { AfterAll, BeforeAll, Given, Then } from "@cucumber/cucumber";
import assert from "assert";
import path from "path";
import request from "supertest";
import container from "../../../../src/app/dependency-injection";
import { CONTAINER_TYPES } from "../../../../src/app/dependency-injection/types";
import { MiArteApp } from "../../../../src/app/MiArteApp";
import { EnvironmentArranger } from "../../../Context/Shared/infrastructure/arranger/EnvironmentArranger";

let _application: MiArteApp;
let _environmentArranger: EnvironmentArranger;
let _request: request.Request;
let _response: request.Response;
let _token: string | null = null;

/* Hooks */
BeforeAll(async () => {
  _application = new MiArteApp();

  _environmentArranger = container.get<EnvironmentArranger>(
    CONTAINER_TYPES.EnvironmentArranger
  );

  await _application.start();
  await _environmentArranger.arrange();
});

AfterAll(async () => {
  await _application.stop();
  //await _environmentArranger.close();
});

/* Steps */
Given("I send a GET request to {string}", async (route: string) => {
  _request = request(_application.httpServer).get(route);
  _response = await _request;

  await wait(200);
});

Given(
  "I send an authenticated GET request to {string}",
  async (route: string) => {
    if (!_token)
      throw new Error("You need a token to make an authenticated GET request");

    _request = request(_application.httpServer)
      .get(route)
      .auth(_token, { type: "bearer" });
    _response = await _request;

    await wait(200);
  }
);

Given(
  "I send a POST request to {string} with body:",
  async (route: string, body: string) => {
    _request = request(_application.httpServer)
      .post(route)
      .send(JSON.parse(body));
    _response = await _request;

    await wait(100);
  }
);

Given(
  "I send an authenticated POST request to {string} with body:",
  async (route: string, body: string) => {
    if (!_token)
      throw new Error("You need a token to make an authenticated POST request");

    _request = request(_application.httpServer)
      .post(route)
      .auth(_token, { type: "bearer" })
      .send(JSON.parse(body));
    _response = await _request;

    await wait(100);
  }
);

Given(
  "I send an authenticated POST request to {string} with a valid image",
  async (route: string) => {
    const filePath = path.resolve(
      __dirname,
      "..",
      "file",
      "utils",
      "valid-image.jpg"
    );

    if (!_token)
      throw new Error("You need a token to make an authenticated POST request");

    _request = request(_application.httpServer)
      .post(route)
      .auth(_token, { type: "bearer" })
      .attach("img", filePath);
    _response = await _request;

    await wait(100);
  }
);

Given(
  "I send an authenticated POST request to {string} with an invalid image",
  async (route: string) => {
    const filePath = path.resolve(
      __dirname,
      "..",
      "file",
      "utils",
      "invalid-image.txt"
    );

    if (!_token)
      throw new Error("You need a token to make an authenticated POST request");

    _request = request(_application.httpServer)
      .post(route)
      .auth(_token, { type: "bearer" })
      .attach("img", filePath);
    _response = await _request;

    await wait(100);
  }
);

Given(
  "I send an authenticated PUT request to {string} with body:",
  async (route: string, body: string) => {
    if (!_token)
      throw new Error("You need a token to make an authenticated PUT request");

    _request = request(_application.httpServer)
      .put(route)
      .auth(_token, { type: "bearer" })
      .send(JSON.parse(body));
    _response = await _request;

    await wait(200);
  }
);

Given("I get the access token {string}", (token: string) => {
  _token = token;
});

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

Then("the response body should have an error message", () => {
  if (!_response.body["error"])
    throw new Error(`The response body not have an error message`);
});

Then("the response body should have an access token", () => {
  if (!_response.body["token"])
    throw new Error(`The response body not have an access token`);

  _token = _response.body["token"];
});

Then(
  "the response body should have the property {string}",
  (property: string) => {
    if (!_response.body[property])
      throw new Error(`The response body not have the property ${property}`);
  }
);

/* Steps for Debug */
Then("the response should be visible in the console", () => {
  console.log(_response.status, _request.url, _response.body);
});

async function wait(milliseconds: number) {
  return setTimeout(() => {}, milliseconds);
}
