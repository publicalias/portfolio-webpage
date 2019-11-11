"use strict";

//local imports

const VenueRSVP = require("../../../../../../../scripts/client/components/main/venue/page/controls/venue-rsvp");

const { newVenue } = require("../../../../../../../schemas");
const { testWrapper } = require("../../../../../test-helpers");

//global imports

const { initTestEvent, initTestSnapshot, testSubmit, withDataList } = require("redux/tests/client-tests");
const { testMock } = require("redux/tests/meta-tests");
const { reactTests } = require("redux/tests/react-tests");

//utilities

const { testShallow } = testWrapper(VenueRSVP);

//setup

beforeAll(reactTests.setup);
beforeEach(reactTests.inject(VenueRSVP));

//venue rsvp

describe("VenueRSVP (default)", () => {

  const testRSVP = withDataList(testShallow, [null, { venue: newVenue() }]);

  const testSnapshot = initTestSnapshot(testRSVP);

  const testClick = initTestEvent(testRSVP, "click");

  it("should match snapshot", () => testSnapshot());

  it("should call handleClickRSVP on click", () => testClick(".qa-toggle-rsvp", [], ["venueSetOpen", [true]]));

});

describe("VenueRSVP (open)", () => {

  const testRSVP = withDataList(testShallow, [{ venues: { page: { form: { open: true } } } }, {
    venue: newVenue({
      id: "id-a",
      name: "Venue A"
    })
  }]);

  const testSnapshot = initTestSnapshot(testRSVP);

  const testChange = (value) => initTestEvent(testRSVP, "change", { target: { value } });

  const testClick = initTestEvent(testRSVP, "click");

  it("should match snapshot", () => testSnapshot());

  it("should call handleChangeMessage on change", () => testChange("Message")(
    ".qa-rsvp-message",
    [],
    ["venueSetMessage", ["Message"]]
  ));

  it("should call handleChangeTime on change", () => testChange("9:00 PM")(
    ".qa-rsvp-time",
    [],
    ["venueSetTime", ["9:00 PM"]]
  ));

  it("should call handleClickCancel on click", () => testClick(".qa-rsvp-cancel", [], ["venueClearForm", []]));

  testSubmit("click", "handleClickSubmit", (res) => {

    const dataList = [{
      venues: {
        page: {
          form: {
            time: "9:00 PM",
            message: "Message"
          }
        }
      }
    }, {
      refresh: jest.fn(),
      venue: {
        id: "id-a",
        name: "Venue A"
      }
    }, {
      actions: { rsvpAdd: jest.fn(() => res) }
    }];

    return testClick(".qa-rsvp-submit", dataList, (props) => {

      const { actions: { rsvpAdd, venueClearForm }, local: { refresh } } = props;

      const call = res && !res.errors ? [] : undefined;

      testMock(rsvpAdd, ["Venue A", "id-a", "9:00 PM", "Message"]);

      testMock(venueClearForm, call);
      testMock(refresh, call);

    });

  });

});
