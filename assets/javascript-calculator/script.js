"use strict";

//local imports

const { buttonEvents, keyEvents } = require("./scripts/event-handlers");
const { parseArith, resolve } = require("./scripts/app-logic");
const { updateView } = require("./scripts/view-logic");

//global imports

const { checkInput } = require("client-utils");
const { select } = require("dom-api");
const { bindObject } = require("utilities");

//app logic

const app = {

  val: "0",
  chain: "",
  repeat: "",
  memory: null,

  //number

  num(str, key) {

    if (!isFinite(this.val) || this.val.includes("e")) {
      return;
    }

    this.val = this.val === "0" ? str : `${this.val}${str}`;
    this.repeat = "";

    updateView(this, key && str);

  },

  dec(key) {

    if (!isFinite(this.val) || this.val.includes(".") || this.val.includes("e")) {
      return;
    }

    this.val = `${this.val}.`;
    this.repeat = "";

    updateView(this, key && "dec");

  },

  //memory

  ms() {
    if (isFinite(this.val)) {
      this.memory = Number(this.val);
    }
  },

  mc() {
    this.memory = null;
  },

  mr() {

    if (this.memory === null) {
      return;
    }

    this.val = this.memory.toString();
    this.repeat = "";

    updateView(this);

  },

  mp() {
    if (isFinite(this.val) && this.memory !== null) {
      this.memory += Number(this.val);
    }
  },

  mm() {
    if (isFinite(this.val) && this.memory !== null) {
      this.memory -= Number(this.val);
    }
  },

  //basic

  arith(str, key) {

    if (!isFinite(this.val)) {
      return;
    }

    const table = {
      "+": "add",
      "-": "sub",
      "*": "mult",
      "/": "div"
    };

    parseArith(this, str);
    updateView(this, key && table[str]);

  },

  //special

  radix() {

    if (!isFinite(this.val)) {
      return;
    }

    this.val = Math.sqrt(this.val).toString();
    this.repeat = "";

    updateView(this);

  },

  square() {

    if (!isFinite(this.val)) {
      return;
    }

    this.val = Math.pow(this.val, 2).toString();
    this.repeat = "";

    updateView(this);

  },

  frac() {

    if (!isFinite(this.val)) {
      return;
    }

    this.val = (1 / this.val).toString();
    this.repeat = "";

    updateView(this);

  },

  neg() {

    if (!isFinite(this.val)) {
      return;
    }

    this.val = (this.val * -1).toString();
    this.repeat = "";

    updateView(this);

  },

  //delete

  ce() {

    if (this.val !== "0") {
      this.val = "0";
    } else if (this.chain) {
      this.chain = this.chain.split(" ").slice(0, -1);
      this.val = this.chain.pop();
      this.chain = this.chain.join(" ");
    }

    this.repeat = "";

    updateView(this);

  },

  c() {

    this.val = "0";
    this.chain = "";
    this.repeat = "";

    updateView(this);

  },

  del(key) {

    if (!isFinite(this.val) || this.val.includes("e")) {
      return;
    }

    this.val = this.val.length > 1 ? this.val.slice(0, -1) : "0";

    if (this.val === "-") {
      this.val = "0";
    }

    this.repeat = "";

    updateView(this, key && "del");

  },

  //return

  equals(key) {

    if (!isFinite(this.val)) {
      return;
    }

    if (!this.chain && this.repeat) {
      this.val = resolve(this.val + this.repeat);
    } else if (this.chain) {
      this.repeat = `${this.chain.substr(-2, 2)} ${this.val}`;
      this.val = resolve(`${this.chain} ${this.val}`);
      this.chain = "";
    }

    updateView(this, key && "equals");

  }

};

//initialize app

bindObject(app);

select(document).on("DOMContentLoaded", () => {

  checkInput();

  buttonEvents(app);
  keyEvents(app);

});
