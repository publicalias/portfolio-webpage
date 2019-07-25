"use strict";

//node modules

const React = require("react");

//legal stuff

const LegalStuff = () => (
  <div className="c-content--xl c-legal-stuff">
    <div className="c-row">
      <div className="c-row__col--4">
        <a className="c-legal-stuff__link" href="/terms-and-conditions">
          <h3>Terms and Conditions</h3>
        </a>
      </div>
      <div className="c-row__col--8">
        <a className="c-legal-stuff__link" href="/privacy-policy">
          <h3>Privacy Policy</h3>
        </a>
      </div>
    </div>
  </div>
);

//exports

module.exports = LegalStuff;
