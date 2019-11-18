"use strict";

//node modules

const React = require("react");

//poll title

const PollTitle = (props) => {

  const { actions: { formCheckTitle, formSetTitle }, data: { user, form }, local: { poll, role } } = props;

  //events

  const handleBlur = () => {
    formCheckTitle(form.title);
  };

  const handleChange = (event) => {
    formSetTitle(event.target.value);
  };

  //render

  const author = role === "form" ? user.name : poll.author;

  const attribution = <h4>{`By ${author || "Anonymous"}`}</h4>;

  return role === "form" ? (
    <div className="u-align-center">
      <input
        className="c-poll-display__input qa-ref-title u-margin-half"
        maxLength="100"
        onBlur={handleBlur}
        onChange={handleChange}
        placeholder="Untitled"
        value={form.title}
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

PollTitle.propList = ["data.user", "data.form", "local"];

//exports

module.exports = PollTitle;
