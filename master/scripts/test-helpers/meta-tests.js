"use strict";

//mock args

const mockArgs = (fn) => fn.mock.calls;

//mock results

const mockResults = (fn) => fn.mock.results.map((e) => e.value);

//test errors

const testErrors = (testData) => (fn, testArgs = []) => {
  testData.forEach((e, i) => {

    const [description, args, setup] = e;

    it(description, async () => {

      const thisArgs = args.concat(testArgs[i] || undefined);

      if (setup) {
        await setup();
      }

      await fn(...thisArgs);

    });

  });
};

//test mock

const testMock = (fn, ...calls) => {
  expect(mockArgs(fn)).toEqual(calls.filter((e) => Array.isArray(e)));
};

//exports

module.exports = {
  mockArgs,
  mockResults,
  testErrors,
  testMock
};
