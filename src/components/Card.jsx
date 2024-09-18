import React from 'react';
import '../styles/Card.css';

function Card({ id, title, tag = [], status, priority }) {
  const tagText = Array.isArray(tag) ? tag.join(', ') : '';

  return (
    <div className="card">  
      <div className="card-content">
        <div className="card-header">
          <h2 className="card-title">{id}</h2>
          <span className="badge">
            <span className="badge-dot"></span>
            {priority}
          </span>
        </div>
        <h3 className="card-subtitle">
          {title}
        </h3>
        <p className="card-description">
          Status: {status}
        </p>
      </div>
      <div className="card-footer">
        <div className="feature-request">
          <span className="feature-dot"></span>
          {tagText}
        </div>
      </div>
    </div>
  );
}

export default Card;
