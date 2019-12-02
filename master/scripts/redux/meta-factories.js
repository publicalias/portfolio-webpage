"use strict";

//meta add errors

const metaAddErrors = (errors) => ({
  type: "META_ADD_ERRORS",
  errors
});

//meta close error

const metaCloseError = () => ({ type: "META_CLOSE_ERROR" });

//meta log action

const metaLogAction = (action) => ({
  type: "META_LOG_ACTION",
  action
});

//meta no op

const metaNoOp = () => ({ type: "META_NO_OP" });

//meta set loading

const metaSetLoading = (loading = false) => ({
  type: "META_SET_LOADING",
  loading
});

//meta set state

const metaSetState = (merge, config) => ({
  type: "META_SET_STATE",
  merge,
  config
});

//meta timeout error

const metaTimeoutError = () => ({ type: "META_TIMEOUT_ERROR" });

//meta toggle delete

const metaToggleDelete = () => ({ type: "META_TOGGLE_DELETE" });

//exports

module.exports = {
  metaAddErrors,
  metaCloseError,
  metaLogAction,
  metaNoOp,
  metaSetLoading,
  metaSetState,
  metaTimeoutError,
  metaToggleDelete
};
