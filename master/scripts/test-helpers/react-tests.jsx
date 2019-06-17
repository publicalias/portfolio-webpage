"use strict";

//local imports

const { testMock } = require("./meta-tests");

//node modules

const Adapter = require("enzyme-adapter-react-16");
const React = require("react");

const { configure, mount, shallow } = require("enzyme");

//init test click

const initTestClick = (render) => (qa, action, args = [], data, other) => {

  const { props, wrapper } = render(data, other);

  wrapper.find(qa).simulate("click");

  testMock(props.actions[action], args);

  wrapper.unmount();

};

//init test wrapper

const mockProps = (newState, actions, data, other) => ({

  actions: Object.keys(actions).reduce((acc, e) => {

    acc[e] = jest.fn();

    return acc;

  }, {}),

  data: newState(data),

  history: { push: jest.fn() },
  location: {},
  match: {},
  staticContext: {},

  ...other

});

const initTestWrapper = (newState, actions) => (UUT, Context) => {

  const wrapFn = (render) => (data, other) => {

    const props = mockProps(newState, actions, data, other);

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
  initTestClick,
  initTestWrapper,
  reactTests
};
