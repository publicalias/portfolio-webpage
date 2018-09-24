"use strict";

//global imports

const { getJSON } = require("utilities");

//get output

const getOutput = (id, name) => {
  $(".js-render-output").append(`
    <div class="is-closed js-edit-state-${id} js-filter-output">
      <hr>
      <a class="c-channel js-edit-link-${id}" href="javascript:void(0)">
        <img alt="Avatar" class="c-channel__avatar js-edit-avatar-${id}" src="https://via.placeholder.com/100x100?text=undefined">
        <p class="c-channel__name">${name}</p>
        <p class="c-channel__status js-edit-status-${id}">Closed</p>
      </a>
    </div>
  `);
};

//get stream

const getStream = (id) => () => getJSON(`/twitch-viewer/streams?stream=${id}`);

//parse channel

const parseChannel = (id) => (res) => {

  if (!res.name) {
    return;
  }

  $(`.js-edit-state-${id}`)
    .removeClass("is-closed")
    .addClass("is-offline");

  $(`.js-edit-link-${id}`).attr("href", res.url);
  $(`.js-edit-avatar-${id}`).attr("src", res.logo || undefined);
  $(`.js-edit-status-${id}`).text("Offline");

};

//parse stream

const parseStream = (id) => (res) => {

  if (!res.stream) {
    return;
  }

  const status = `${res.stream.channel.game}: ${res.stream.channel.status}`;

  $(`.js-edit-state-${id}`)
    .removeClass("is-offline")
    .addClass("is-online");

  $(`.js-edit-status-${id}`).text(status.length < 30 ? status : `${status.slice(0, 26)}...`);

};

//exports

module.exports = {
  getOutput,
  getStream,
  parseChannel,
  parseStream
};
