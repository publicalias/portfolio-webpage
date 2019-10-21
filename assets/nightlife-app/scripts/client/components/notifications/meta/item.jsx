"use strict";

//global imports

const { initKeyGen } = require("all/react-utils");
const { readDate } = require("all/utilities");

//node modules

const React = require("react");

//item

const Item = (props) => {

  const { local: { buttons, item, notification, refresh } } = props;

  //render

  const keyGen = initKeyGen();

  return (
    <div className="c-note-item">
      <div className="c-note-item__info">
        {notification}
        <p className="u-margin-none">{readDate(item.date)}</p>
      </div>
      <div className="c-note-item__actions">
        {buttons.map((e) => {

          const handleClick = async () => {

            await e.handler(item.id);

            refresh();

          };

          return (
            <button
              className="c-note-item__button qa-action-item"
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

Item.propList = ["local"];

//exports

module.exports = Item;
