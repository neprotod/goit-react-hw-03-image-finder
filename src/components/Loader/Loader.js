import React from 'react';
import Spiner from 'react-loader-spinner';
import PropTypes from 'prop-types';

import './Loader.css';

const Loader = ({ children, load }) => {
  const loader = (
    <div className="Loader">
      <Spiner clas type="Grid" color="#00BFFF" height={80} width={80} />
    </div>
  );

  return (
    <>
      {children}
      {load && loader}
    </>
  );
};

Loader.propTypes = {
  children: PropTypes.node.isRequired,
  load: PropTypes.bool.isRequired,
};

export default Loader;
