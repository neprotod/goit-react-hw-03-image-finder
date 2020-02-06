import React from 'react';
import PropTypes from 'prop-types';

import ImageGalleryItem from '../ImageGalleryItem';

import './ImageGallery.css';

const ImageGallery = ({ images, selectImage }) => {
  const imageItems = images.map(item => {
    const { webformatURL } = item;

    return (
      <ImageGalleryItem
        key={webformatURL}
        image={webformatURL}
        onClick={() => selectImage(item)}
      />
    );
  });

  const { length } = imageItems;
  return (
    <>
      {(length && <ul className="ImageGallery">{imageItems}</ul>) || (
        <div className="no-found">No images</div>
      )}
    </>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  selectImage: PropTypes.func.isRequired,
};

export default ImageGallery;
