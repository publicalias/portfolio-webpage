"use strict";

//mock results

const mockResults = (fn) => fn.mock.results.map((e) => e.value);

//test errors

const testErrors = (testData) => (fn, testArgs = []) => {
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

//test mock

const testMock = (fn, ...calls) => {
  expect(fn.mock.calls).toEqual(calls.filter((e) => Array.isArray(e)));
};

//exports

module.exports = {
  mockResults,
  testErrors,
  testMock
};
