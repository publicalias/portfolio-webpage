"use strict";

//node modules

const React = require("react");

//meta list body

const MetaListBody = (props) => {

  const { local: { handleScroll, header, list, placeholder } } = props;

  //render

  return (
    <div className="c-list-body">
      {header}
      <hr />
      <div className="c-list-body__head u-margin-full">
        <h4 className="u-photo-width">Photo</h4>
        <h4>Description</h4>
      </div>
      <div
        className="c-list-body__body js-infinite-scroll qa-infinite-scroll"
        onScroll={handleScroll}
      >
        <div className="c-list-body__content">
          {list.length ? list : (
            <div>
              <div className="c-list-item">
                <p className="u-photo-width">N/A</p>
                <p>{placeholder}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

};

MetaListBody.propList = ["local"];

//exports

module.exports = MetaListBody;
