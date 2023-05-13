import React from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Form, FormBtn, FormInput, Header } from './Searchbar.styled';
import PropTypes from 'prop-types';

export default function Searchbar({ onSubmit }) {
  const [imageName, setImageName] = useState('');

  const handleImageNameChange = e => {
    setImageName(e.currentTarget.value.toLowerCase());
  };

  const handleFormSubmit = e => {
    e.preventDefault();
    if (imageName.trim() === '') {
      toast.error('field cannot be empty', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
      return;
    }

    onSubmit(imageName);
    setImageName(imageName);
  };

  return (
    <>
      <Header className="searchbar">
        <Form className="form" onSubmit={handleFormSubmit}>
          <FormBtn type="submit" className="button">
            Click Me
          </FormBtn>

          <FormInput
            className="input"
            type="text"
            autoComplete="off"
            autoFocus
            value={imageName}
            placeholder="Search images and photos"
            onChange={handleImageNameChange}
          />
        </Form>
      </Header>
    </>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
