"use strict";

//local imports

const ListItem = require("./list-item");

const { getListParams } = require("../../../app-logic");

//global imports

const { initKeyGen } = require("all/react-utils");

//node modules

const React = require("react");

//list body

const ListBody = (props) => {

  const { data: { user, polls }, local: { handleScroll }, location } = props;

  const { jsx: { ListItem } } = ListBody.injected;

  //render

  const keyGen = initKeyGen();

  const header = ((params, data) => data[params.filter])(getListParams(location), {
    all: "All Polls",
    created: "My Polls",
    voted: "Voted",
    hidden: "Hidden"
  });

  const auth = user.type === "auth";

  return (
    <div className="c-list-body">
      <h1>{header}</h1>
      <hr />
      <div className="c-list-body__head u-margin-full">
        <h4>Hide</h4>
        {auth && <h4>Flag</h4>}
        <h4 className="u-grid-span-2">Description</h4>
      </div>
      <div
        className="c-list-body__body js-ref-scroll qa-ref-scroll"
        onScroll={handleScroll}
      >
        <div className="c-list-body__content">
          {polls.length ? polls.map((e) => (
            <ListItem
              {...props}
              key={keyGen(e.title)}
              local={{ poll: e }}
            />
          )) : (
            <div className="c-list-item">
              <p>N/A</p>
              {auth && <p>N/A</p>}
              <p>No Polls</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

};

ListBody.propList = ["data.user", "data.polls", "local", "location"];

ListBody.injected = { jsx: { ListItem } };

//exports

module.exports = ListBody;
