"use strict";

//global imports

const { initKeyGen } = require("react-utils");

//btn box

const BtnBox = (props) => {

  const keyGen = initKeyGen();

  return (
    <div className="c-edit-btns">
      <button className="c-edit-btns__btn" onClick={props.handleChange}>Change</button>
      {props.confirm ? [
        <p className="c-edit-btns__text" key={keyGen("confirm")}>Are you sure?</p>,
        <button
          className="c-edit-btns__btn"
          key={keyGen("yes")}
          onClick={props.handleDelete}
        >
          Yes
        </button>,
        <button
          className="c-edit-btns__btn"
          key={keyGen("no")}
          onClick={props.handleCancel}
        >
          No
        </button>
      ] : <button className="c-edit-btns__btn" onClick={props.handleDelete}>Delete</button>}
    </div>
  );

};

//exports

module.exports = BtnBox;
