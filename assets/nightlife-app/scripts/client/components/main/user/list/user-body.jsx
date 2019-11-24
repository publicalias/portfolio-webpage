"use strict";

//local imports

const MetaListBody = require("../../meta/meta-list-body");
const UserItem = require("./user-item");

//global imports

const { initKeyGen } = require("all/react-utils");

//node modules

const React = require("react");

//user body

const UserBody = (props) => {

  const { data: { users: { data } }, local: { handleScroll } } = props;

  const { jsx: { MetaListBody, UserItem } } = UserBody.injected;

  //render

  const keyGen = initKeyGen();

  const header = (
    <div className="c-list-body__header">
      <h1>Users</h1>
    </div>
  );

  return (
    <MetaListBody
      local={{
        handleScroll,
        header
      }}
    >
      {data.map((e) => (
        <UserItem
          key={keyGen(e.id)}
          local={{ userData: e }}
        />
      ))}
    </MetaListBody>
  );

};

UserBody.propList = ["data.users.data", "local"];

UserBody.injected = {
  jsx: {
    MetaListBody,
    UserItem
  }
};

//exports

module.exports = UserBody;
