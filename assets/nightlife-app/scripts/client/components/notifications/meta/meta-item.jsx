"use strict";

//global imports

const { initKeyGen } = require("all/react-utils");
const { readDate } = require("all/utilities");

//node modules

const React = require("react");

//meta item

const MetaItem = (props) => {

  const { local: { buttons, item, notification, refresh } } = props;

  //render

  const keyGen = initKeyGen();

  return (
    <div className="c-notification-item">
      <div className="c-notification-item__info">
        {notification}
        <p className="u-margin-none">{readDate(item.date)}</p>
      </div>
      <div className="c-notification-item__actions">
        {buttons.map((e) => {

          const handleClick = async () => {

            await e.handler(item.id);

            refresh();

          };

          return (
            <button
              className="c-icon-button qa-click-item"
              key={keyGen(e.icon)}
              onClick={handleClick}
            >
              <i className={e.icon} />
            </button>
          );

        })}
      </div>
    </div>
  );

};

MetaItem.propList = ["local"];

//exports

module.exports = MetaItem;
