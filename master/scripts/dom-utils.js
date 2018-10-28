"use strict";

/*global TweenMax, Linear*/

//utilities

const nodeList = (query) => {

  //query string, node, or node list

  if (typeof query === "string") {
    return document.querySelectorAll(query);
  } else if (typeof query[Symbol.iterator] !== "function") {
    return [query];
  }

  return query;

};

//animate

const animate = (id, props, cb) => {
  TweenMax.to(id, 0.5, Object.assign(props, {
    ease: Linear.easeNone,
    onComplete: cb
  }));
};

//item is in view

const itemIsInView = ($item, addTop = 0, addBottom = 0) => {

  const windowTop = $(document.scrollingElement).scrollTop();
  const windowBottom = windowTop + $(window).outerHeight();

  const itemTop = $item.offset().top;
  const itemBottom = itemTop + $item.outerHeight();

  const notAbove = windowBottom - addBottom > itemTop;
  const notBelow = windowTop + addTop < itemBottom;

  return notAbove && notBelow;

};

//listen

const listen = (query, event, fn) => {

  const types = event.split(" ");

  for (const e of nodeList(query)) {
    for (const f of types) {
      e.addEventListener(f, fn);
    }
  }

};

//smooth scroll

const smoothScroll = (scrollTop) => {
  animate(document.scrollingElement, { scrollTop });
};

//void link

const voidLink = (link) => link || "javascript:void(0)";

//exports

module.exports = {
  animate,
  itemIsInView,
  listen,
  smoothScroll,
  voidLink
};
