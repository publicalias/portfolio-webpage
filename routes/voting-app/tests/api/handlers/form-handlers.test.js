"use strict";

/*eslint max-nested-callbacks: 0, max-statements: 0*/

//local imports

const handlers = require("../../../scripts/api/handlers/form-handlers");

const { mockList, mockPoll } = require("../../test-helpers");

//global imports

const { mockData, mockUser } = require("test-helpers/mocks");
const { mockAPICall, mongoSetup, mongoTeardown } = require("test-helpers/server-tests");

//utilities

const pollsCol = () => db.collection("voting-app/polls");

const mockForm = mockData({
  title: "",
  options: [],
  add: "",
  private: false,
  confirm: false
});

//setup

beforeAll(mongoSetup);
afterAll(mongoTeardown);

afterEach(async () => {
  await pollsCol().deleteMany({});
});

//form create poll

describe("formCreatePoll", () => {

  const { formCreatePoll } = handlers;

  const handler = mockAPICall(formCreatePoll, "POST");

  const getData = (form) => ({
    list: mockList(),
    form: mockForm(form)
  });

  it("sends 401 if user is unauthenticated", async () => {

    expect(await handler({}, getData(), "sendStatus")).toEqual(401);

    expect(await pollsCol().countDocuments()).toEqual(0);

  });

  it("sends 401 if user is restricted", async () => {

    const user = mockUser({ data: { restricted: true } });

    expect(await handler(user, getData(), "sendStatus")).toEqual(401);

    expect(await pollsCol().countDocuments()).toEqual(0);

  });

  it("sends errors if title is empty", async () => {

    const json = { errors: ["Title must not be empty"] };

    expect(await handler(mockUser(), getData(), "json")).toEqual(json);

    expect(await pollsCol().countDocuments()).toEqual(0);

  });

  it("sends errors if title is duplicate", async () => {

    await pollsCol().insertOne(mockPoll({ title: "Title A" }));

    const data = getData({ title: "Title A" });
    const json = { errors: ["Title must be unique"] };

    expect(await handler(mockUser(), data, "json")).toEqual(json);

    expect(await pollsCol().countDocuments()).toEqual(1);

  });

  it("sends errors if title is obscene", async () => {

    const data = getData({ title: "Fuck" });
    const json = { errors: ["Title must not be obscene"] };

    expect(await handler(mockUser(), data, "json")).toEqual(json);

    expect(await pollsCol().countDocuments()).toEqual(0);

  });

  it("sends errors if option is empty", async () => {

    const data = getData({
      title: "Title A",
      options: [""]
    });
    const json = { errors: ["Option must not be empty"] };

    expect(await handler(mockUser(), data, "json")).toEqual(json);

    expect(await pollsCol().countDocuments()).toEqual(0);

  });

  it("sends errors if option is duplicate", async () => {

    const data = getData({
      title: "Title A",
      options: ["Option A", "Option A"]
    });
    const json = { errors: ["Option must be unique"] };

    expect(await handler(mockUser(), data, "json")).toEqual(json);

    expect(await pollsCol().countDocuments()).toEqual(0);

  });

  it("sends errors if option is obscene", async () => {

    const data = getData({
      title: "Title A",
      options: ["Fuck"]
    });
    const json = { errors: ["Option must not be obscene"] };

    expect(await handler(mockUser(), data, "json")).toEqual(json);

    expect(await pollsCol().countDocuments()).toEqual(0);

  });

  it("sends polls and id if poll is valid", async () => {

    const data = getData({
      title: "Title A",
      options: ["Option A"]
    });

    const output = await handler(mockUser(), data, "json");

    const { polls: [{ _id, id, date }] } = output;

    expect(output).toEqual({
      polls: [Object.assign({ _id }, mockPoll({
        title: data.form.title,
        id,
        date,
        options: data.form.options.map((e) => ({ text: e }))
      }))],
      poll: id
    });

    expect(await pollsCol().countDocuments()).toEqual(1);

  });

});
