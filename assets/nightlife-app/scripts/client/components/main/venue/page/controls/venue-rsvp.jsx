"use strict";

//node modules

const React = require("react");

//venue rsvp

const VenueRSVP = (props) => {

  const {
    actions: { rsvpAdd, venueClearForm, venueSetMessage, venueSetOpen, venueSetTime },
    data: { venues: { page: { form } } },
    local: { refresh, venue }
  } = props;

  //events

  const handleChangeMessage = (event) => {
    venueSetMessage(event.target.value);
  };

  const handleChangeTime = (event) => {
    venueSetTime(event.target.value);
  };

  const handleClickCancel = () => {
    venueClearForm();
  };

  const handleClickRSVP = () => {
    venueSetOpen(true);
  };

  const handleClickSubmit = async () => {

    const res = await rsvpAdd(venue.name, venue.id, form.time, form.message);

    if (res && !res.errors) {
      venueClearForm();
      refresh();
    }

  };

  //render

  return (
    <React.Fragment>
      <button className="qa-toggle-rsvp" onClick={handleClickRSVP}>Add RSVP</button>
      {form.open && (
        <div className="c-venue-form">
          <input
            className="c-venue-form__time qa-change-time"
            maxLength="100"
            onChange={handleChangeTime}
            placeholder="Time (e.g. 9:00 PM)"
            value={form.time}
          />
          <input
            className="c-venue-form__message qa-change-message"
            maxLength="100"
            onChange={handleChangeMessage}
            placeholder="Message"
            value={form.message}
          />
          <button
            className="c-venue-form__submit qa-click-submit"
            onClick={handleClickSubmit}
          >
            Submit
          </button>
          <button
            className="c-venue-form__cancel qa-click-cancel"
            onClick={handleClickCancel}
          >
            Cancel
          </button>
        </div>
      )}
    </React.Fragment>
  );

};

VenueRSVP.propList = ["data.venues.page.form", "local"];

//exports

module.exports = VenueRSVP;
