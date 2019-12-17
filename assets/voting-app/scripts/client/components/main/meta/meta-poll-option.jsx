"use strict";

//node modules

const React = require("react");

//meta poll option

const MetaPollOption = (props) => {

  const { local: { created, fill, handleRemove, handleVote, text, voted } } = props;

  //render

  return (
    <button
      className="c-meta-poll-options__option u-margin-half u-margin-right qa-click-vote"
      onClick={handleVote}
    >
      <div className="c-meta-poll-options__layout">
        {created || voted ? (
          <span
            className="c-meta-poll-options__remove qa-click-remove"
            onClick={handleRemove}
          >
            <i className={voted ? "fas fa-times" : "fas fa-trash-alt"} />
          </span>
        ) : (
          <svg className="c-meta-poll-options__color-box">
            <rect
              className="c-meta-poll-options__color-icon"
              fill={fill}
              height="100%"
              width="100%"
            />
          </svg>
        )}
        <span>{text}</span>
      </div>
    </button>
  );

};

MetaPollOption.propList = ["local"];

//exports

module.exports = MetaPollOption;
