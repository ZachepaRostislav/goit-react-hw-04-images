import React from 'react';
import { useState, useEffect, useRef } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Loader from './Loader';
import Modal from './Modal';
import { requestImages } from 'services/api';
import { ToastContainer } from 'react-toastify';

export default function App() {
  const [imageName, setImageName] = useState('');
  const [hits, setHits] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [alt, setAlt] = useState(null);
  const [totalImages, setTotalImages] = useState(0);
  const imageNameRef = useRef();
  useEffect(() => {
    if (!imageName) {
      return;
    }
    fetchImages();
  }, [imageName, page]);

  const fetchImages = () => {
    setIsLoading(true);
    requestImages(imageName, page)
      .then(data => {
        const newHits = data.hits;
        if (newHits.length === 0) {
          return;
        }
        setHits(prevHits => [...prevHits, ...newHits]);
        setTotalImages(data.totalHits);
      })
      .catch(error => {
        setError(error);
        console.error('Error:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleFormSubmit = imageName => {
    if (imageName === imageNameRef.current) {
      alert('change your value');
    }
    setImageName(imageName);
    setHits([]);
    setPage(1);
    setTotalImages(0);
    imageNameRef.current = imageName;
  };

  const incrementPage = () => {
    setPage(page + 1);
  };

  const toggleModal = (largeImage, alt) => {
    setShowModal(!showModal);
    setSelectedImage(largeImage);
    setAlt(alt);
  };

  return (
    <>
      <ToastContainer />
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery
        hits={hits}
        isLoading={isLoading}
        toggleModal={toggleModal}
      />
      {showModal && (
        <Modal onClose={toggleModal} largeImage={selectedImage} alt={alt} />
      )}
      {isLoading && <Loader />}
      {!isLoading && totalImages !== hits.length && (
        <Button loadMore={incrementPage} />
      )}
    </>
  );
}
// if (query === this.state.query) {
//   return 'change'
// }
