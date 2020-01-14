/* eslint-disable no-alert */
import React, { Component } from 'react';

import Pixabay from '../../services/Pixabay';
import Searchbar from '../Searchbar';
import ImageGallery from '../ImageGallery';

import './App.css';

export default class App extends Component {
  pixabay = new Pixabay();

  state = {
    find: '',
    images: [],
    select: null,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { find } = this.state;
    if (prevState.find === find) return false;

    const { pixabay } = this;

    const images = await pixabay.getResourse(find);

    this.setState({
      images,
      select: null,
    });
  }

  submitSearchbar = find => {
    this.setState({
      find,
    });
  };

  selectImage = select => {
    this.setState({
      select
    });
  };

  render() {
    const { images } = this.state;
    const { submitSearchbar, selectImage } = this;
    return (
      <>
        <Searchbar onSubmit={submitSearchbar} />
        <ImageGallery images={images} selectImage={selectImage} />
      </>
    );
  }
}
