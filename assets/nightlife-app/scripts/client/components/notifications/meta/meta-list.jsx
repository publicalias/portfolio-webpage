"use strict";

//node modules

const React = require("react");

const { useEffect } = React;

//meta list

const MetaList = (props) => {

  const { local: { heading, list, refresh, type } } = props;

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
    <div className={`c-note-list--${type}`}>
      <div className="c-note-list__head">
        <h3>{heading}</h3>
        <button
          className="c-note-list__button qa-refresh-list"
          onClick={handleClick}
        >
          <i className="fas fa-sync" />
        </button>
      </div>
      <hr />
      <div className="c-note-list__body">
        {list.length ? list : <p className="u-margin-none">No Notifications</p>}
      </div>
    </div>
  );

};

MetaList.propList = ["local"];

//exports

module.exports = MetaList;
