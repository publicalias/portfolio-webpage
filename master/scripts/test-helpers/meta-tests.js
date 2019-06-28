"use strict";

//mock results

const mockResults = (fn) => fn.mock.results.map((e) => e.value);

//test mock

const testMock = (fn, ...calls) => {
  expect(fn.mock.calls).toEqual(calls.filter((e) => Array.isArray(e)));
};

//exports

module.exports = {
  mockResults,
  testMock
};
