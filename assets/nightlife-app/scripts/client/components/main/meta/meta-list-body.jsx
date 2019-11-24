"use strict";

//node modules

const React = require("react");

//meta list body

const MetaListBody = (props) => {

  const { children, local: { handleScroll, header } } = props;

  //render

  return (
    <div className="c-list-body">
      {header}
      <hr />
      <div className="c-list-body__head u-margin-full">
        <h4>Photo</h4>
        <h4>Description</h4>
      </div>
      <div
        className="c-list-body__body js-ref-scroll qa-ref-scroll"
        onScroll={handleScroll}
      >
        {children.length ? children : (
          <div className="c-list-item">
            <p>N/A</p>
            <p>No Results</p>
          </div>
        )}
      </div>
    </div>
  );

};

MetaListBody.propList = ["children", "local"];

//exports

module.exports = MetaListBody;
