"use strict";

//global imports

const { deepCopy, initDeepCopy } = require("all/utilities");
const { testMock } = require("redux/tests/meta-tests");

//node modules

const Adapter = require("enzyme-adapter-react-16");
const React = require("react");

const { configure, mount, shallow } = require("enzyme");

//init test event

const initTestEvent = (render, type, event) => async (qa, dataList, ...fnList) => {

  const { props, wrapper } = render(...dataList);

  wrapper.find(qa).simulate(type, event);

  await Promise.resolve(); //supports simple async events

  for (const e of fnList) {
    if (typeof e === "function") {
      e(props);
    } else {
      (([type, ...calls]) => {
        testMock(props.actions[type], ...calls);
      })(e);
    }
  }

  wrapper.unmount();

};

//init test snapshot

const initTestSnapshot = (render) => (data, local, other) => {

  const { wrapper } = render(data, local, other);

  expect(wrapper).toMatchSnapshot();

};

//init test submit

const initTestSubmit = (event, [failure, errors = failure, success = failure]) => (testSubmit) => {

  const tests = [
    [failure, "failure", undefined],
    [errors, "errors", { errors: [] }],
    [success, "success", {}]
  ];

  for (const [type, test, res] of tests) {
    it(`should call ${type} on ${event} (${test})`, () => testSubmit(res));
  }

};

//init test wrapper

const getProps = (newState, actions, data, local, other) => {

  const init = {

    actions: Object.keys(actions).reduce((acc, e) => Object.assign(acc, {
      [e]: jest.fn()
    }), {}),

    data: newState(data),

    local,

    history: { push: jest.fn() },
    location: {},
    match: {},
    staticContext: {}

  };

  return deepCopy(init, other);

};

const setProps = (wrapper) => (data, local, other) => {
  wrapper.setProps(deepCopy(wrapper.props(), other, {
    data: data || {},
    local: local || {}
  }));
};

const initTestWrapper = (newState, actions) => (Component) => {

  const wrapFn = (render) => (data, local, other) => {

    const props = getProps(newState, actions, data, local, other);

    const wrapper = render(<Component {...props} />);

    return {
      props,
      setProps: setProps(wrapper),
      wrapper
    };

  };

  return {
    testMount: wrapFn(mount),
    testShallow: wrapFn(shallow)
  };

};

//react tests

const reactTests = {

  inject(Component, overwrite = {}) {

    const nameFn = (fn, name) => {

      Object.defineProperty(fn, "name", { value: name });

      return fn;

    };

    const setVal = (k, v, l) => {

      const w = overwrite[k] && overwrite[k][l];

      const special = {
        jsx: nameFn(() => null, l),
        lib: w && w.mockClear() //custom mocks are reused
      };

      v[l] = special[k] || w || jest.fn();

    };

    return () => {

      if (!Component.injected) {
        return;
      }

      Component.original = deepCopy(Component.injected);

      for (const [k, v] of Object.entries(Component.injected)) {
        for (const l of Object.keys(v)) {
          setVal(k, v, l);
        }
      }

    };

  },

  setup() {
    configure({ adapter: new Adapter() });
  }

};

//with data list

const withDataList = (render, dataList) => (...args) => {

  const deepCopy = initDeepCopy({
    ignoreNull: true, //prevents overwriting
    ignoreUndefined: true,
    overwriteArray: false
  });

  const fullDataList = deepCopy(dataList, args);

  return render(...fullDataList);

};

//exports

module.exports = {
  initTestEvent,
  initTestSnapshot,
  initTestSubmit,
  initTestWrapper,
  reactTests,
  withDataList
};
