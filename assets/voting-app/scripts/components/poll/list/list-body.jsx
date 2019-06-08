"use strict";

//local imports

const ListItem = require("./list-item");

//global imports

const { initKeyGen } = require("react-utils");

//node modules

const React = require("react");

//list body

const ListBody = (props) => {

  const { data: { user, polls } } = props;

  //render

  const keyGen = initKeyGen();

  const auth = user.type === "auth";

  return (
    <div className="c-list-body">
      <div className="c-list-body__scroll-box js-scroll-box">
        <table className="c-list-body__table js-scroll-content">
          <thead>
            <tr>
              <td>
                <h5>Hide</h5>
              </td>
              {auth && (
                <td>
                  <h5>Flag</h5>
                </td>
              )}
              <td>
                <h5>Description</h5>
              </td>
            </tr>
          </thead>
          <tbody>
            {polls.length ? polls.map((e) => (
              <ListItem
                {...props}
                key={keyGen(e.title)}
                poll={e}
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

//exports

module.exports = ListBody;
