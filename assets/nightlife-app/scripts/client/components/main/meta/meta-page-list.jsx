"use strict";

//global imports

const { initKeyGen } = require("all/react-utils");

//node modules

const React = require("react");

const { Link } = require("react-router-dom");

//meta page list

const MetaPageList = (props) => {

  const { local: { heading, list } } = props;

  const { jsx: { Link } } = MetaPageList.injected;

  //render

  const keyGen = initKeyGen();

  return (
    <div className="c-page-list">
      <h3>{heading}</h3>
      <hr />
      <div className="c-page-list__body">
        {list.length ? list.map(([name, id, link]) => (
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
