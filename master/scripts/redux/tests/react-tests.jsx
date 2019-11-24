"use strict";

//global imports

const { deepCopy } = require("all/utilities");

//node modules

const Adapter = require("enzyme-adapter-react-16");
const React = require("react");

const { configure, mount, shallow } = require("enzyme");

//init test wrapper

const getProps = (newState, actions, data, local, other) => {

  const init = {
    actions: Object.keys(actions).reduce((acc, e) => Object.assign(acc, {
      [e]: jest.fn()
    }), {}),
    data: newState(data),
    history: { push: jest.fn() },
    local,
    location: {},
    match: {},
    staticContext: {}
  };

  return deepCopy(init, other);

};

const setProps = (wrapper) => (data, local, other) => {

  const init = {
    data: data || {},
    local: local || {}
  };

  wrapper.setProps(deepCopy(wrapper.props(), init, other));

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

//exports

module.exports = {
  initTestWrapper,
  reactTests
};
