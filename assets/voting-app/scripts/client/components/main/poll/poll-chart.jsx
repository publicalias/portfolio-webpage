"use strict";

//local imports

const { renderChart } = require("../../../view-logic");

//global imports

const { rngInt } = require("utilities");

//node modules

const React = require("react");

const { useLayoutEffect } = React;

//poll chart

const PollChart = (props) => {

  const { local: { poll, role } } = props;

  const { lib: { renderChart, rngInt } } = PollChart.injected;

  //lifecycle

  useLayoutEffect(() => {

    const counts = poll.options.map((e) => role === "form" ? rngInt(0, 9, true) : e.voted.length);
    const labels = poll.options.map((e) => role === "form" ? e : e.text);

    return renderChart(counts, labels);

  }, [JSON.stringify(poll.options)]);

  //render

  return (
    <React.Fragment>
      <svg className="c-poll-display__chart js-render-chart" viewBox="0 0 450 450" />
      <div className="c-poll-display__tooltip js-toggle-tooltip">
        <p className="js-edit-label" />
        <p className="js-edit-count u-no-margin" />
      </div>
    </React.Fragment>
  );

};

PollChart.propList = ["local"];

PollChart.injected = {
  lib: {
    renderChart,
    rngInt
  }
};

//exports

module.exports = PollChart;
