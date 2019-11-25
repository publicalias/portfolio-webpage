"use strict";

//local imports

const UserControls = require("./user-controls");

//node modules

const React = require("react");

//user data

const UserData = (props) => {

  const { local: { userData } } = props;

  //events

  const handleError = (event) => {
    event.target.src = "https://via.placeholder.com/800x450?text=undefined";
  };

  //render

  return (
    <div>
      <h1 className="u-align-left">{userData.name || "Anonymous"}</h1>
      <hr />
      <div className="c-user-avatar u-margin-full">
        <img
          alt="User Photo"
          className="c-user-avatar__image qa-error-image"
          onError={handleError}
          src={userData.data.avatar}
        />
      </div>
      <p
        className="u-align-right u-margin-none"
      >
        {`${userData.data.distance} Miles`}
      </p>
    </div>
  );

};

UserData.propList = ["local"];

UserData.injected = UserControls;

//exports

module.exports = UserData;
