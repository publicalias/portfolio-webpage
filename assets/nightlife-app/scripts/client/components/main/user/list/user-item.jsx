"use strict";

//local imports

const { useLazyLoading } = require("../../../../event-handlers");

//global imports

const { delimit, placeholder } = require("all/utilities");

//node modules

const React = require("react");

const { Link } = require("react-router-dom");

//user item

const UserItem = (props) => {

  const { local: { userData } } = props;

  const { jsx: { Link }, lib: { delimit, useLazyLoading } } = UserItem.injected;

  //events

  const handleError = (event) => {
    event.target.src = placeholder(800, 450);
  };

  //lifecycle

  const visible = useLazyLoading(".js-ref-list", `.js-ref-item-${userData.id}`);

  //render

  const distance = delimit(userData.data.distance);

  return (
    <Link to={`/users/page/${userData.id}`}>
      <div className={`c-list-item js-ref-item-${userData.id}`}>
        <img
          alt="User Photo"
          className="qa-error-image"
          onError={handleError}
          src={visible ? userData.data.avatar : placeholder(800, 450)}
        />
        <div>
          <h5 className="u-margin-half">{userData.name || "Anonymous"}</h5>
          <p className="u-margin-none">{`${distance} Miles`}</p>
        </div>
      </div>
    </Link>
  );

};

UserItem.propList = ["local"];

UserItem.injected = {
  jsx: { Link },
  lib: {
    delimit,
    useLazyLoading
  }
};

//exports

module.exports = UserItem;
