import { useState, useEffect } from 'react';
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
  const [selectedImage, setSelectedImage] = useState(null);
  const [totalImages, setTotalImages] = useState(0);

  useEffect(() => {
    const fetchImages = () => {
      setIsLoading(true);
      requestImages(imageName, page)
        .then(data => {
          const newHits = data.hits;
          if (newHits.length === 0) {
            return;
          }
          const images = newHits.map(({ id, tags, webformatURL, largeImageURL }) => ({ id, tags, webformatURL, largeImageURL }))
          setHits(prevHits => [...prevHits, ...images]);
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
    if (!imageName) {
      return;
    }
    fetchImages();
  }, [imageName, page]);

  const handleFormSubmit = query => {
    if (imageName === query) {
      alert('change your value');
    }
    setImageName(query);
    setHits([]);
    setPage(1);
    setTotalImages(0);
  };

  const incrementPage = () => {
    setPage(page + 1);
  };

  const toggleModal = (modalData = null) => {
    setSelectedImage(modalData);
  };

  return (
    <>
      {error && <div>{error.message}</div>}
      <ToastContainer />
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery
        hits={hits}
        isLoading={isLoading}
        toggleModal={toggleModal}
      />
      {selectedImage && (
        <Modal onClose={toggleModal} largeImage={selectedImage.largeImageURL} alt={selectedImage.alt} />
      )}
      {isLoading && <Loader />}
      {!isLoading && totalImages !== hits.length && (
        <Button loadMore={incrementPage} />
      )}
    </>
  );
}
