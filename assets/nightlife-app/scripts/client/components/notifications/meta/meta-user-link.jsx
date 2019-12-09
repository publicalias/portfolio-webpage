"use strict";

//node modules

const React = require("react");

const { Link } = require("react-router-dom");

//meta user link

const MetaUserLink = (props) => {

  const { local: { user } } = props;

  const { jsx: { Link } } = MetaUserLink.injected;

  //render

  return (
    <Link to={`/users/page/${user.id}`}>
      <span className="u-underline">
        {user.name || "Anonymous"}
      </span>
    </Link>
  );

};

MetaUserLink.propList = ["local"];

MetaUserLink.injected = { jsx: { Link } };

//exports

module.exports = MetaUserLink;
