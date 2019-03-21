"use strict";

//parse arith

const parseArith = (that, str) => {

  const num = Number(that.val);

  if (!that.chain) {
    that.chain = `${num} ${str}`;
    that.val = "0";
  } else if (that.val === "0") {
    that.chain = that.chain.replace(/[+\-*/]$/u, str);
  } else {
    that.chain = `${that.chain} ${num} ${str}`;
    that.val = "0";
  }

  that.repeat = "";

};

//resolve

const resolve = (str) => {

  const chain = str.split(" ");

  const prev = (i) => Number(chain[i - 1]);
  const next = (i) => Number(chain[i + 1]);

  while (chain.length > 1 && (chain.includes("*") || chain.includes("/"))) {

    const i = chain.findIndex((e) => ["*", "/"].includes(e));

    chain.splice(i - 1, 3, chain[i] === "*" ? prev(i) * next(i) : prev(i) / next(i));

  }

  while (chain.length > 1) {

    const i = chain.findIndex((e) => ["+", "-"].includes(e));

    chain.splice(i - 1, 3, chain[i] === "+" ? prev(i) + next(i) : prev(i) - next(i));

  }

  return chain.join();

};

//exports

module.exports = {
  parseArith,
  resolve
};
