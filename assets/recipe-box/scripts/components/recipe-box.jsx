"use strict";

//local imports

const Recipe = require("./recipe/recipe");

//global imports

const { initKeyGen } = require("react-utils");

//node modules

const React = require("react");

//recipe box

const RecipeBox = (props) => {

  const keyGen = initKeyGen();

  return (
    <div className="c-content--md js-scroll-recipe-box">
      <div className="c-row">
        <div className="c-row__col--12">
          {props.list.length ? props.list.map((e) => (
            <Recipe
              displayModal={props.displayModal}
              entry={e}
              key={keyGen(e.name)}
              updateList={props.updateList}
            />
          )) : (
            <div>
              <h3 key={keyGen("N/A")}>N/A</h3>
              <hr />
            </div>
          )}
        </div>
        <div className="c-row__col--4">
          <button onClick={props.handleAdd}>Add Recipe</button>
        </div>
        <div className="c-row__col--8">
          <h3 className="u-float-right">Recipe <i className="fa fa-archive" /> 2.0</h3>
        </div>
      </div>
    </div>
  );

};

//exports

module.exports = RecipeBox;