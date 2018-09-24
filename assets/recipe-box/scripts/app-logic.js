"use strict";

//cancel submit

const cancelSubmit = (props, state) => {

  const noName = !state.name;
  const inUse = props.used.includes(state.name);
  const newEntry = !props.entry;
  const noMatch = props.entry && props.entry.name !== state.name;

  return (noName || inUse) && (newEntry || noMatch);

};

//populate modal

const populateModal = (props) => props.entry || {
  num: props.modalNum,
  name: "",
  com: "",
  ingr: "",
  inst: ""
};

//exports

module.exports = {
  cancelSubmit,
  populateModal
};
