"use strict";

//local imports

const { renderChart } = require("../../../view-logic");

//node modules

const React = require("react");

const { useLayoutEffect } = React;

//meta poll display

const MetaPollDisplay = (props) => {

  const { local: { counts, labels } } = props;

  const { lib: { renderChart } } = MetaPollDisplay.injected;

  //lifecycle

  useLayoutEffect(() => renderChart(counts, labels));

  //render

  return (
    <React.Fragment>
      <svg className="c-meta-poll-display__chart js-render-chart" viewBox="0 0 450 450" />
      <div className="c-meta-poll-display__tooltip js-toggle-tooltip">
        <h5 className="js-edit-label" />
        <p className="js-edit-count u-margin-none" />
      </div>
    </React.Fragment>
  );

};

MetaPollDisplay.propList = ["local"];

MetaPollDisplay.injected = { lib: { renderChart } };

//exports

module.exports = MetaPollDisplay;
