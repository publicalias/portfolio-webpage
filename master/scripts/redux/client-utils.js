"use strict";

//global imports

const { encodeAPICall, getJSON } = require("all/client-utils");
const { select } = require("all/dom-api");
const { get } = require("all/utilities");
const { metaAddErrors, metaNoOp, metaSetState } = require("redux/meta-factories");

//node modules

const { useEffect, useRef } = require("react");

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

  success: successFn || ((res, isLast) => {

    const { errors } = res;
    const { length } = Object.keys(res);

    if (!isLast) { //anti-race condition
      dispatch(metaNoOp());
    } else if (errors) {
      dispatch(metaAddErrors(errors));
    } else if (length) {
      dispatch(metaSetState(res, config));
    } else {
      dispatch(metaNoOp());
    }

  }),

  failure: failureFn || ((err) => {
    dispatch(metaAddErrors([err.message]));
  })

});

const reduxAPICall = (args, config, successFn, failureFn) => {

  const fn = async (dispatch, getState) => {

    const { path, init } = encodeAPICall(args);

    const { success, failure } = resHandlers(dispatch, config, successFn, failureFn);

    const getLast = () => {

      const { log } = getState();

      return log.lastIndexOf(args.type);

    };

    try {

      const current = getLast();

      const res = await getJSON(path, init);

      success(res, current === getLast());

      return res;

    } catch (err) {
      failure(err);
    }

  };

  fn.type = args.type; //logging

  return fn;

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

  const DOMScroll = select(".js-ref-scroll");

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

const useInfiniteScroll = (list, path, limit, reset, fetch) => {

  const scroll = useRef();

  const handleReload = async () => {

    reset();

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

//use refresh

const useRefresh = (refresh, loading, actions, list) => {

  const trigger = actions.filter((e) => list.includes(e)).length;

  const waiting = useRef(false);

  useEffect(() => {
    if (trigger && !waiting.current) {
      if (loading) {
        waiting.current = true;
      } else {
        refresh();
      }
    }
  }, [trigger]);

  if (waiting.current && !loading) {
    waiting.current = false;
    refresh();
  }

};

//exports

module.exports = {
  getSearchParams,
  initReducer,
  setSearchParams,
  reduxAPICall,
  useInfiniteScroll,
  useRefresh
};
