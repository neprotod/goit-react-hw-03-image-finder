import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loader from '../Loader';

import './Modal.css';

export default class Modal extends Component {
  static propTypes = {
    image: PropTypes.shape({
      largeImageURL: PropTypes.string,
    }).isRequired,
    clearImage: PropTypes.func.isRequired,
  };

  state = {
    load: true,
  };

  handlerLoad = () => {
    this.setState({
      load: false,
    });
  };

  render() {
    const { load } = this.state;
    const {
      image: { largeImageURL },
      clearImage,
    } = this.props;

    return (
      <div
        className="Overlay"
        role="presentation"
        onClick={() => clearImage(null)}
      >
        <div className="Modal">
          <Loader load={load}>
            <img
              src={largeImageURL}
              alt={largeImageURL}
              onLoad={this.handlerLoad}
            />
          </Loader>
        </div>
      </div>
    );
  }
}
