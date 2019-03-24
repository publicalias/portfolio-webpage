"use strict";

//local imports

const { buttonEvents, keyEvents } = require("./scripts/event-handlers");
const { parseArith, resolve } = require("./scripts/app-logic");
const { readOutput, updateView } = require("./scripts/view-logic");

//global imports

const { checkInput } = require("client-utils");
const { select } = require("dom-api");
const { bindObject, toPrecision } = require("utilities");

//app logic

const app = {

  val: "0",
  chain: "",
  repeat: "",
  memory: null,

  //number

  num(str, key) {

    this.val = readOutput();

    if (!isFinite(this.val) || this.val.includes("e")) {
      return;
    }

    this.val = this.val === "0" ? str : `${this.val}${str}`;
    this.repeat = "";

    updateView(this, key && str, true);

  },

  dec(key) {

    this.val = readOutput();

    if (!isFinite(this.val) || this.val.includes("e") || this.val.includes(".")) {
      return;
    }

    this.val = `${this.val}.`;
    this.repeat = "";

    updateView(this, key && "dec", true);

  },

  //memory

  ms() {
    this.memory = this.val;
  },

  mc() {
    this.memory = null;
  },

  mr() {

    if (!this.memory) {
      return;
    }

    this.val = this.memory;
    this.repeat = "";

    updateView(this);

  },

  mp() {
    if (this.memory) {
      this.memory = resolve(`${this.memory} + ${this.val}`);
    }
  },

  mm() {
    if (this.memory) {
      this.memory = resolve(`${this.memory} - ${this.val}`);
    }
  },

  //basic

  arith(str, key) {

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

    this.val = toPrecision(Math.sqrt(this.val));
    this.repeat = "";

    updateView(this);

  },

  square() {

    this.val = toPrecision(Math.pow(this.val, 2));
    this.repeat = "";

    updateView(this);

  },

  rec() {

    this.val = resolve(`1 / ${this.val}`);
    this.repeat = "";

    updateView(this);

  },

  neg() {

    this.val = resolve(`${this.val} * -1`);
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

    this.val = readOutput();

    if (!isFinite(this.val) || this.val.includes("e")) {
      return;
    }

    this.val = this.val.length > 1 ? this.val.slice(0, -1) : "0";

    if (this.val === "-") {
      this.val = "0";
    }

    this.repeat = "";

    updateView(this, key && "del", true);

  },

  //return

  equals(key) {

    if (!this.chain && this.repeat) {
      this.val = resolve(`${this.val}${this.repeat}`);
    } else if (this.chain) {
      this.repeat = `${this.chain.slice(-2)} ${this.val}`;
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
