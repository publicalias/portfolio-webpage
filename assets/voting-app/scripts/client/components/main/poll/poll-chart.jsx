"use strict";

//local imports

const { renderChart } = require("../../../view-logic");

//global imports

const { initKeyGen } = require("react-utils");
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

    renderChart(counts, labels);

  }, [JSON.stringify(poll.options)]);

  //render

  const keyGen = initKeyGen();

  return [
    <svg
      className="c-poll-display__chart js-render-chart"
      key={keyGen("chart")}
      viewBox="0 0 450 450"
    />,
    <div className="c-poll-display__tooltip js-fade-tooltip" key={keyGen("tooltip")}>
      <p className="js-edit-label" />
      <p className="js-edit-count u-no-margin" />
    </div>
  ];

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
