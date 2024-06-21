import React from 'react';

const Loader = () => {
  return (
    <div className="loader-container d-flex justify-content-center align-items-center vh-100">
      <div className="spinner-border spinner-border-lg text-primary" role="status">
        <span className="visually-hidden">Загрузка...</span>
      </div>
    </div>
  );
};

export default Loader;
