"use strict";

//local imports

const ListItem = require("./list-item");

//global imports

const { initKeyGen } = require("all/react-utils");

//node modules

const React = require("react");

//list body

const ListBody = (props) => {

  const { data: { user, polls }, local: { handleScroll } } = props;

  const { jsx: { ListItem } } = ListBody.injected;

  //render

  const keyGen = initKeyGen();

  const auth = user.type === "auth";

  return (
    <div className="c-list-body">
      <div
        className="c-list-body__scroll-view js-infinite-scroll qa-infinite-scroll"
        onScroll={() => {
          handleScroll();
        }}
      >
        <table className="c-list-body__table">
          <thead>
            <tr>
              <td className="c-list-body__col--10">
                <h5>Hide</h5>
              </td>
              {auth && (
                <td className="c-list-body__col--10">
                  <h5>Flag</h5>
                </td>
              )}
              <td className={`c-list-body__col--${auth ? "80" : "90"}`}>
                <h5>Description</h5>
              </td>
            </tr>
          </thead>
          <tbody>
            {polls.length ? polls.map((e) => (
              <ListItem
                {...props}
                key={keyGen(e.title)}
                local={{ poll: e }}
              />
            )) : (
              <tr>
                <td>N/A</td>
                {auth && <td>N/A</td>}
                <td>No Polls</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

};

ListBody.propList = ["data.user", "data.polls", "local"];

ListBody.injected = { jsx: { ListItem } };

//exports

module.exports = ListBody;
