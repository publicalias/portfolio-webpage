"use strict";

/*eslint max-nested-callbacks: 0, max-statements: 0*/

//local imports

const handlers = require("../../../scripts/api/handlers/form-handlers");

//global imports

const { newUser } = require("schemas/auth");
const { newPoll, newState } = require("schemas/voting-app");
const { mockAPICall, mongoTests, testAuthFail } = require("server-tests");
const { newSchema } = require("utilities");

//utilities

const pollsCol = () => db.collection("voting-app/polls");

const mockForm = newSchema(newState().form);

//setup

beforeAll(mongoTests.setup);
afterAll(mongoTests.teardown);

afterEach(mongoTests.reset(pollsCol));

//form create poll

describe("formCreatePoll", () => {

  const { formCreatePoll } = handlers;

  const handler = mockAPICall(formCreatePoll, "POST");

  const getData = (form) => ({ form: mockForm(form) });

  const testError = async (error, data, docs = 0) => {

    const output = await handler(newUser(), getData(data), "json");

    expect(output).toEqual({ errors: [error] });

    expect(await pollsCol().countDocuments()).toEqual(docs);

  };

  it("sends 401 if user is unauthenticated or restricted", async () => {

    await testAuthFail(handler, getData());

    expect(await pollsCol().countDocuments()).toEqual(0);

  });

  it("sends errors if title is empty", () => testError("Title must not be empty"));

  it("sends errors if title is duplicate", async () => {

    const data = { title: "Title A" };

    await pollsCol().insertOne(newPoll(data));

    return testError("Title must be unique", data, 1);

  });

  it("sends errors if title is obscene", () => testError("Title must not be obscene", { title: "Fuck" }));

  it("sends errors if option is empty", () => testError("Option must not be empty", {
    title: "Title A",
    options: [""]
  }));

  it("sends errors if option is duplicate", () => testError("Option must be unique", {
    title: "Title A",
    options: ["Option A", "Option A"]
  }));

  it("sends errors if option is obscene", () => testError("Option must not be obscene", {
    title: "Title A",
    options: ["Fuck"]
  }));

  it("sends id if poll is valid", async () => {

    const output = await handler(newUser(), getData({
      title: "Title A",
      options: ["Option A"]
    }), "json");

    const { id } = await pollsCol().findOne();

    expect(output).toEqual({ id });

    expect(await pollsCol().countDocuments()).toEqual(1);

  });

});
