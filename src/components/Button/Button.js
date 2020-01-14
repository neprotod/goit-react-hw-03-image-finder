import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ nextPage }) => {
  return (
    <button className="Button" type="button" onClick={nextPage}>
      Load more
    </button>
  );
};
Button.propTypes = {
  nextPage: PropTypes.func.isRequired,
};

export default Button;
