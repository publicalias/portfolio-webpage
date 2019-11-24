"use strict";

//init test errors

const initTestErrors = (testData) => (fn, testArgs = []) => {
  testData.forEach(([description, args, setup], i) => {
    it(description, async () => {

      const thisArgs = args.concat(testArgs[i] || []);

      if (setup) {
        await setup();
      }

      await fn(...thisArgs);

    });
  });
};

//mock results

const mockResults = (fn) => fn.mock.results.map((e) => e.value);

//overly long input

const overlyLongInput = (n = 100) => Array(n + 1)
  .fill("0")
  .join("");

//test mock

const testMock = (fn, ...calls) => {
  expect(fn.mock.calls).toEqual(calls.filter((e) => Array.isArray(e)));
};

//exports

module.exports = {
  initTestErrors,
  mockResults,
  overlyLongInput,
  testMock
};
