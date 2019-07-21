"use strict";

//scrub data

const scrubData = (res, data, mean) => {
  for (const e of res.features) {

    const props = e.properties;

    const { mass, year, reclat, reclong } = props;

    if (!year || !Number(reclat) || !Number(reclong)) {
      continue;
    }

    props.mass = Number((Number(mass) / 1000).toFixed(3));
    props.year = Number(year.slice(0, 4));

    data.push(e);
    mean.push(props.mass);

  }
};

//exports

module.exports = { scrubData };
