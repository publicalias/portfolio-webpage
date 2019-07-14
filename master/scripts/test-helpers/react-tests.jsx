"use strict";

//local imports

const { testMock } = require("./meta-tests");
const { deepCopy } = require("../utilities");

//node modules

const Adapter = require("enzyme-adapter-react-16");
const React = require("react");

const { configure, mount, shallow } = require("enzyme");

//init test event

const initTestEvent = (render, event, merge) => async (qa, dataList, ...fnList) => {

  const { props, wrapper } = render(...dataList);

  wrapper.find(qa).simulate(event, merge);

  await Promise.resolve(); //supports simple async events

  for (const e of fnList) {
    if (typeof e === "function") {
      e(props);
    } else {
      testMock(props.actions[e[0]], e[1]);
    }
  }

  wrapper.unmount();

};

//init test ref

const initTestRef = (Component, init) => {

  const spied = {
    ref: { current: init },
    useRef: jest.fn(() => spied.ref)
  };

  Component.injected.lib.useRef = spied.useRef;

  return spied;

};

//init test snapshot

const initTestSnapshot = (render) => (data, local, other) => {

  const { wrapper } = render(data, local, other);

  expect(wrapper).toMatchSnapshot();

};

//init test wrapper

const mockProps = (newState, actions, data, local, other) => ({

  actions: Object.keys(actions).reduce((acc, e) => {

    acc[e] = jest.fn();

    return acc;

  }, {}),

  data: newState(data),

  local,

  history: { push: jest.fn() },
  location: {},
  match: {},
  staticContext: {},

  ...other

});

const initTestWrapper = (newState, actions) => (UUT, Context) => {

  const wrapFn = (render) => (data, local, other) => {

    const props = mockProps(newState, actions, data, local, other);

    const Component = Context ? (
      <Context>
        <UUT {...props} />
      </Context>
    ) : <UUT {...props} />;

    return {
      props,
      wrapper: render(Component)
    };

  };

  const dive = (Component) => shallow(Component)
    .find(UUT)
    .dive();

  const shallowFn = Context ? dive : shallow;

  return {
    testMount: wrapFn(mount),
    testShallow: wrapFn(shallowFn)
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

      const stub = nameFn(() => null, l);

      if (w !== "ignore") {
        v[l] = w || (k === "jsx" ? stub : jest.fn());
      }

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

//exports

module.exports = {
  initTestEvent,
  initTestRef,
  initTestSnapshot,
  initTestWrapper,
  reactTests
};
