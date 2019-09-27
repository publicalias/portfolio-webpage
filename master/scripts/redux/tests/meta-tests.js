"use strict";

//init test errors

const initTestErrors = (testData) => (fn, testArgs = []) => {
  testData.forEach((e, i) => {

    const [description, args, setup] = e;

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

const overlyLongInput = Array(100 + 1)
  .fill("a")
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
