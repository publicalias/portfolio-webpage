"use strict";

//node modules

const React = require("react");

const { useEffect } = React;

//meta list

const MetaList = (props) => {

  const { children, local: { heading, refresh, type } } = props;

  //events

  const handleClick = () => {
    refresh();
  };

  //lifecycle

  useEffect(() => {
    refresh(); //async
  }, []);

  //render

  return (
    <div className={`c-notification-list--${type}`}>
      <div className="c-notification-list__head">
        <h3>{heading}</h3>
        <button
          className="c-icon-button qa-refresh-list"
          onClick={handleClick}
        >
          <i className="fas fa-sync" />
        </button>
      </div>
      <hr />
      <div className="c-notification-list__body">
        {children.length ? children : <p>No Notifications</p>}
      </div>
    </div>
  );

};

MetaList.propList = ["children", "local"];

//exports

module.exports = MetaList;
