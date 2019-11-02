"use strict";

//mock infinite scroll

const mockInfiniteScroll = (handleReload = jest.fn(), handleScroll = jest.fn()) => ({
  handleReload,
  handleScroll,
  lib: {
    useInfiniteScroll: jest.fn(() => ({
      handleReload,
      handleScroll
    }))
  }
});

//exports

module.exports = { mockInfiniteScroll };
