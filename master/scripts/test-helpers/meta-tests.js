"use strict";

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
  expect(fn.mock.calls).toEqual(calls.filter((e) => Array.isArray(e)));
};

//exports

module.exports = {
  testErrors,
  testMock
};
