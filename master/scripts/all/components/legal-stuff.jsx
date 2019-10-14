"use strict";

//node modules

const React = require("react");

//legal stuff

const LegalStuff = () => (
  <div className="c-content--xl c-legal-stuff">
    <div className="c-grid">
      <div className="c-grid__item--4">
        <a className="c-legal-stuff__link" href="/terms-and-conditions">
          <h3>Terms and Conditions</h3>
        </a>
      </div>
      <div className="c-grid__item--8">
        <a className="c-legal-stuff__link" href="/privacy-policy">
          <h3>Privacy Policy</h3>
        </a>
      </div>
    </div>
  </div>
);

LegalStuff.propList = [];

//exports

module.exports = LegalStuff;
