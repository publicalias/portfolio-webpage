"use strict";

//local imports

const { testMock } = require("./meta-tests");

//node modules

const Adapter = require("enzyme-adapter-react-16");
const React = require("react");

const { useRef } = React;

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

    ref: null,

    useRef: jest.fn(() => {

      spied.ref = useRef(init);

      return spied.ref;

    })

  };

  Component.injected.useRef = spied.useRef;

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
