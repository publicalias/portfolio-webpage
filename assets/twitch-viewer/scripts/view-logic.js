"use strict";

//global imports

const { select } = require("dom-api");
const { getJSON } = require("utilities");

//get output

const getOutput = (id, name) => {

  const html = `
    <div class="is-closed js-edit-state-${id} js-filter-output">
      <hr>
      <a class="c-channel js-edit-link-${id}" href="javascript:void(0)">
        <img alt="Avatar" class="c-channel__avatar js-edit-avatar-${id}" src="https://via.placeholder.com/100x100?text=undefined">
        <p class="c-channel__name">${name}</p>
        <p class="c-channel__status js-edit-status-${id}">Closed</p>
      </a>
    </div>
  `;

  select(".js-render-output").html(html, true);

};

//get stream

const getStream = (id) => () => getJSON(`/twitch-viewer/streams?streams=${id}`);

//parse channel

const parseChannel = (id) => (res) => {

  if (!res.name) {
    return;
  }

  select(`.js-edit-state-${id}`).class("is-closed is-offline", true);

  select(`.js-edit-link-${id}`).href = res.url;
  select(`.js-edit-avatar-${id}`).src = res.logo || undefined;

  select(`.js-edit-status-${id}`).text("Offline");

};

//parse stream

const parseStream = (id) => (res) => {

  if (!res.stream) {
    return;
  }

  const status = `${res.stream.channel.game}: ${res.stream.channel.status}`;

  select(`.js-edit-state-${id}`).class("is-offline is-online", true);

  select(`.js-edit-status-${id}`).text(status.length < 30 ? status : `${status.slice(0, 26)}...`);

};

//exports

module.exports = {
  getOutput,
  getStream,
  parseChannel,
  parseStream
};
