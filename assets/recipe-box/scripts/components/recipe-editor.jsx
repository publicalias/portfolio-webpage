"use strict";

//local imports

const { cancelSubmit, populateModal } = require("../app-logic");

//global imports

const { toggleModal } = require("all/components/modal");
const { useSetState } = require("all/react-utils");
const { deepCopy } = require("all/utilities");

//node modules

const React = require("react");

//recipe editor

const RecipeEditor = (props) => {

  //state

  const [state, setState] = useSetState(populateModal(props));

  //events

  const handleChange = (event) => {
    setState({
      [event.target.name]: event.target.value
    });
  };

  const handleClose = () => {
    toggleModal();
  };

  const handleSubmit = () => {

    const entry = deepCopy(state);

    for (const p in entry) {
      if (p !== "num") {
        entry[p] = entry[p].split("\n")
          .map((e) => e.trim())
          .filter((e) => e)
          .join("\n");
      }
    }

    if (cancelSubmit(entry, props)) {
      return;
    }

    handleClose();

    props.updateList(entry, props.entry ? "edit" : "add");

  };

  //render

  const { name, com, ingr, inst } = state;

  return (
    <div className="c-modal--show">
      <div className="c-modal--show__shadow js-fade-modal" />
      <div className="c-modal--show__window js-show-modal" >
        <div className="c-content--sm u-inset-modal">
          <h3>{props.entry ? "Change Recipe" : "Add Recipe"}</h3>
          <hr />
          <input
            className="u-margin-full"
            maxLength="100"
            name="name"
            onChange={handleChange}
            placeholder="Recipe"
            value={name}
          />
          <textarea
            className="c-field--xs u-margin-full"
            maxLength="3000"
            name="com"
            onChange={handleChange}
            placeholder="Comments"
            value={com}
          />
          <textarea
            className="c-field--sm u-margin-full"
            maxLength="3000"
            name="ingr"
            onChange={handleChange}
            placeholder="Ingedients"
            value={ingr}
          />
          <textarea
            className="c-field--sm"
            maxLength="3000"
            name="inst"
            onChange={handleChange}
            placeholder="Instructions"
            value={inst}
          />
          <hr />
          <button className="c-modal-btn" onClick={handleClose}>Close</button>
          <button className="c-modal-btn" onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );

};

//exports

module.exports = RecipeEditor;
