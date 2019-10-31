"use strict";

//node modules

const React = require("react");

//poll title

const PollTitle = (props) => {

  const { actions: { formSetTitle, formCheckTitle }, data: { user }, local: { poll, role } } = props;

  //events

  const handleBlur = (event) => {

    const title = event.target.value;

    formSetTitle(title);
    formCheckTitle(title);

  };

  //render

  const author = role === "form" ? user.name : poll.author;

  const attribution = <h4>{`By ${author || "Anonymous"}`}</h4>;

  return role === "form" ? (
    <div className="u-align-center">
      <input
        className="c-poll-display__input qa-title-input u-margin-half js-edit-title"
        maxLength="100"
        onBlur={handleBlur}
        placeholder="Untitled"
      />
      {attribution}
    </div>
  ) : (
    <div className="u-align-center">
      <h1 className="u-margin-half">{poll.title || "Untitled"}</h1>
      {attribution}
    </div>
  );

};

PollTitle.propList = ["data.user", "local"];

//exports

module.exports = PollTitle;
