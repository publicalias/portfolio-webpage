"use strict";

//data vis

const dataVis = {
  name: "Data Vis",
  id: "data-vis",
  subgroups: [{
    name: "React Projects",
    id: "react-projects",
    projects: [{
      name: "Markdown Previewer",
      id: "markdown-previewer",
      comments: "",
      userStories: [
        "I can type GitHub-flavored Markdown into a text area.",
        "I can see a preview of the output of my markdown that is updated as I type."
      ],
      resources: [{
        text: "Markdown Parser",
        link: "https://github.com/markedjs/marked"
      }],
      preview: "window",
      links: {
        page: "/markdown-previewer",
        code: "https://github.com/publicalias/portfolio-webpage/tree/master/assets/markdown-previewer",
        view: "/portfolio-webpage/media/screenshots/markdown-previewer.jpg"
      }
    }, {
      name: "Camper Leaderboard",
      id: "camper-leaderboard",
      comments: "This project depends on a broken API.",
      userStories: [
        "I can see a table of the Free Code Camp campers who've earned the most brownie points in the past 30 days.",
        "I can see how many brownie points they've earned in the past 30 days and how many they've earned total.",
        "I can toggle between sorting the list by how many brownie points they've earned in the past 30 days and by how many brownie points they've earned total."
      ],
      resources: [{
        text: "Camper Data Set 1",
        link: "https://fcctop100.herokuapp.com/api/fccusers/top/recent"
      }, {
        text: "Camper Data Set 2",
        link: "https://fcctop100.herokuapp.com/api/fccusers/top/alltime"
      }],
      preview: "none",
      links: {
        page: "/camper-leaderboard",
        code: "https://github.com/publicalias/portfolio-webpage/tree/master/assets/camper-leaderboard"
      }
    }, {
      name: "Recipe Box",
      id: "recipe-box",
      comments: "",
      userStories: [
        "I can create recipes that have names and ingredients.",
        "I can see an index view where the names of all the recipes are visible.",
        "I can click into any of those recipes to view it.", "I can edit these recipes.",
        "I can delete these recipes.",
        "All new recipes I add are saved in my browser's local storage. If I refresh the page, these recipes will still be there."
      ],
      resources: [{
        text: "Example Recipe 1",
        link: "http://allrecipes.com/recipe/162760/fluffy-pancakes/"
      }, {
        text: "Example Recipe 2",
        link: "http://allrecipes.com/recipe/19132/cashew-crusted-chicken/"
      }, {
        text: "Example Recipe 3",
        link: "http://allrecipes.com/recipe/25112/zucchini-brownies/"
      }],
      preview: "window",
      links: {
        page: "/recipe-box",
        code: "https://github.com/publicalias/portfolio-webpage/tree/master/assets/recipe-box",
        view: "/portfolio-webpage/media/screenshots/recipe-box.jpg"
      }
    }, {
      name: "Game of Life",
      id: "game-of-life",
      comments: "This version of Conway's Game of Life is packed with extra features to help you analyze how patterns unfold. You can set the speed, color, and scale; save and load cultures; step through one generation at a time; backtrack; and edit the ruleset.",
      userStories: [
        "When I first arrive at the game, it will randomly generate a board and start playing.",
        "I can start and stop the board.",
        "I can set up the board.",
        "I can clear the board.",
        "When I press start, the game will play out.",
        "Each time the board changes, I can see how many generations have gone by."
      ],
      resources: [],
      preview: "window",
      links: {
        page: "/game-of-life",
        code: "https://github.com/publicalias/portfolio-webpage/tree/master/assets/game-of-life",
        view: "/portfolio-webpage/media/screenshots/game-of-life.jpg"
      }
    }, {
      name: "Dungeon Crawler Game",
      id: "dungeon-crawler-game",
      comments: "This game's minimalist UI conceals a stealth theme, strategic play, and a simple story with multiple endings. You can learn abilities, pick locks, and loot maps. Some enemies chase you, and some can see through stealth. NG+ introduces new challenges. To soften the learning curve, enemies and objects display tooltips on hover, and clicking a button displays level-based hints. The game's state is saved to local storage every second. There is no reset button.",
      userStories: [
        "I have health, a level, and a weapon. I can pick up a better weapon. I can pick up health items.",
        "All the items and enemies on the map are arranged at random.",
        "I can move throughout a map, discovering items.",
        "I can move anywhere within the map's boundaries, but I can't move through an enemy until I've beaten it.",
        "Much of the map is hidden. When I take a step, all spaces that are within a certain number of spaces from me are revealed.",
        "When I beat an enemy, the enemy goes away and I get XP, which eventually increases my level.",
        "When I fight an enemy, we take turns damaging each other until one of us loses. I do damage based off of my level and my weapon. The enemy does damage based off of its level. Damage is somewhat random within a range.",
        "When I find and beat the boss, I win.",
        "The game should be challenging but theoretically winnable."
      ],
      resources: [{
        text: "Maze Generation Algorithm",
        link: "https://en.wikipedia.org/wiki/Maze_generation_algorithm#Recursive_backtracker"
      }, {
        text: "Circle Reference",
        link: "https://donatstudios.com/PixelCircleGenerator"
      }],
      preview: "window",
      links: {
        page: "/dungeon-crawler-game",
        code: "https://github.com/publicalias/portfolio-webpage/tree/master/assets/dungeon-crawler-game",
        view: "/portfolio-webpage/media/screenshots/dungeon-crawler-game.jpg"
      }
    }]
  }, {
    name: "D3 Projects",
    id: "d3-projects",
    projects: [{
      name: "Bar Chart",
      id: "bar-chart",
      comments: "",
      userStories: [
        "I can see US Gross Domestic Product by quarter, over time.",
        "I can mouse over a bar and see a tooltip with the GDP amount and exact year and month that bar represents."
      ],
      resources: [{
        text: "GDP Data Set",
        link: "https://github.com/freeCodeCamp/ProjectReferenceData/blob/master/GDP-data.json"
      }],
      preview: "window",
      links: {
        page: "/bar-chart",
        code: "https://github.com/publicalias/portfolio-webpage/tree/master/assets/bar-chart",
        view: "/portfolio-webpage/media/screenshots/bar-chart.jpg"
      }
    }, {
      name: "Scatterplot Graph",
      id: "scatterplot-graph",
      comments: "",
      userStories: [
        "I can see performance time visualized in a scatterplot graph.",
        "I can mouse over a plot to see a tooltip with additional details."
      ],
      resources: [{
        text: "Cyclist Data Set",
        link: "https://github.com/freeCodeCamp/ProjectReferenceData/blob/master/cyclist-data.json"
      }],
      preview: "window",
      links: {
        page: "/scatterplot-graph",
        code: "https://github.com/publicalias/portfolio-webpage/tree/master/assets/scatterplot-graph",
        view: "/portfolio-webpage/media/screenshots/scatterplot-graph.jpg"
      }
    }, {
      name: "Heat Map",
      id: "heat-map",
      comments: "",
      userStories: [
        "I can view a heat map with data represented both on the Y and the X axis.",
        "Each cell is colored based on its relationship to other data.",
        "I can mouse over a cell in the heat map to get more exact information."
      ],
      resources: [{
        text: "Temperature Data Set",
        link: "https://github.com/freeCodeCamp/ProjectReferenceData/blob/master/global-temperature.json"
      }],
      preview: "window",
      links: {
        page: "/heat-map",
        code: "https://github.com/publicalias/portfolio-webpage/tree/master/assets/heat-map",
        view: "/portfolio-webpage/media/screenshots/heat-map.jpg"
      }
    }, {
      name: "Force-directed Graph",
      id: "force-directed-graph",
      comments: "Nodes display tooltips and highlight links on hover. You can turn the tooltips off to see the links better.",
      userStories: [
        "I can see a force-directed graph that shows which countries share borders.",
        "I can see each country's flag on its node."
      ],
      resources: [{
        text: "Country Data Set",
        link: "https://github.com/DealPete/forceDirected/blob/master/countries.json"
      }, {
        text: "Most Country Flags",
        link: "https://github.com/hjnilsson/country-flags"
      }, {
        text: "Kosovo Flag",
        link: "https://commons.wikimedia.org/wiki/File:Flag_of_Kosovo.svg"
      }],
      preview: "window",
      links: {
        page: "/force-directed-graph",
        code: "https://github.com/publicalias/portfolio-webpage/tree/master/assets/force-directed-graph",
        view: "/portfolio-webpage/media/screenshots/force-directed-graph.jpg"
      }
    }, {
      name: "Orthographic Projection",
      id: "orthographic-projection",
      comments: "I chose a 3D globe for the world map. The buttons rotate it along its X and Y axes.",
      userStories: [
        "I can see where all meteorites landed on a world map.",
        "I can tell the relative size of the meteorite just by looking at the way it's represented on the map.",
        "I can mouse over the meteorite's data point for additional data."
      ],
      resources: [{
        text: "Geocoding API",
        link: "https://developers.google.com/maps/documentation/geocoding/start"
      }, {
        text: "Meteorite Data Set",
        link: "https://github.com/freeCodeCamp/ProjectReferenceData/blob/master/meteorite-strike-data.json"
      }, {
        text: "World Map",
        link: "https://github.com/topojson/world-atlas"
      }],
      preview: "window",
      links: {
        page: "/orthographic-projection",
        code: {
          client: "https://github.com/publicalias/portfolio-webpage/tree/master/assets/orthographic-projection",
          server: "https://github.com/publicalias/portfolio-webpage/tree/master/routes/orthographic-projection"
        },
        view: "/portfolio-webpage/media/screenshots/orthographic-projection.jpg"
      }
    }]
  }]
};

//exports

module.exports = { dataVis };
