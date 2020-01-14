import React from 'react';
import PropTypes from 'prop-types';

const Modal = ({ image: { largeImageURL }, clearImage }) => {
  return (
    <div
      className="Overlay"
      role="presentation"
      onClick={() => clearImage(null)}
    >
      <div className="Modal">
        <img src={largeImageURL} alt={largeImageURL} />
      </div>
    </div>
  );
};

Modal.propTypes = {
  image: PropTypes.shape({
    largeImageURL: PropTypes.string,
  }).isRequired,
  clearImage: PropTypes.func.isRequired,
};

export default Modal;
