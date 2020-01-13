"use strict";

//local imports

const { newFormData } = require("../../../../../schemas");

//node modules

const React = require("react");

//form menu

const FormMenu = (props) => {

  const {
    actions: { formClearState, formToggleDelete, formToggleSecret, metaCreatePoll },
    data: { form: { menu, body } },
    history
  } = props;

  //events

  const handleConfirm = () => {
    formToggleDelete();
  };

  const handleCreate = async () => {

    const res = await metaCreatePoll(newFormData(menu, body));

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
      {menu.delete ? (
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
        {menu.secret ? "Private" : "Public"}
      </button>
    </div>
  );

};

FormMenu.propList = ["data.form.menu", "data.form.body"];

//exports

module.exports = FormMenu;
