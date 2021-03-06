"use strict";

//local imports

const UserData = require("../../../../../../scripts/client/components/main/user/page/user-data");

const { newUserData } = require("../../../../../../schemas");
const { testWrapper } = require("../../../../test-helpers");

//global imports

const { placeholder } = require("all/utilities");
const { initTestEvent, initTestSnapshot, withDataList } = require("redux/tests/client-tests");
const { reactTests } = require("redux/tests/react-tests");

//utilities

const { testShallow } = testWrapper(UserData);

//setup

beforeAll(reactTests.setup);
beforeEach(reactTests.inject(UserData, { lib: { delimit: jest.fn((x) => x) } }));

//user data

describe("UserData", () => {

  const avatar = "https://www.example.com/avatar.jpg";

  const testData = withDataList(testShallow, [null, { userData: newUserData({ data: { avatar } }) }]);

  const testSnapshot = initTestSnapshot(testData);

  it("should match snapshot (default)", () => testSnapshot());

  it("should match snapshot (name)", () => testSnapshot(null, { userData: { name: "User A" } }));

  it("should call handleError on error", () => {

    const event = { target: { src: "" } };

    const testError = initTestEvent(testData, "error", event);

    return testError(".qa-error-image", [], () => {
      expect(event.target.src).toEqual(placeholder(800, 450));
    });

  });

});
