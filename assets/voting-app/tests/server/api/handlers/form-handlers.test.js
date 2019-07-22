"use strict";

//local imports

const handlers = require("../../../../scripts/server/api/handlers/form-handlers");

const { testOptions, testTitle } = require("../../test-helpers");

//global imports

const { testMock } = require("test-helpers/meta-tests");
const { initMockAPICall, mongoTests } = require("test-helpers/server-tests");

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

  const testError = async (error, add, options) => {

    const res = await mockAPICall({}, getData(add, options));

    testMock(res.json, [{ errors: [error] }]);

  };

  testOptions(testError);

  it("sends form if option is valid", async () => {

    const res = await mockAPICall({}, getData("Option A"));

    testMock(res.json, [{
      form: {
        options: ["Option A"],
        add: ""
      }
    }]);

  });

});

//form set title

describe("formSetTitle", () => {

  const { formSetTitle } = handlers;

  const mockAPICall = initMockAPICall(formSetTitle, "GET");

  const getData = (title) => ({ title });

  const testError = async (error, title) => {

    const res = await mockAPICall({}, getData(title));

    testMock(res.json, [{ errors: [error] }]);

  };

  testTitle(testError);

  it("sends form if title is valid", async () => {

    const res = await mockAPICall({}, getData("Title A"));

    testMock(res.json, [{ form: { title: "Title A" } }]);

  });

});
