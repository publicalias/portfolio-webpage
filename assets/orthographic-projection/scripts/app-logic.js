"use strict";

//point radius

const pointRadius = (w, mean) => (d) => {

  if (!d.properties) {
    return;
  }

  const mass = d.properties.mass;

  const min = mean * 0.5;
  const max = mean * 1.5;

  let scale = (mass - min) / max + 0.5;

  scale = Math.min(Math.max(scale, 0.5), 1.5);

  return w * scale / 100;

};

//scrub data

const scrubData = (res, data, mean) => {
  for (const e of res.features) {

    const props = e.properties;

    if (!props.year || !Number(props.reclat) || !Number(props.reclong)) {
      continue;
    }

    props.mass = Number((Number(props.mass) / 1000).toFixed(3));
    props.year = Number(props.year.slice(0, 4));

    data.push(e);
    mean.push(props.mass);

  }
};

//exports

module.exports = {
  pointRadius,
  scrubData
};
