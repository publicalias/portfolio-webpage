"use strict";

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

module.exports = { scrubData };
