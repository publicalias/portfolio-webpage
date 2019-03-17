"use strict";

//global imports

const { initKeyGen } = require("react-utils");

//node modules

const React = require("react");

//control

const Control = (props) => {

  const keyGen = initKeyGen();

  return (
    <div className="c-control js-resize-control">
      {props.display.map((e) => <p className="c-control__text" key={keyGen(e)}>{e}</p>)}
      {props.control.map((e) => {

        const { setType, jsID, content: [a, b] } = e;

        const [{ fn: handleEventA }, { fn: handleEventB } = {}] = [a, b];

        const flex = (e) => e.flex || "u-flex-1";

        switch (setType) {
          case "button":
            return (
              <div className="c-control__btn-set" key={keyGen(a.text)}>
                <button className={`c-control__btn ${flex(a)}`} onClick={handleEventA}>{a.text}</button>
              </div>
            );
          case "button set":
            return (
              <div className="c-control__btn-set" key={keyGen(a.text)}>
                <button className={`c-control__btn--first ${flex(a)}`} onClick={handleEventA}>{a.text}</button>
                <button className={`c-control__btn ${flex(b)}`} onClick={handleEventB}>{b.text}</button>
              </div>
            );
          case "input":
            return (
              <div className="c-control__btn-set" key={keyGen(a.text)}>
                <input
                  className={`c-control__input--first js-submit-input-${jsID} u-align-center ${flex(a)}`}
                  maxLength="100"
                  onChange={handleEventA}
                  placeholder={a.text}
                  value={a.val}
                />
                <button
                  className={`c-control__btn js-submit-button-${jsID} ${flex(b)}`}
                  onClick={handleEventB}
                >
                  {b.text}
                </button>
              </div>
            );
          default:
            return null;
        }

      })}
    </div>
  );

};

//exports

module.exports = Control;
