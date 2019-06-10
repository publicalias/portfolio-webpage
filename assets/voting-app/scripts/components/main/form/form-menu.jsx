"use strict";

//node modules

const React = require("react");

//form menu

const FormMenu = (props) => {

  const { actions: { formClearState, formToggleConfirm, formToggleSecret, metaCreatePoll }, data: { form }, history } = props;

  //events

  const handleConfirm = () => {
    formToggleConfirm();
  };

  const handleCreate = async () => {

    const res = await metaCreatePoll(form);

    if (res && !res.errors) {
      history.push("/list?filter=created");
    }

  };

  const handleDiscard = () => {
    formClearState();
  };

  const handleSecret = () => {
    formToggleSecret();
  };

  //render

  return (
    <div className="c-form-menu">
      <button className="c-form-menu__control-btn qa-create-poll" onClick={handleCreate}>Create</button>
      {form.confirm ? (
        <div className="c-form-menu__display-box">
          <p className="c-form-menu__confirm-text">Are you sure?</p>
          <button className="c-form-menu__control-btn qa-discard-poll" onClick={handleDiscard}>Yes</button>
          <button className="c-form-menu__control-btn qa-confirm-false" onClick={handleConfirm}>No</button>
        </div>
      ) : <button className="c-form-menu__control-btn qa-confirm-true" onClick={handleConfirm}>Discard</button>}
      <button
        className="c-form-menu__toggle-btn qa-toggle-secret u-flex-right"
        onClick={handleSecret}
      >
        {form.secret ? "Private" : "Public"}
      </button>
    </div>
  );

};

//exports

module.exports = FormMenu;
