"use strict";

//global imports

const { reduxAPICall } = require("redux-utils/client-utils");
const { metaAddErrors, metaNoOp, metaSetState } = require("redux-utils/meta-factories");
const { newState } = require("schemas/voting-app");
const { deepCopy } = require("utilities");

//meta create poll

const metaCreatePoll = (data, history) => (dispatch) => {

  const args = {
    path: "/voting-app/api/meta-create-poll",
    method: "POST",
    data
  };

  const success = (res) => {

    const { list, form, view } = newState();

    const { id, errors } = res;

    if (errors) {

      dispatch(metaAddErrors(errors));

      return;

    }

    dispatch(metaSetState({
      list: deepCopy(list, { filter: "created" }),
      form: deepCopy(form),
      view: deepCopy(view)
    }));

    history.push(`/view?id=${id}`);

  };

  return reduxAPICall(dispatch, args, success);

};

//meta delete poll

const metaDeletePoll = (id, history) => (dispatch) => {

  const args = {
    path: "/voting-app/api/meta-delete-poll",
    method: "DELETE",
    data: { id }
  };

  const success = () => {

    dispatch(metaNoOp());

    history.push("/list");

  };

  return reduxAPICall(dispatch, args, success);

};

//meta get polls

const metaGetPolls = (id, skip = false) => (dispatch, getState) => {

  const { list } = getState();

  const args = {
    path: "/voting-app/api/meta-get-polls",
    method: "GET",
    data: {
      id,
      skip,
      list
    }
  };

  return reduxAPICall(dispatch, args);

};

//meta get user

const metaGetUser = () => (dispatch) => {

  const args = {
    path: "/voting-app/api/meta-get-user",
    method: "GET"
  };

  return reduxAPICall(dispatch, args);

};

//meta open form

const metaOpenForm = (history) => (dispatch) => {

  dispatch(metaSetState({ form: newState().form }));

  history.push("/form");

};

//meta open list

const metaOpenList = (history) => (dispatch) => {

  dispatch(metaNoOp());

  history.push("/list");

};

//meta open view

const metaOpenView = (id, history) => (dispatch) => {

  dispatch(metaSetState({ view: newState().view }));

  history.push(`/view?id=${id}`);

};

//exports

module.exports = {
  metaCreatePoll,
  metaDeletePoll,
  metaGetPolls,
  metaGetUser,
  metaOpenForm,
  metaOpenList,
  metaOpenView
};
