import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Searchbar.css';

export default class Searchbar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    input: '',
  };

  handlerInput = e => {
    this.setState({
      input: e.target.value,
    });
  };

  handlerSubmit = e => {
    e.preventDefault();
    const { input } = this.state;
    const { onSubmit } = this.props;
    // Reset input
    this.setState({
      input: '',
    });
    onSubmit(input);
  };

  render() {
    const { input } = this.state;
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.handlerSubmit}>
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">Search</span>
          </button>

          <input
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            placeholder="Search images and photos"
            value={input}
            onChange={this.handlerInput}
          />
        </form>
      </header>
    );
  }
}
