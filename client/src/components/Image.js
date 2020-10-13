import React from 'react';

const Image = ({ image, handleImageRemove = (f) => f }) => (
  <img
    onClick={() => handleImageRemove(image.public_id)}
    className="img-thumbnail m-3"
    style={{ height: '100px' }}
    src={image.url}
    alt={image.public_id}
  />
);

export default Image;
