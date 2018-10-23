"use strict";

//local imports

const RecipeBox = require("./scripts/recipe-box");
const RecipeEditor = require("./scripts/recipe-editor");

//global imports

const { closePanel, initPanel } = require("accordion");
const { checkInput } = require("check-input");
const { modalEvents, toggleModal } = require("modal");
const { bindReactClass, initKeyGen } = require("react-utils");
const { deepCopy, storageKey, wrapFn } = require("utilities");

//node modules

const React = require("react");
const ReactDOM = require("react-dom");

//app logic

class App extends React.Component {

  constructor(props) {

    super(props);

    const list = storageKey("recipes") || [{
      num: 0,
      name: "Fluffy Pancakes",
      com: "Tall and fluffy. These pancakes are just right. Topped with strawberries and whipped cream, they are impossible to resist.",
      ingr: "3/4 cup milk\n2 tablespoons white vinegar\n1 cup all-purpose flour\n2 tablespoons white sugar\n1 teaspoon baking powder\n1/2 teaspoon baking soda\n1/2 teaspoon salt\n1 egg\n2 tablespoons butter, melted",
      inst: "Combine milk with vinegar in a medium bowl and set aside for 5 minutes to \"sour\".\nCombine flour, sugar, baking powder, baking soda, and salt in a large mixing bowl. Whisk egg and butter into \"soured\" milk. Pour the flour mixture into the wet ingredients and whisk until lumps are gone.\nHeat a large skillet over medium heat, and coat with cooking spray. Pour 1/4 cupfuls of batter onto the skillet, and cook until bubbles appear on the surface. Flip with a spatula, and cook until browned on the other side."
    }, {
      num: 1,
      name: "Cashew Crusted Chicken",
      com: "Chicken breasts dipped in an apricot/mustard sauce, then rolled in chopped cashew nuts for a wonderfully tangy, crunchy and easy baked chicken dish. This recipe will satisfy anyone!",
      ingr: "1 (12 ounce) jar apricot preserves\n1/4 cup prepared Dijon-style mustard\n1 teaspoon curry powder\n4 skinless, boneless chicken breast halves\n1 cup coarsely chopped cashews",
      inst: "Preheat oven to 375 degrees F (190 degrees C).\nCombine the preserves, mustard and curry powder in a large skillet and heat over low heat, stirring constantly, until preserves are completely melted and smooth.\nPlace cashews in a shallow dish or bowl. Dip chicken breasts in skillet sauce, then roll in nuts to coat and place in a lightly greased 9x13 inch baking dish.\nBake at 375 degrees F (190 degrees C) for 20 to 30 minutes. Boil any remaining sauce and serve on the side with the baked chicken."
    }, {
      num: 2,
      name: "Zucchini Brownies",
      com: "Moist chocolate brownies with frosting!",
      ingr: "1/2 cup vegetable oil\n1 1/2 cups white sugar\n2 teaspoons vanilla extract\n2 cups all-purpose flour\n1/2 cup unsweetened cocoa powder\n1 1/2 teaspoons baking soda\n1 teaspoon salt\n2 cups shredded zucchini\n1/2 cup chopped walnuts\n6 tablespoons unsweetened cocoa powder\n1/4 cup margarine\n2 cups confectioners' sugar\n1/4 cup milk\n1/2 teaspoon vanilla extract",
      inst: "Preheat oven to 350 degrees F (175 degrees C). Grease and flour a 9x13 inch baking pan.\nIn a large bowl, mix together the oil, sugar and 2 teaspoons vanilla until well blended. Combine the flour, 1/2 cup cocoa, baking soda and salt and stir into the sugar mixture. Fold in the zucchini and walnuts. Spread evenly into the prepared pan.\nBake for 25 to 30 minutes in the preheated oven, until brownies spring back when gently touched. To make the frosting, melt together the 6 tablespoons of cocoa and margarine and set aside to cool. In a medium bowl, blend together the confectioners' sugar, milk and 1/2 teaspoon vanilla. Stir in the cocoa mixture. Spread over cooled brownies before cutting into squares."
    }];

    this.state = {
      list,
      modalNum: null
    };

    bindReactClass(this);

  }

  //update list

  updateList(entry, type) {

    const list = deepCopy(this.state.list);

    const save = () => {
      this.setState({ list }, () => {
        storageKey("recipes", this.state.list);
      });
    };

    switch (type) {
      case "add":
        list.push(entry);
        save();
        break;
      case "remove":
        list.splice(entry.num, 1);
        list.forEach((e, i) => {
          e.num = i;
        });
        closePanel();
        setTimeout(save, 500);
        break;
      case "edit":
        list[entry.num] = entry;
        save();
    }

  }

  //open editor

  displayModal(num) {
    if (this.state.modalNum === num) {
      toggleModal(true);
    } else {
      this.setState({ modalNum: num }, wrapFn(toggleModal, true));
    }
  }

  //add recipe

  handleAdd() {

    closePanel();

    this.displayModal(this.state.list.length);

  }

  //lifecycle

  componentDidMount() {
    initPanel();
    checkInput();
    modalEvents();
  }

  componentDidUpdate() {
    initPanel();
  }

  render() {

    const keyGen = initKeyGen();

    const entry = this.state.list[this.state.modalNum];

    return [
      <RecipeBox
        displayModal={this.displayModal}
        handleAdd={this.handleAdd}
        key={keyGen("recipe-box")}
        list={this.state.list}
        updateList={this.updateList}
      />,
      <RecipeEditor
        entry={entry}
        key={keyGen(entry ? entry.name : "undefined")}
        modalNum={this.state.modalNum}
        updateList={this.updateList}
        used={this.state.list.map((e) => e.name)}
      />
    ];

  }

}

//initialize app

ReactDOM.render(<App />, document.querySelector(".js-render-react"));
