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

    renderChart(counts);

  }, [JSON.stringify(poll.options)]);

  //render

  return <svg className="js-render-chart" viewBox="0 0 450 450" />;

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
