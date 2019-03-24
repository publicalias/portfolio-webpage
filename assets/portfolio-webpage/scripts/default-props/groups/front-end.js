"use strict";

//front end

const frontEnd = {
  name: "Front-end",
  id: "front-end",
  subgroups: [{
    name: "Static Projects",
    id: "static-projects",
    projects: [{
      name: "Tribute Page",
      id: "tribute-page",
      comments: "",
      userStories: [
        "I can view a tribute page with an image and text.",
        "I can click on a link that will take me to an external website with further information on the topic."
      ],
      resources: [{
        text: "Terry Pratchett",
        link: "https://dailyzen.co.uk/2015/03/13/eleven-great-quotes-from-terry-pratchett/"
      }],
      preview: "window",
      links: {
        page: "/tribute-page",
        code: "https://github.com/publicalias/portfolio-webpage/tree/master/assets/tribute-page",
        view: "media/screenshots/tribute-page.jpg"
      }
    }, {
      name: "Portfolio Webpage",
      id: "portfolio-webpage",
      comments: "I redesigned this project with React to make it easier to maintain. I also added useful features like a sticky nav bar, a project showcase, and a contact form. My solution to mobile responsiveness was to make everything scale with screen width.",
      userStories: [
        "I can access all of the portfolio webpage's content just by scrolling.",
        "I can click different buttons that will take me to the portfolio creator's different social media pages.",
        "I can see thumbnail images of different projects the portfolio creator has built (if you haven't built any websites before, use placeholders).",
        "I can navigate to different sections of the webpage by clicking buttons in the navigation."
      ],
      resources: [{
        text: "Background",
        link: "https://www.pexels.com/photo/art-backlit-black-and-white-bulb-286908/"
      }, {
        text: "Email Handler",
        link: "https://nodemailer.com/about/"
      }, {
        text: "Favicon",
        link: "https://www.freefavicon.com/"
      }, {
        text: "Fonts",
        link: "https://fonts.google.com/"
      }, {
        text: "Icons",
        link: "http://fontawesome.io/"
      }, {
        text: "Legal Stuff",
        link: "https://www.rocketlawyer.com/"
      }, {
        text: "Placeholders",
        link: "https://placeholder.com/"
      }, {
        text: "reCAPTCHA",
        link: "https://developers.google.com/recaptcha/docs/invisible"
      }],
      preview: "none",
      links: {
        page: "/portfolio-webpage",
        code: {
          client: "https://github.com/publicalias/portfolio-webpage/tree/master/assets/portfolio-webpage",
          server: "https://github.com/publicalias/portfolio-webpage/tree/master/routes/portfolio-webpage"
        }
      }
    }]
  }, {
    name: "API Projects",
    id: "client-api-projects",
    projects: [{
      name: "Random Quote Machine",
      id: "random-quote-machine",
      comments: "",
      userStories: [
        "I can click a button to show me a new random quote.",
        "I can press a button to tweet out a quote."
      ],
      resources: [{
        text: "Quote List",
        link: "http://quotes.stormconsultancy.co.uk/api"
      }],
      preview: "window",
      links: {
        page: "/random-quote-machine",
        code: "https://github.com/publicalias/portfolio-webpage/tree/master/assets/random-quote-machine",
        view: "media/screenshots/random-quote-machine.jpg"
      }
    }, {
      name: "Weather App",
      id: "weather-app",
      comments: "",
      userStories: [
        "I can see the weather in my current location.",
        "I can see a different icon or background image (e.g. snowy mountain, hot desert) depending on the weather.",
        "I can push a button to toggle between Fahrenheit and Celsius."
      ],
      resources: [{
        text: "Weather API",
        link: "https://openweathermap.org/api"
      }],
      preview: "window",
      links: {
        page: "/weather-app",
        code: {
          client: "https://github.com/publicalias/portfolio-webpage/tree/master/assets/weather-app",
          server: "https://github.com/publicalias/portfolio-webpage/tree/master/routes/weather-app"
        },
        view: "media/screenshots/weather-app.jpg"
      }
    }, {
      name: "Wikipedia Viewer",
      id: "wikipedia-viewer",
      comments: "",
      userStories: [
        "I can search Wikipedia entries in a search box and see the resulting Wikipedia entries.",
        "I can click a button to see a random Wikipedia entry."
      ],
      resources: [{
        text: "Wikipedia API",
        link: "https://www.mediawiki.org/wiki/API:Main_page"
      }],
      preview: "window",
      links: {
        page: "/wikipedia-viewer",
        code: "https://github.com/publicalias/portfolio-webpage/tree/master/assets/wikipedia-viewer",
        view: "media/screenshots/wikipedia-viewer.jpg"
      }
    }, {
      name: "Twitch Viewer",
      id: "twitch-viewer",
      comments: "Most users won't be interested in the example channels, so I added a search bar. Search queries are saved to local storage, and you can filter the results.",
      userStories: [
        "I can see whether Free Code Camp is currently streaming on Twitch.tv.",
        "I can click the status output and be sent directly to Free Code Camp's Twitch.tv channel.",
        "If a Twitch user is currently streaming, I can see additional details about what they are streaming.",
        "I will see a placeholder notification if a streamer has closed their Twitch account (or the account never existed). You can verify this works by adding brunofin and comster404 to your array of Twitch streamers."
      ],
      resources: [{
        text: "Twitch API",
        link: "https://dev.twitch.tv/docs"
      }],
      preview: "window",
      links: {
        page: "/twitch-viewer",
        code: {
          client: "https://github.com/publicalias/portfolio-webpage/tree/master/assets/twitch-viewer",
          server: "https://github.com/publicalias/portfolio-webpage/tree/master/routes/twitch-viewer"
        },
        view: "media/screenshots/twitch-viewer.jpg"
      }
    }]
  }, {
    name: "Scripting Projects",
    id: "scripting-projects",
    projects: [{
      name: "JavaScript Calculator",
      id: "javascript-calculator",
      comments: "This was an exercise in handling edge cases. For an extra challenge, I added radix, square, inverse, negate, and memory functions. Rounding error is hidden from the user.",
      userStories: [
        "I can add, subtract, multiply, and divide two numbers.",
        "I can clear the input field with a clear button.",
        "I can keep chaining mathematical operations together until I hit the equal button, and the calculator will tell me the correct output."
      ],
      resources: [],
      preview: "window",
      links: {
        page: "/javascript-calculator",
        code: "https://github.com/publicalias/portfolio-webpage/tree/master/assets/javascript-calculator",
        view: "media/screenshots/javascript-calculator.jpg"
      }
    }, {
      name: "Pomodoro Clock",
      id: "pomodoro-clock",
      comments: "The timer starts and restarts automatically. It also saves your settings to local storage.",
      userStories: [
        "I can start a 25 minute pomodoro, and the timer will go off once 25 minutes have elapsed.",
        "I can reset the clock for my next pomodoro.", "I can customize the length of each pomodoro."
      ],
      resources: [{
        text: "Alarm Sound Effect",
        link: "https://www.freesound.org/people/Rudmer_Rotteveel/sounds/316920/"
      }],
      preview: "window",
      links: {
        page: "/pomodoro-clock",
        code: "https://github.com/publicalias/portfolio-webpage/tree/master/assets/pomodoro-clock",
        view: "media/screenshots/pomodoro-clock.jpg"
      }
    }, {
      name: "Tic Tac Toe Game",
      id: "tic-tac-toe-game",
      comments: "Because the computer's algorithm is unbeatable by design, you can choose to play against another player. The game keeps score and counts games played.",
      userStories: [
        "I can play a game of Tic Tac Toe with the computer.",
        "My game will reset as soon as it's over so I can play again.",
        "I can choose whether I want to play as X or O."
      ],
      resources: [{
        text: "Minimax Algorithm",
        link: "https://en.wikipedia.org/wiki/Minimax"
      }],
      preview: "window",
      links: {
        page: "/tic-tac-toe-game",
        code: "https://github.com/publicalias/portfolio-webpage/tree/master/assets/tic-tac-toe-game",
        view: "media/screenshots/tic-tac-toe-game.jpg"
      }
    }, {
      name: "Simon Game",
      id: "simon-game",
      comments: "The hardest part was getting the buttons just right. I ended up using a custom SVG.",
      userStories: [
        "I am presented with a random series of button presses.",
        "Each time I input a series of button presses correctly, I see the same series of button presses but with an additional step.",
        "I hear a sound that corresponds to each button both when the series of button presses plays and when I personally press a button.",
        "If I press the wrong button, I am notified that I have done so, and that series of button presses starts again to remind me of the pattern so I can try again.",
        "I can see how many steps are in the current series of button presses.",
        "If I want to restart, I can hit a button to do so, and the game will return to a single step.",
        "I can play in strict mode where if I get a button press wrong, it notifies me that I have done so, and the game restarts at a new random series of button presses.",
        "I can win the game by getting a series of 20 steps correct. I am notified of my victory, then the game starts over."
      ],
      resources: [{
        text: "Button Sound Effects",
        link: "https://www.freesound.org/people/pinkyfinger/packs/4409/"
      }, {
        text: "Lose Sound Effect",
        link: "https://www.freesound.org/people/freki3333/sounds/131594/"
      }, {
        text: "Win Sound Effect",
        link: "https://www.freesound.org/people/nc3studios08/sounds/354038/"
      }],
      preview: "window",
      links: {
        page: "/simon-game",
        code: "https://github.com/publicalias/portfolio-webpage/tree/master/assets/simon-game",
        view: "media/screenshots/simon-game.jpg"
      }
    }]
  }]
};

//exports

module.exports = { frontEnd };
