import React, { Component } from "react";
import Header from "../components/Header";
import { Link } from "react-router-dom";

export default class Default extends Component {
  render() {
    return (
      <Header styleClass={"default-hero"} title="404">
        <Link to="/" className="btn btn-secondary btn-lg text-uppercase mt-3">
          return home
        </Link>
      </Header>
    );
  }
}
