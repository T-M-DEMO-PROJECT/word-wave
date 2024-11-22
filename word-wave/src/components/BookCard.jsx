import React from 'react';
import PropTypes from 'prop-types';

const BookCard = ({ book }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="aspect-w-2 aspect-h-3 mb-3">
        <img 
          src={book.cover} 
          alt={book.title}
          className="w-full h-48 object-cover rounded-md"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/200x300?text=No+Cover';
          }}
        />
      </div>
      <h3 className="font-semibold truncate">{book.title}</h3>
      <p className="text-gray-600 text-sm">{book.author}</p>
      <div className="flex items-center justify-between mt-2">
        <span className="text-gray-500 text-sm">{book.duration}</span>
        {book.rating && (
          <div className="flex items-center">
            <span className="text-yellow-500">★</span>
            <span className="text-sm ml-1">{book.rating}</span>
          </div>
        )}
      </div>
    </div>
  );
};

BookCard.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    cover: PropTypes.string
  }).isRequired
};

export default BookCard; 