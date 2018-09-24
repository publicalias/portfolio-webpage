"use strict";

//local imports

const { bio } = require("./bio");
const { contact } = require("./contact");
const { footer } = require("./footer");
const { groups } = require("./groups/groups");
const { navBar } = require("./nav-bar");
const { showcase } = require("./showcase");

//default props

const defaultProps = {
  navBar,
  bio,
  showcase,
  groups,
  contact,
  footer
};

//exports

module.exports = { defaultProps };
