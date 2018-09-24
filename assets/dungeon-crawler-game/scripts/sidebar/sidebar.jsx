"use strict";

//local imports

const CharInfo = require("./char-info");
const HoverBox = require("./hover-box");

//sidebar

const Sidebar = (props) => {

  const { btn: btnA, char, hover, time } = props.charInfo;
  const { btn: btnB, text } = props.hoverBox;

  return (
    <div className="c-sidebar js-resize-sidebar">
      <CharInfo
        btn={btnA}
        char={char}
        hover={hover}
        time={time}
      />
      <hr />
      <HoverBox
        btn={btnB}
        text={text}
      />
    </div>
  );

};

//exports

module.exports = Sidebar;
