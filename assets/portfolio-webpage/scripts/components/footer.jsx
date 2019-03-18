"use strict";

//node modules

const React = require("react");

//footer

const Footer = (props) => {

  const { footer: { terms, privacy } } = props;

  return (
    <div className="c-content--xl c-footer">
      <div className="c-row">
        <div className="c-row__col--4">
          <a className="c-footer__link" href={terms.link}>
            <h3>{terms.text}</h3>
          </a>
        </div>
        <div className="c-row__col--8">
          <a className="c-footer__link" href={privacy.link}>
            <h3>{privacy.text}</h3>
          </a>
        </div>
      </div>
    </div>
  );

};

//exports

module.exports = Footer;
