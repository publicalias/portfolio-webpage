"use strict";

//local imports

const MetaPollInput = require("../meta/meta-poll-input");
const MetaPollOption = require("../meta/meta-poll-option");

const { chartColor } = require("../../../view-logic");

//global imports

const { initKeyGen } = require("all/react-utils");

//node modules

const React = require("react");

//form options

const FormOptions = (props) => {

  const { actions: { formAddOption, formRemoveOption, formSetAdd }, data: { form: { body } } } = props;

  const { jsx: { MetaPollInput, MetaPollOption }, lib: { chartColor } } = FormOptions.injected;

  //events

  const handleChange = (event) => {
    formSetAdd(event.target.value);
  };

  const handleRemove = (text) => () => {
    formRemoveOption(text);
  };

  const handleSubmit = () => {
    formAddOption(body.add, body.options);
  };

  const handleVote = () => {}; //required

  //render

  const keyGen = initKeyGen();

  const hasOptions = body.options.length > 0;

  return (
    <div className="c-meta-poll-options">
      {hasOptions && (
        <div className="u-margin-half">
          {body.options.map((e, i) => (
            <MetaPollOption
              key={keyGen(e)}
              local={{
                created: true,
                fill: chartColor(i, body.options),
                handleRemove: handleRemove(e),
                handleVote,
                text: e,
                voted: false
              }}
            />
          ))}
        </div>
      )}
      <MetaPollInput
        local={{
          handleChange,
          handleSubmit,
          value: body.add
        }}
      />
    </div>
  );

};

FormOptions.propList = ["data.form.body"];

FormOptions.injected = {
  jsx: {
    MetaPollInput,
    MetaPollOption
  },
  lib: { chartColor }
};

//exports

module.exports = FormOptions;
