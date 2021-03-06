"use strict";

//global imports

const { initKeyGen } = require("all/react-utils");

//node modules

const React = require("react");

const { Link } = require("react-router-dom");

//meta page list

const MetaPageList = (props) => {

  const { local: { heading, list, type } } = props;

  const { jsx: { Link } } = MetaPageList.injected;

  //utilities

  const mapUser = ({ user: { name, id } }) => [name || "Anonymous", id, `/users/page/${id}`];
  const mapVenue = ({ venue: { name, id } }) => [name || "Undefined", id, `/venues/page/${id}`];

  const mapFn = type === "user" ? mapUser : mapVenue;

  //render

  const keyGen = initKeyGen();

  return (
    <div className="c-page-list">
      <h3>{heading}</h3>
      <hr />
      <div className="c-page-list__body">
        {list.length ? list.map(mapFn).map(([name, id, link]) => (
          <p
            className="c-page-list__item"
            key={keyGen(id)}
          >
            <Link to={link}>{name}</Link>
          </p>
        )) : <p>No Data</p>}
      </div>
    </div>
  );

};

MetaPageList.propList = ["local"];

MetaPageList.injected = { jsx: { Link } };

//exports

module.exports = MetaPageList;
