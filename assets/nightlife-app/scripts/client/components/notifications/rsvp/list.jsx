"use strict";

//local imports

const Item = require("./item");

//global imports

const { initKeyGen } = require("all/react-utils");

//node modules

const React = require("react");

const { useEffect } = React;

//list

const List = (props) => {

  const { actions: { rsvpGetList }, data: { notifications: { rsvps } } } = props;

  const { jsx: { Item } } = List.injected;

  //events

  const handleClick = () => {
    rsvpGetList();
  };

  //lifecycle

  useEffect(() => {
    rsvpGetList(); //async
  }, []);

  //render

  const keyGen = initKeyGen();

  return (
    <div className="c-rsvp-list">
      <div className="c-rsvp-list__head">
        <h3>RSVPs</h3>
        <button
          className="c-rsvp-list__sync qa-sync-rsvp"
          onClick={handleClick}
        >
          <i className="fas fa-sync" />
        </button>
      </div>
      <hr />
      <div className="c-rsvp-list__body">
        {rsvps.length ? rsvps.map((e) => (
          <Item
            {...props}
            key={keyGen(e.id)}
            local={{ rsvp: e }}
          />
        )) : <p className="u-margin-none">No notifications</p>}
      </div>
    </div>
  );

};

List.propList = ["data.notifications.rsvps"];

List.injected = { jsx: { Item } };

//exports

module.exports = List;
