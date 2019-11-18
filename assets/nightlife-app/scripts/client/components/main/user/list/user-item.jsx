"use strict";

//node modules

const React = require("react");

const { Link } = require("react-router-dom");

//user item

const UserItem = (props) => {

  const { local: { user } } = props;

  const { jsx: { Link } } = UserItem.injected;

  //events

  const handleError = (event) => {
    event.target.src = "https://via.placeholder.com/100x100?text=undefined";
  };

  //render

  return (
    <Link to={`/users/page/${user.id}`}>
      <div className="c-list-item">
        <img
          alt="User Photo"
          className="qa-error-image"
          onError={handleError}
          src={user.data.avatar}
        />
        <div>
          <h5 className="u-margin-half">{user.name}</h5>
          <p className="u-margin-none">{`${user.data.distance} Miles`}</p>
        </div>
      </div>
    </Link>
  );

};

UserItem.propList = ["local"];

UserItem.injected = { jsx: { Link } };

//exports

module.exports = UserItem;
