"use strict";

//cancel submit

const cancelSubmit = (state, props) => {

  const { name } = state;
  const { entry, used } = props;

  const noName = !name;
  const inUse = used.includes(name);
  const newEntry = !entry;
  const noMatch = entry && entry.name !== name;

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
