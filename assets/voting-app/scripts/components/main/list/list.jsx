"use strict";

//local imports

const ListBody = require("./list-body");
const ListMenu = require("./list-menu");

const { getListParams } = require("../../../app-logic");

//node modules

const React = require("react");

const { useEffect } = React;

//list

const List = (props) => {

  const { actions: { listClearState, metaGetPolls }, location } = props;

  //lifecycle

  useEffect(() => {

    const params = getListParams(location);

    listClearState();
    metaGetPolls(params);

  }, [location.search]);

  //render

  return (
    <div className="c-ui__list">
      <ListMenu {...props} />
      <ListBody {...props} />
    </div>
  );

};

//exports

module.exports = List;
