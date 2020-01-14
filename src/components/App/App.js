/* eslint-disable no-alert */
import React, { Component } from 'react';

import Pixabay from '../../services/Pixabay';
import Searchbar from '../Searchbar';
import ImageGallery from '../ImageGallery';
import Modal from '../Modal';
import Button from '../Button';
import Loader from '../Loader';

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

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    const images = await pixabay.getResourse(find);

    // eslint-disable-next-line react/no-did-update-set-state
    this.setState({
      images,
      select: null,
    });

    return true;
  }

  nextPage = async () => {
    const { images: prevImages } = this.state;
    const { pixabay } = this;

    const images = await pixabay.nextPage(prevImages);

    this.setState({
      images,
    });

    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  submitSearchbar = find => {
    this.setState({
      find,
    });
  };

  selectImage = select => {
    this.setState({
      select,
    });
  };

  render() {
    const { images, select } = this.state;
    const { submitSearchbar, selectImage, nextPage } = this;

    const imagesLength = images.length > 0;
    return (
      <>
        <Searchbar onSubmit={submitSearchbar} />
        <ImageGallery images={images} selectImage={selectImage} />
        {imagesLength && <Button nextPage={nextPage} />}
        {select && <Modal image={select} clearImage={selectImage} />}
        <Loader />
      </>
    );
  }
}
