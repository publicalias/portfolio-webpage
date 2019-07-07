"use strict";

//node modules

const React = require("react");

//poll title

const PollTitle = (props) => {

  const { actions: { formSetTitle }, data: { user }, local: { poll, role } } = props;

  //events

  const handleChange = (event) => {
    formSetTitle(event.target.value);
  };

  //render

  const author = role === "form" ? user.name : poll.author;

  const attribution = <h4>{`By ${author || "Anonymous"}`}</h4>;

  switch (role) {
    case "form":
      return (
        <div className="u-align-center">
          <input
            className="c-poll-display__input qa-title-input u-margin-half"
            maxLength="100"
            onChange={handleChange}
            placeholder="Untitled"
            value={poll.title}
          />
          {attribution}
        </div>
      );
    case "view":
      return (
        <div className="u-align-center">
          <h3 className="u-margin-half">{poll.title || "Untitled"}</h3>
          {attribution}
        </div>
      );
    default:
      return null;
  }

};

//exports

module.exports = PollTitle;
