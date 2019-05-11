"use strict";

//test mock

const testMock = (fn, ...calls) => {
  expect(fn.mock.calls).toEqual(calls);
};

//exports

module.exports = { testMock };
