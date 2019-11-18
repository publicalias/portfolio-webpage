"use strict";

//node modules

const React = require("react");

//form menu

const FormMenu = (props) => {

  const {
    actions: { formClearState, formToggleDelete, formToggleSecret, metaCreatePoll },
    data: { form },
    history
  } = props;

  //events

  const handleConfirm = () => {
    formToggleDelete();
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
      <button className="c-form-menu__control-btn qa-click-create" onClick={handleCreate}>Create</button>
      {form.delete ? (
        <div className="c-form-menu__display-box">
          <p className="c-form-menu__confirm-text">Are you sure?</p>
          <button className="c-form-menu__control-btn qa-click-yes" onClick={handleDiscard}>Yes</button>
          <button className="c-form-menu__control-btn qa-click-no" onClick={handleConfirm}>No</button>
        </div>
      ) : <button className="c-form-menu__control-btn qa-click-discard" onClick={handleConfirm}>Discard</button>}
      <button
        className="c-form-menu__button qa-toggle-secret u-flex-right"
        onClick={handleSecret}
      >
        {form.secret ? "Private" : "Public"}
      </button>
    </div>
  );

};

FormMenu.propList = ["data.form"];

//exports

module.exports = FormMenu;
