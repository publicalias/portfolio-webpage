"use strict";

//back end

const backEnd = {
  name: "Back-end",
  id: "back-end",
  subgroups: [{
    name: "API Projects",
    id: "server-api-projects",
    projects: [{
      name: "Timestamp API",
      id: "timestamp-api",
      comments: "The API can parse multiple natural language dates (thanks to Chrono) but not multiple Unix dates. The latter group is indistinguishable from ordinary numbers.",
      userStories: [
        "I can pass a string as a parameter, and it will check to see whether that string contains either a Unix timestamp or a natural language date (example: January 1, 2016).",
        "If it does, it returns both the Unix timestamp and the natural language form of that date.",
        "If it does not contain a date or Unix timestamp, it returns null for those properties."
      ],
      resources: [],
      preview: "button",
      links: {
        page: "/timestamp-api",
        code: "https://github.com/publicalias/portfolio-webpage/tree/master/assets/timestamp-api"
      }
    }, {
      name: "Header Parser API",
      id: "header-parser-api",
      comments: "",
      userStories: ["I can get the IP address, language, and operating system for my browser."],
      resources: [],
      preview: "button",
      links: {
        page: "/header-parser-api",
        code: "https://github.com/publicalias/portfolio-webpage/tree/master/assets/header-parser-api"
      }
    }, {
      name: "URL Shortener API",
      id: "url-shortener-api",
      comments: "Duplicate URLs return the existing code, and new codes are generated on demand. In production, unused codes could be stored in a separate collection.",
      userStories: [
        "I can pass a URL as a parameter and I will receive a shortened URL in the JSON response.",
        "If I pass an URL that doesn't follow the valid http://www.example.com format, the JSON response will contain an error instead.",
        "When I visit that shortened URL, it will redirect me to my original link."
      ],
      resources: [],
      preview: "button",
      links: {
        page: "/url-shortener-api",
        code: "https://github.com/publicalias/portfolio-webpage/tree/master/assets/url-shortener-api"
      }
    }, {
      name: "Image Search API",
      id: "image-search-api",
      comments: "",
      userStories: [
        "I can get the image URLs, alt text, and page URLs for a set of images relating to a given search string.",
        "I can paginate through the responses by adding a ?offset=2 parameter to the URL.",
        "I can get a list of the most recently submitted search strings."
      ],
      resources: [{
        text: "Custom Search API",
        link: "https://developers.google.com/custom-search/json-api/v1/overview"
      }],
      preview: "button",
      links: {
        page: "/image-search-api",
        code: "https://github.com/publicalias/portfolio-webpage/tree/master/assets/image-search-api"
      }
    }, {
      name: "File Metadata API",
      id: "file-metadata-api",
      comments: "",
      userStories: [
        "I can submit a FormData object that includes a file upload.",
        "When I submit something, I will receive the file size in bytes within the JSON response."
      ],
      resources: [],
      preview: "button",
      links: {
        page: "/file-metadata-api",
        code: "https://github.com/publicalias/portfolio-webpage/tree/master/assets/file-metadata-api"
      }
    }]
  }, {
    name: "Full-stack Projects",
    id: "full-stack-projects",
    projects: [{
      name: "Voting App",
      id: "voting-app",
      comments: "This app lets you create private polls, hide/flag polls, and search, sort, and filter the full list of polls. It also lets you log in with social media and delete your account (and all your data) in three clicks. It's the most painless trial experience imaginable.",
      userStories: [
        "As an authenticated user, I can keep my polls and come back later to access them.",
        "As an authenticated user, I can share my polls with my friends.",
        "As an authenticated user, I can see the aggregate results of my polls.",
        "As an authenticated user, I can delete polls that I decide I don't want anymore.",
        "As an authenticated user, I can create a poll with any number of possible items.",
        "As an unauthenticated or authenticated user, I can see and vote on everyone's polls.",
        "As an unauthenticated or authenticated user, I can see the results of polls in chart form. (This could be implemented using Chart.js or Google Charts.)",
        "As an authenticated user, if I don't like the options on a poll, I can create a new option."
      ],
      resources: [{
        text: "Facebook Login",
        link: "https://developers.facebook.com/docs/facebook-login"
      }, {
        text: "GitHub Login",
        link: "https://developer.github.com/apps/building-oauth-apps/"
      }, {
        text: "Twitter Login",
        link: "https://developer.twitter.com/en/docs/twitter-for-websites/log-in-with-twitter/login-in-with-twitter"
      }],
      preview: "window",
      links: {
        page: "/voting-app",
        code: "https://github.com/publicalias/portfolio-webpage/tree/master/assets/voting-app",
        view: "/portfolio-webpage/media/screenshots/voting-app.jpg"
      }
    }, {
      name: "Nightlife App",
      id: "nightlife-app",
      comments: "",
      userStories: [
        "As an unauthenticated user, I can view all bars in my area.",
        "As an authenticated user, I can add myself to a bar to indicate I am going there tonight.",
        "As an authenticated user, I can remove myself from a bar if I no longer want to go there.",
        "As an unauthenticated user, when I log in, I should not have to search again."
      ],
      resources: [],
      preview: "window",
      links: {
        page: "",
        code: "",
        view: ""
      }
    }, {
      name: "Stock Market App",
      id: "stock-market-app",
      comments: "",
      userStories: [
        "I can view a graph displaying the recent trend lines for each added stock.",
        "I can add new stocks by their symbol name.",
        "I can remove stocks.",
        "I can see changes in real-time when any other user adds or removes a stock. For this, you will need to use WebSockets."
      ],
      resources: [],
      preview: "window",
      links: {
        page: "",
        code: "",
        view: ""
      }
    }, {
      name: "Book Trading Club",
      id: "book-trading-club",
      comments: "",
      userStories: [
        "I can view all books posted by every user.",
        "I can add a new book.",
        "I can update my settings to store my full name, city, and state.",
        "I can propose a trade and wait for the other user to accept the trade."
      ],
      resources: [],
      preview: "window",
      links: {
        page: "",
        code: "",
        view: ""
      }
    }, {
      name: "Pinterest Clone",
      id: "pinterest-clone",
      comments: "",
      userStories: [
        "As an unauthenticated user, I can log in with Twitter.",
        "As an authenticated user, I can link to images.",
        "As an authenticated user, I can delete images that I've linked to.",
        "As an authenticated user, I can see a Pinterest-style wall of all the images I've linked to.",
        "As an unauthenticated user, I can browse other users' walls of images.",
        "As an authenticated user, if I upload an image that is broken, it will be replaced by a placeholder image. (You can use jQuery broken image detection.)"
      ],
      resources: [],
      preview: "window",
      links: {
        page: "",
        code: "",
        view: ""
      }
    }]
  }]
};

//exports

module.exports = { backEnd };
