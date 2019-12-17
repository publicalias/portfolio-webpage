"use strict";

//local imports

const MetaPollDisplay = require("../meta/meta-poll-display");

//global imports

const { hash } = require("all/utilities");

//node modules

const React = require("react");

//form poll

const FormPoll = (props) => {

  const { actions: { formCheckTitle, formSetTitle }, data: { user, form } } = props;

  const { jsx: { MetaPollDisplay }, lib: { hash } } = FormPoll.injected;

  //events

  const handleBlur = () => {
    formCheckTitle(form.title);
  };

  const handleChange = (event) => {
    formSetTitle(event.target.value);
  };

  //render

  return (
    <div className="c-meta-poll-display">
      <div className="u-align-center">
        <input
          className="c-meta-poll-display__input qa-ref-title u-margin-half"
          maxLength="100"
          onBlur={handleBlur}
          onChange={handleChange}
          placeholder="Untitled"
          value={form.title}
        />
        <h4>{`By ${user.name || "Anonymous"}`}</h4>
      </div>
      <hr />
      <MetaPollDisplay
        local={{
          counts: form.options.map((e) => Number(hash(e, 1))),
          labels: form.options
        }}
      />
    </div>
  );

};

FormPoll.propList = ["data.user", "data.form"];

FormPoll.injected = {
  jsx: { MetaPollDisplay },
  lib: { hash }
};

//exports

module.exports = FormPoll;
