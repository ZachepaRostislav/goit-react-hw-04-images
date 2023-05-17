import React from 'react';
import ImageGalleryItem from 'components/ImageGalleryItem';
import { List } from './ImageGallery.styled';
import PropTypes from 'prop-types';

export default function ImageGallery({ hits, toggleModal }) {
  return (
    <>
      <List className="gallery">
        {hits.map(hit => (
          <ImageGalleryItem
            key={hit.webformatURL}
            id={hit.id}
            previewImg={hit.webformatURL}
            tags={hit.tags}
            toggleModal={() => toggleModal({ largeImageURL: hit.largeImageURL, alt: hit.tags })}
          />
        ))}
      </List>
    </>
  );
}

ImageGallery.propTypes = {
  hits: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.number.isRequired,
      tags: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ).isRequired,
  toggleModal: PropTypes.func.isRequired,
};
