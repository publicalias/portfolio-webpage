"use strict";

//global imports

const { initKeyGen } = require("react-utils");

//control

const Control = (props) => {

  const keyGen = initKeyGen();

  return (
    <div className="c-control js-resize-control">
      {props.display.map((e) => <p className="c-control__text" key={keyGen(e)}>{e}</p>)}
      {props.control.map((e) => {

        const { setType, jsID, content: { a, b } } = e;

        const flex = (e) => e.flex || "u-flex-1";

        switch (setType) {
          case "button":
            return (
              <div className="c-control__btn-set" key={keyGen(a.text)}>
                <button className={`c-control__btn ${flex(a)}`} onClick={a.fn}>{a.text}</button>
              </div>
            );
          case "button set":
            return (
              <div className="c-control__btn-set" key={keyGen(a.text)}>
                <button className={`c-control__btn--first ${flex(a)}`} onClick={a.fn}>{a.text}</button>
                <button className={`c-control__btn ${flex(b)}`} onClick={b.fn}>{b.text}</button>
              </div>
            );
          case "input":
            return (
              <div className="c-control__btn-set" key={keyGen(a.text)}>
                <input
                  className={`c-control__input--first js-submit-input-${jsID} u-align-center ${flex(a)}`}
                  onChange={a.fn}
                  placeholder={a.text}
                  value={a.val}
                />
                <button
                  className={`c-control__btn js-submit-button-${jsID} ${flex(b)}`}
                  onClick={b.fn}
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
