"use strict";

//global imports

const { select } = require("dom-api");

//node modules

const React = require("react");

//poll title

const PollTitle = (props) => {

  const { actions: { formSetTitle }, data: { user }, local: { poll, role } } = props;

  const { injected: { select } } = PollTitle;

  //events

  const handleBlur = () => {

    const DOMInput = select(".js-ref-input");

    formSetTitle(DOMInput.text());

  };

  const handleInput = () => {

    const DOMPlaceholder = select(".js-hide-placeholder");
    const DOMInput = select(".js-ref-input");

    DOMPlaceholder.class("is-hidden", true, DOMInput.text());

  };

  //render

  const author = role === "form" ? user.name : poll.author;
  const state = poll.title ? "is-hidden" : "";

  const attribution = <h4>{`By ${author || "Anonymous"}`}</h4>;

  switch (role) {
    case "form":
      return (
        <div className="c-poll-display__input-box u-align-center">
          <h3
            className="c-poll-display__input-text js-ref-input u-margin-half"
            contentEditable
            onBlur={handleBlur}
            onInput={handleInput}
            suppressContentEditableWarning
          >
            {poll.title}
          </h3>
          <h3 className={`c-poll-display__input-placeholder ${state} js-hide-placeholder`}>Untitled</h3>
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

PollTitle.injected = { select };

//exports

module.exports = PollTitle;
