"use strict";

//node modules

const React = require("react");

//form menu

const FormMenu = (props) => {

  const { actions: { formClearState, formToggleConfirm, formToggleSecret, metaCreatePoll }, data: { form }, history } = props;

  //events

  const handleCreate = async () => {

    await metaCreatePoll(form);

    history.push("/list?filter=created");

  };

  const handleConfirm = () => {
    formToggleConfirm();
  };

  const handleDiscard = () => {
    formClearState();
  };

  const handleSecret = () => {
    formToggleSecret();
  };

  //render

  return (
    <div className="c-form__menu">
      <button className="c-form__create-btn qa-create-poll" onClick={handleCreate}>Create</button>
      {form.confirm ? (
        <div className="c-form__confirm-box">
          <p className="c-form__confirm-text">Are you sure?</p>
          <button className="c-form__confirm-btn qa-discard-poll" onClick={handleDiscard}>Yes</button>
          <button className="c-form__confirm-btn qa-confirm-false" onClick={handleConfirm}>No</button>
        </div>
      ) : <button className="c-form__confirm-btn qa-confirm-true" onClick={handleConfirm}>Discard</button>}
      <button
        className="c-form__secret-btn qa-toggle-secret"
        onClick={handleSecret}
      >
        {form.secret ? "Private" : "Public"}
      </button>
    </div>
  );

};

//exports

module.exports = FormMenu;
