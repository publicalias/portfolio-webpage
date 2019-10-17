"use strict";

//node modules

const React = require("react");

const { useEffect } = React;

//list

const List = (props) => {

  const { local: { handler, heading, list, type } } = props;

  //events

  const handleClick = () => {
    handler();
  };

  //lifecycle

  useEffect(() => {
    handler(); //async
  }, []);

  //render

  return (
    <div className={`c-${type}-list`}>
      <div className={`c-${type}-list__head`}>
        <h3>{heading}</h3>
        <button
          className={`c-${type}-list__sync qa-sync-${type}`}
          onClick={handleClick}
        >
          <i className="fas fa-sync" />
        </button>
      </div>
      <hr />
      <div className={`c-${type}-list__body`}>
        {list.length ? list : <p className="u-margin-none">No notifications</p>}
      </div>
    </div>
  );

};

List.propList = ["local"];

//exports

module.exports = List;
