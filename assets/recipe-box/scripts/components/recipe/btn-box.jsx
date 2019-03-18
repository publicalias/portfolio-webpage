"use strict";

//global imports

const { initKeyGen } = require("react-utils");

//node modules

const React = require("react");

//btn box

const BtnBox = (props) => {

  const { handleCancel, handleChange, handleDelete, confirm } = props;

  const keyGen = initKeyGen();

  return (
    <div className="c-edit-btns">
      <button className="c-edit-btns__btn" onClick={handleChange}>Change</button>
      {confirm ? [
        <p className="c-edit-btns__text" key={keyGen("confirm")}>Are you sure?</p>,
        <button
          className="c-edit-btns__btn"
          key={keyGen("yes")}
          onClick={handleDelete}
        >
          Yes
        </button>,
        <button
          className="c-edit-btns__btn"
          key={keyGen("no")}
          onClick={handleCancel}
        >
          No
        </button>
      ] : <button className="c-edit-btns__btn" onClick={handleDelete}>Delete</button>}
    </div>
  );

};

//exports

module.exports = BtnBox;
