"use strict";

//global imports

const { getJSON } = require("all/client-utils");
const { select } = require("all/dom-api");
const { placeholder } = require("all/utilities");

//render output

const parseData = (users, streams) => (item) => {

  const match = (list, prop) => list.data.find((f) => item.name === f[prop].toLowerCase());

  const user = match(users, "display_name");
  const stream = match(streams, "user_name");

  Object.assign(
    item,
    user && {
      avatar: user.profile_image_url,
      name: user.display_name,
      link: `href="https://www.twitch.tv/${user.display_name}"`,
      state: "is-offline",
      status: "Offline"
    },
    stream && {
      state: "is-online",
      status: stream.title
    }
  );

};

const sortFn = (a, b) => {

  if (a.name > b.name) {
    return 1;
  } else if (a.name < b.name) {
    return -1;
  }

  return 0;

};

const writeData = ({ avatar, link, name, state, status }) => {

  const html = `
    <div class="${state} js-filter-output">
      <hr>
      <a class="c-channel" ${link}>
        <img alt="Avatar" class="c-channel__avatar" src=${avatar}>
        <p class="c-channel__name">${name}</p>
        <p class="c-channel__status">${status}</p>
      </a>
    </div>
  `;

  select(".js-render-output").html(html, true);

};

const renderOutput = async (channels) => {

  const list = channels.map((e) => ({
    avatar: placeholder(100),
    link: "",
    name: e,
    state: "is-closed",
    status: "Closed"
  }));

  const json = JSON.stringify(channels);

  const [users, streams] = await Promise.all([
    getJSON(`/twitch-viewer/users?users=${json}`),
    getJSON(`/twitch-viewer/streams?streams=${json}`)
  ]);

  select(".js-render-output").html("");

  list.forEach(parseData(users, streams));

  list.sort(sortFn).forEach(writeData);

  return list;

};

//exports

module.exports = { renderOutput };
