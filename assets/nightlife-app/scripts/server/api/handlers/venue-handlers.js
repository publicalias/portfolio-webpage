"use strict";

//local imports

const { checkSearch, findVenueItem, findVenueList, handleYelpAPI } = require("../../app-logic");

//global imports

const { handleAPICall, handleErrors } = require("redux/server-utils");

//venue get item

const venueGetItem = async (req, res) => {

  const { id, location } = JSON.parse(req.query.data);

  const { lib: { handler } } = venueGetItem.injected;

  const venue = location && await findVenueItem(handler, req.user, id, location);

  res.json({ venues: { page: { data: venue ? [venue] : [] } } });

};

venueGetItem.injected = { lib: { handler: handleYelpAPI } };

//venue get list

const venueGetList = handleAPICall({

  errors(req, res) {

    const { params } = JSON.parse(req.query.data);

    handleErrors(res, checkSearch(params));

  },

  async success(req, res) {

    const { params, length, location } = JSON.parse(req.query.data);

    const { lib: { handler } } = venueGetList.injected;

    const venues = location && Array(length).concat(await findVenueList(handler, params, length, location));

    res.json({ venues: { list: { data: venues || [] } } });

  }

});

venueGetList.injected = { lib: { handler: handleYelpAPI } };

//exports

module.exports = {
  venueGetItem,
  venueGetList
};
