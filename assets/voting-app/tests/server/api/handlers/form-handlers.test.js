"use strict";

//local imports

const handlers = require("../../../../scripts/server/api/handlers/form-handlers");

const { testOptions, testTitle } = require("../../test-helpers");

//global imports

const { testMock } = require("redux/tests/meta-tests");
const { initMockAPICall, mongoTests } = require("redux/tests/server-tests");

//utilities

const pollsCol = () => db.collection("voting-app/polls");

//setup

beforeAll(mongoTests.setup);
beforeEach(mongoTests.reset(pollsCol));
afterAll(mongoTests.teardown);

//form add option

describe("formAddOption", () => {

  const { formAddOption } = handlers;

  const mockAPICall = initMockAPICall(formAddOption, "GET");

  const getData = (add, options = []) => ({
    add,
    options
  });

  testOptions(async (error, add, options) => {

    const res = await mockAPICall({}, getData(add, options));

    testMock(res.json, [{ errors: [error] }]);

  });

  it("sends data if successful", async () => {

    const res = await mockAPICall({}, getData("Option A"));

    testMock(res.json, [{
      form: {
        body: {
          options: ["Option A"],
          add: ""
        }
      }
    }]);

  });

});

//form check title

describe("formCheckTitle", () => {

  const { formCheckTitle } = handlers;

  const mockAPICall = initMockAPICall(formCheckTitle, "GET");

  const getData = (title) => ({ title });

  testTitle(async (error, title) => {

    const res = await mockAPICall({}, getData(title));

    testMock(res.json, [{ errors: [error] }]);

  });

  it("sends noop if successful", async () => {

    const res = await mockAPICall({}, getData("Title A"));

    testMock(res.json, [{}]);

  });

});
