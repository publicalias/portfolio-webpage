"use strict";

//local imports

const Project = require("./project/project");

//global imports

const { storageKey } = require("all/client-utils");
const { togglePanel } = require("all/components/accordion");
const { select } = require("all/dom-api");
const { initKeyGen, useSetState } = require("all/react-utils");

//node modules

const React = require("react");

//subgroup

const Subgroup = (props) => {

  //state

  const [state, setState] = useSetState({ viewed: props.subgroup.id === storageKey("panel", null, true) });

  //events

  const handleClick = () => {

    const navHeight = select(".js-ref-nav-bar").rect().height;
    const groupPadding = select(`.js-scroll-${props.groupId}`).css().paddingTop;

    togglePanel(props.subgroup.id, navHeight + parseFloat(groupPadding));

    setState({ viewed: true });

  };

  //render

  const { subgroup: { name, id, projects } } = props;

  const keyGen = initKeyGen();

  return (
    <div className="c-accordion">
      <h3 className={`c-accordion__panel-toggle js-toggle-panel-${id}`} onClick={handleClick}>{name}</h3>
      {!props.isLastSubgroup && <hr />}
      <div className={`c-accordion__panel js-expand-panel js-expand-panel-${id}`}>
        {projects.map((e, i, arr) => (
          <Project
            isFirstProject={i === 0}
            isLastProject={i === arr.length - 1}
            isLastSubgroup={props.isLastSubgroup}
            key={keyGen(e.id)}
            project={e}
            viewed={state.viewed}
          />
        ))}
      </div>
    </div>
  );

};

//exports

module.exports = Subgroup;
