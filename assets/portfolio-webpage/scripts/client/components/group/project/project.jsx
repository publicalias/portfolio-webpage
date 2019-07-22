"use strict";

//local imports

const CodeBtn = require("./code-btn");
const List = require("./list");
const Preview = require("./preview");

//node modules

const React = require("react");

//project

const Project = (props) => {

  const { project: { name, comments, userStories, resources, links }, viewed } = props;

  const firstOfLast = props.isLastSubgroup && props.isFirstProject;
  const notLast = !(props.isLastSubgroup && props.isLastProject);

  return (
    <div>
      {firstOfLast && <hr />}
      <h4 className="u-margin-full">{name}</h4>
      {comments && <p className="u-margin-full">{comments}</p>}
      <List list={userStories} name="User stories" />
      <List list={resources} name="External resources" />
      {viewed && <Preview project={props.project} />}
      <CodeBtn code={links.code} />
      {notLast && <hr />}
    </div>
  );

};

//exports

module.exports = Project;