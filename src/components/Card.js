// client/src/components/Card.js
import React from 'react';

const Card = ({ title, text, imageUrl, className }) => {
  return (
    <div className={`custom-card ${className}`}>
      <img src={imageUrl} alt={title} />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{text}</p>
      </div>
    </div>
  );
};

export default Card;
