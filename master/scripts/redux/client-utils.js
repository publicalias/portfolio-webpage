"use strict";

//global imports

const { encodeAPICall, getJSON } = require("all/client-utils");
const { metaAddErrors, metaNoOp, metaSetLoading, metaSetState } = require("redux/meta-factories");

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

//exports

module.exports = {
  initReducer,
  reduxAPICall
};
