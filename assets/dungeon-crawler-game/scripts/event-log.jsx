"use strict";

//global imports

const { initKeyGen } = require("react-utils");

//event log

const EventLog = (props) => {

  const keyGen = initKeyGen();

  return (
    <div className="c-event-log js-resize-event-log">
      {props.text.map((e) => <p className="c-event-log__text" key={keyGen(e)}>{e}</p>)}
    </div>
  );

};

//exports

module.exports = EventLog;
