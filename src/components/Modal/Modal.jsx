import { useEffect } from 'react';
import { Overlay, Window, ModalImg } from './Modal.styled';
import PropTypes from 'prop-types';

export default function Modal({ largeImage, alt, onClose }) {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);
  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  return (
    <>
      <Overlay className="overlay" onClick={handleBackdropClick}>
        <Window className="modal">
          <ModalImg src={largeImage} alt={alt} />
        </Window>
      </Overlay>
    </>
  );
}

Modal.propTypes = {
  largeImage: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
