"use strict";

//global imports

const { delimit, placeholder } = require("all/utilities");

//node modules

const React = require("react");

//user data

const UserData = (props) => {

  const { local: { userData } } = props;

  const { lib: { delimit } } = UserData.injected;

  //events

  const handleError = (event) => {
    event.target.src = placeholder(800, 450);
  };

  //render

  const distance = delimit(userData.data.distance);

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
        {`${distance} Miles`}
      </p>
    </div>
  );

};

UserData.propList = ["local"];

UserData.injected = { lib: { delimit } };

//exports

module.exports = UserData;
