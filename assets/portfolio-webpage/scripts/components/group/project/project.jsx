"use strict";

//local imports

const CodeBtn = require("./code-btn");
const List = require("./list");
const Preview = require("./preview");

//node modules

const React = require("react");

//project

const Project = (props) => {

  const project = props.project;

  const firstOfLast = props.isLastSubgroup && props.isFirstProject;
  const notLast = !(props.isLastSubgroup && props.isLastProject);

  return (
    <div>
      {firstOfLast && <hr />}
      <h4 className="u-margin-full">{project.name}</h4>
      {project.comments && <p className="u-margin-full">{project.comments}</p>}
      <List list={project.userStories} name="User stories" />
      <List list={project.resources} name="External resources" />
      {props.viewed && <Preview project={project} />}
      <CodeBtn code={project.links.code} />
      {notLast && <hr />}
    </div>
  );

};

//exports

module.exports = Project;
