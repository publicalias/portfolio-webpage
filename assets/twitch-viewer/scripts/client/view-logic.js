"use strict";

//global imports

const { getJSON } = require("client-utils");
const { select } = require("dom-api");

//get output

const getListing = (id, name) => {

  const html = `
    <div class="is-closed js-edit-state-${id} js-filter-output">
      <hr>
      <a class="c-channel js-edit-link-${id}">
        <img alt="Avatar" class="c-channel__avatar js-edit-avatar-${id}" src="https://via.placeholder.com/100x100?text=undefined">
        <p class="c-channel__name">${name}</p>
        <p class="c-channel__status js-edit-status-${id}">Closed</p>
      </a>
    </div>
  `;

  select(".js-render-output").html(html, true);

};

const parseChannel = (id, res) => {

  if (!res.name) {
    return;
  }

  select(`.js-edit-state-${id}`).class("is-closed is-offline", true);

  select(`.js-edit-link-${id}`).href = res.url;
  select(`.js-edit-avatar-${id}`).src = res.logo || undefined;

  select(`.js-edit-status-${id}`).text("Offline");

};

const parseStream = (id, res) => {

  if (!res.stream) {
    return;
  }

  const status = `${res.stream.channel.game}: ${res.stream.channel.status}`;

  select(`.js-edit-state-${id}`).class("is-offline is-online", true);

  select(`.js-edit-status-${id}`).text(status);

};

const getOutput = async (name) => {

  const id = name.toLowerCase();

  getListing(id, name);

  const [channel, stream] = await Promise.all([
    getJSON(`/twitch-viewer/channels?channels=${name}`),
    getJSON(`/twitch-viewer/streams?streams=${id}`)
  ]);

  parseChannel(id, channel);
  parseStream(id, stream);

};

//exports

module.exports = { getOutput };
