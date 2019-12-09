"use strict";

//global imports

const { initKeyGen } = require("all/react-utils");
const { readDate } = require("all/utilities");

//node modules

const React = require("react");

//meta item

const MetaItem = (props) => {

  const { local: { buttons, item, notification } } = props;

  const { lib: { readDate } } = MetaItem.injected;

  //render

  const keyGen = initKeyGen();

  return (
    <div className="c-notification-item">
      <div className="c-notification-item__info">
        {notification}
        <p className="u-margin-none">{readDate(item.date)}</p>
      </div>
      <div className="c-notification-item__actions">
        {buttons.map(({ handler, icon }) => {

          const handleClick = () => {
            handler(item.id);
          };

          return (
            <button
              className="c-icon-button qa-click-item"
              key={keyGen(icon)}
              onClick={handleClick}
            >
              <i className={icon} />
            </button>
          );

        })}
      </div>
    </div>
  );

};

MetaItem.propList = ["local"];

MetaItem.injected = { lib: { readDate } };

//exports

module.exports = MetaItem;
