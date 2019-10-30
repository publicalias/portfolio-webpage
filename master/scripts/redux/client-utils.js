"use strict";

//global imports

const { encodeAPICall, getJSON } = require("all/client-utils");
const { select } = require("all/dom-api");
const { get } = require("all/utilities");
const { metaAddErrors, metaNoOp, metaSetLoading, metaSetState } = require("redux/meta-factories");

//node modules

const { useRef, useLayoutEffect } = require("react");

//get search params

const getSearchParams = (newSearchParams, location) => {

  const entries = [...new URLSearchParams(location.search).entries()];

  const data = entries.reduce((acc, [key, val]) => Object.assign(acc, {
    [key]: val
  }), {});

  return newSearchParams(data);

};

//init reducer

const initReducer = (initialState, handlers) => (state = initialState, action) => {

  const valid = action && handlers[action.type];

  return valid ? valid(state, action) : state;

};

//redux api call

const resHandlers = (dispatch, config, successFn, failureFn) => ({

  success: successFn || ((res) => {

    const { errors } = res;
    const { length } = Object.keys(res);

    if (errors) {
      dispatch(metaAddErrors(errors));
    } else if (length) {
      dispatch(metaSetState(res, config));
    } else {
      dispatch(metaNoOp());
    }

  }),

  failure: failureFn || ((err) => {
    dispatch(metaAddErrors([err.message]));
  }),

  loading(bool) {
    dispatch(metaSetLoading(bool));
  }

});

const reduxAPICall = async (dispatch, args, config, successFn, failureFn) => {

  const { path, init } = encodeAPICall(args);

  const { success, failure, loading } = resHandlers(dispatch, config, successFn, failureFn);

  loading(true);

  try {

    const res = await getJSON(path, init);

    success(res);
    loading();

    return res;

  } catch (err) {
    failure(err);
    loading();
  }

};

//set search params

const setSearchParams = (location, key, val) => {

  const query = new URLSearchParams(location.search);

  if (val) {
    query.set(key, val);
  } else {
    query.delete(key);
  }

  query.sort();

  const params = query.toString();

  return params ? `?${params}` : "";

};

//use infinite scroll

const getPosition = () => {

  const DOMScroll = select(".js-infinite-scroll");

  const view = DOMScroll.rect().height;
  const content = DOMScroll.scrollHeight;
  const top = DOMScroll.scrollTop;

  return {
    view,
    content,
    top,
    bottom: content - view - top
  };

};

const getHandlers = (scroll) => (list, path, limit, clear, fetch) => {

  const handleReload = async () => {

    clear();

    const res = await fetch(0);

    scroll.current = {
      end: get(res, path).length < limit,
      pending: false
    };

  };

  const handleScroll = async () => {

    const { current: { end, pending } } = scroll;

    const { view, bottom } = getPosition();

    if (bottom > view * 3 || end || pending) {
      return;
    }

    scroll.current.pending = true;

    const res = await fetch(list.length);

    if (get(res, path).length - list.length < limit) {
      scroll.current.end = true;
    }

    scroll.current.pending = false;

  };

  return {
    handleReload,
    handleScroll
  };

};

const useInfiniteScroll = (bool, ...args) => {

  const scroll = useRef();

  const { handleReload, handleScroll } = getHandlers(scroll)(...args);

  useLayoutEffect(() => {
    handleReload(); //async
  }, [bool]);

  return {
    handleReload,
    handleScroll
  };

};

//exports

module.exports = {
  getSearchParams,
  initReducer,
  setSearchParams,
  reduxAPICall,
  useInfiniteScroll
};
