'use client';

import React, { useState } from 'react';
import Modal from '../../components/ModalAlert'; // Ensure the path is correct

const AddBookForm: React.FC = () => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    isbn: '',
    price: '',
    stock: '',
    coverImage: '',
  });

  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.result) {
          setFormData((prev) => ({
            ...prev,
            coverImage: reader.result as string,
          }));
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/addBook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setModalMessage('Book added successfully!');
        setIsModalVisible(true); // Show success modal
        setFormData({
          title: '',
          author: '',
          genre: '',
          isbn: '',
          price: '',
          stock: '',
          coverImage: '',
        });
      } else {
        setModalMessage(`Error: ${result.error}`);
        setIsModalVisible(true);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setModalMessage('An unexpected error occurred.');
      setIsModalVisible(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full h-full">

      {/* Form Section */}
      <div className="w-2/3 p-6 border-r border-gray-300">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <h3 className="text-lg font-semibold text-accent-moonstone">Add Book</h3>

          <input
            type="text"
            name="title"
            placeholder="Title"
            className="p-2 border border-gray-300 text-accent-raisin_black rounded"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="author"
            placeholder="Author"
            className="p-2 border border-gray-300 text-accent-raisin_black rounded"
            value={formData.author}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="genre"
            placeholder="Genre (optional)"
            className="p-2 border border-gray-300 text-accent-raisin_black rounded"
            value={formData.genre}
            onChange={handleChange}
          />

          <input
            type="text"
            name="isbn"
            placeholder="ISBN"
            className="p-2 border border-gray-300 text-accent-raisin_black rounded"
            value={formData.isbn}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            step="0.01"
            className="p-2 border border-gray-300 text-accent-raisin_black rounded"
            value={formData.price}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="stock"
            placeholder="Stock"
            className="p-2 border border-gray-300 text-accent-raisin_black rounded"
            value={formData.stock}
            onChange={handleChange}
            required
          />

          <input
            type="file"
            className="p-2 border border-accent-moonstone rounded"
            accept="image/*"
            onChange={handleFileChange}
          />

          <button
            type="submit"
            className="text-accent-moonstone border border-accent-moonstone py-2 px-4 rounded font-semibold bg-transparent hover:bg-transparent hover:border-accent-minBlue transition"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>

      {/* Preview Section */}
      <div className="w-2/5 p-6 flex flex-col items-start justify-start">
        <h3 className="text-xl font-bold text-accent-moonstone mb-4 w-full text-center">Preview</h3>
        {formData.title || formData.coverImage ? (
          <div className="text-left">
            <p className="text-md text-accent-moonstone">
              <strong>Title:</strong> {formData.title || 'Untitled'}
            </p>
            <p className="text-md text-accent-moonstone">
              <strong>Author:</strong> {formData.author || 'Unknown Author'}
            </p>
            {formData.genre && (
              <p className="text-md text-accent-moonstone">
                <strong>Genre:</strong> {formData.genre}
              </p>
            )}
            <p className="text-md text-accent-moonstone">
              <strong>ISBN:</strong> {formData.isbn || 'N/A'}
            </p>
            <p className="text-md text-accent-moonstone">
              <strong>Price:</strong> ${formData.price || 'N/A'}
            </p>
            <p className="text-md text-accent-moonstone">
              <strong>Stock:</strong> {formData.stock || 'N/A'}
            </p>
            {formData.coverImage && (
              <img
                src={formData.coverImage}
                alt="Book Cover"
                className="mt-4 max-w-full max-h-64 object-contain border border-gray-300 rounded"
              />
            )}
          </div>
        ) : (
          <p className="text-accent-moonstone">Fill the form to preview the book details here.</p>
        )}
      </div>

{/* Modal */}
      <Modal
        isVisible={isModalVisible}
        message={modalMessage}
        onClose={() => setIsModalVisible(false)}
      />
    </div>
  );
};

export default AddBookForm;


