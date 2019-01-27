"use strict";

/*global grecaptcha*/

//local imports

const ContactForm = require("./contact-form");
const MediaIcons = require("./media-icons");

const { loadReCaptcha, resetForm } = require("../app-logic");

//global imports

const { bindReactClass } = require("react-utils");

//node modules

const React = require("react");

//contact

class Contact extends React.Component {

  constructor(props) {

    super(props);

    this.state = resetForm(0);

    bindReactClass(this);

  }

  //recaptcha

  async getReCaptcha(data) {

    const body = {
      method: "POST",
      body: JSON.stringify(Object.assign({ verify: data }, this.state)),
      headers: new Headers({ "Content-Type": "application/json" })
    };

    this.setState({ btnIndex: 1 });

    try {

      const res = await fetch("/portfolio-webpage/contact", body);

      if (!res.ok) {
        throw Error(`${res.status} ${res.statusText}`);
      }

      this.setState(resetForm(2));

    } catch (err) {
      this.setState({ btnIndex: 3 });
    }

    grecaptcha.reset();

  }

  //handle events

  handleChange(event) {

    const { name, value } = event.target;

    if (this.state.btnIndex !== 1) {
      this.setState({
        [name]: value,
        btnIndex: 0
      });
    }

  }

  handleSubmit(event) {

    event.preventDefault();

    grecaptcha.execute();

  }

  //lifecycle

  componentDidMount() {

    window.getReCaptcha = this.getReCaptcha; //callback must precede script

    loadReCaptcha();

  }

  render() {
    return (
      <div className="c-content--xl js-scroll-contact">
        <div className="c-row">
          <div className="c-row__col--4">
            <h1>Contact</h1>
          </div>
          <div className="c-row__col--8">
            <ContactForm
              body={this.state.body}
              btnIndex={this.state.btnIndex}
              email={this.state.email}
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
              subject={this.state.subject}
            />
            <MediaIcons contact={this.props.contact} />
            <div
              className="g-recaptcha"
              data-callback="getReCaptcha"
              data-sitekey="6LexgzMUAAAAAE0tcL9o2_Tt0Clqk8xpQhhdlFDO"
              data-size="invisible"
            />
          </div>
        </div>
      </div>
    );
  }

}

//exports

module.exports = Contact;
