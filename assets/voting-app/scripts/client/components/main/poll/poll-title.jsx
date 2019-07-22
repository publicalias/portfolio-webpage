"use strict";

//node modules

const React = require("react");

//poll title

const PollTitle = (props) => {

  const { actions: { formSetTitle }, data: { user }, local: { poll, role } } = props;

  //events

  const handleBlur = (event) => {
    formSetTitle(event.target.value);
  };

  //render

  const author = role === "form" ? user.name : poll.author;

  const attribution = <h4>{`By ${author || "Anonymous"}`}</h4>;

  return role === "form" ? (
    <div className="u-align-center">
      <input
        className="c-poll-display__input qa-title-input u-margin-half"
        maxLength="100"
        onBlur={handleBlur}
        placeholder="Untitled"
      />
      {attribution}
    </div>
  ) : (
    <div className="u-align-center">
      <h3 className="u-margin-half">{poll.title || "Untitled"}</h3>
      {attribution}
    </div>
  );

};

//exports

module.exports = PollTitle;
