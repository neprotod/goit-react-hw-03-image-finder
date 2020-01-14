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
    load: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { find } = this.state;
    if (prevState.find === find) return false;

    const { pixabay, loading } = this;

    loading(true);

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

    loading(false);

    return true;
  }

  nextPage = async () => {
    const { images: prevImages } = this.state;
    const { pixabay, loading } = this;

    loading(true);

    const images = await pixabay.nextPage(prevImages);

    this.setState({
      images,
    });

    loading(false);

    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  loading = load => {
    this.setState({
      load,
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
    const { images, select, load } = this.state;
    const { submitSearchbar, selectImage, nextPage } = this;

    const imagesLength = images.length > 0;
    return (
      <>
        <Searchbar onSubmit={submitSearchbar} />
        <Loader load={load}>
          <ImageGallery images={images} selectImage={selectImage} />
        </Loader>
        {imagesLength && <Button nextPage={nextPage} />}
        {select && <Modal image={select} clearImage={selectImage} />}
      </>
    );
  }
}
