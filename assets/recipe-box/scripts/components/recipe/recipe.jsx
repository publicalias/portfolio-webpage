"use strict";

//local imports

const BtnBox = require("./btn-box");
const List = require("./list");

//global imports

const { togglePanel } = require("components/accordion");
const { select } = require("dom-api");
const { useSetState } = require("react-utils");

//node modules

const React = require("react");

//recipe

const Recipe = (props) => {

  //state

  const [state, setState] = useSetState({ confirm: false });

  //events

  const handleClick = () => {

    const id = props.entry.num;

    const boxPadding = select(".js-scroll-recipe-box").css().paddingTop;

    togglePanel(id, parseFloat(boxPadding));

  };

  const handleChange = () => {
    props.displayModal(props.entry.num);
  };

  const handleDelete = () => {
    if (state.confirm) {
      props.updateList(props.entry, "remove");
    } else {
      setState({ confirm: true });
    }
  };

  const handleCancel = () => {
    setState({ confirm: false });
  };

  //render

  const entry = props.entry;

  return (
    <div className="c-panel">
      <h3
        className={`c-panel__toggle js-toggle-panel-${entry.num}`}
        onClick={handleClick}
      >
        {`${entry.num + 1}. ${entry.name}`}
      </h3>
      <hr />
      <div className={`c-panel__expand js-expand-panel js-expand-panel-${entry.num}`}>
        <h4 className="u-margin-full">Comments:</h4>
        <p>{entry.com.trim() || "N/A"}</p>
        <hr />
        <List name="Ingredients:" text={entry.ingr} />
        <hr />
        <List name="Instructions:" text={entry.inst} />
        <hr />
        <BtnBox
          confirm={state.confirm}
          handleCancel={handleCancel}
          handleChange={handleChange}
          handleDelete={handleDelete}
        />
        <hr />
      </div>
    </div>
  );

};

//exports

module.exports = Recipe;
