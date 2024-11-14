// AudiobookList.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// Import React Icons
import { BiLibrary, BiSearch } from 'react-icons/bi';
import { FaPlay, FaPause } from 'react-icons/fa';
import { MdAccessTime } from 'react-icons/md';
import { BsBookHalf } from 'react-icons/bs';

const AudiobookList = () => {
  const [audiobooks, setAudiobooks] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Sample data - Replace with actual API call
  useEffect(() => {
    const fetchAudiobooks = async () => {
      try {
        // Simulate API call - Replace with your actual API endpoint
        const response = await fetch('your-api-endpoint/audiobooks');
        const data = [
          {
            id: 1,
            title: "The Great Gatsby",
            author: "F. Scott Fitzgerald",
            genre: "Classic",
            duration: "4:25:30",
            coverUrl: "https://via.placeholder.com/240x320",
            progress: 35
          },
          {
            id: 2,
            title: "Pride and Prejudice",
            author: "Jane Austen",
            genre: "Romance",
            duration: "5:15:00",
            coverUrl: "https://via.placeholder.com/240x320",
            progress: 0
          },
          // Add more sample books as needed
        ];
        setAudiobooks(data);
      } catch (error) {
        console.error('Error fetching audiobooks:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAudiobooks();
  }, []);

  // Filter audiobooks based on search and genre
  const filteredAudiobooks = audiobooks.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = selectedGenre === 'all' || book.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <BiLibrary className="text-4xl" />
          Audiobook Library
        </h1>
      </div>

      {/* Search and Filter Section */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1 relative">
          <BiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search audiobooks..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <select
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
        >
          <option value="all">All Genres</option>
          <option value="Classic">Classic</option>
          <option value="Romance">Romance</option>
          <option value="Mystery">Mystery</option>
          <option value="Science Fiction">Science Fiction</option>
        </select>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading audiobooks...</p>
        </div>
      )}

      {/* Audiobooks Grid */}
      {!isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAudiobooks.map((book) => (
            <div
              key={book.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* Book Cover */}
              <img
                src={book.coverUrl}
                alt={book.title}
                className="w-full h-64 object-cover"
              />
              
              {/* Book Info */}
              <div className="p-4">
                <h3 className="font-bold text-lg mb-1 truncate">{book.title}</h3>
                <p className="text-gray-600 mb-4">{book.author}</p>
                
                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all"
                    style={{ width: `${book.progress}%` }}
                  />
                </div>

                {/* Book Details */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-gray-500">
                    <MdAccessTime className="mr-1" />
                    <span className="text-sm">{book.duration}</span>
                  </div>
                  <div className="flex items-center text-gray-500">
                    <BsBookHalf className="mr-1" />
                    <span className="text-sm">{book.genre}</span>
                  </div>
                </div>

                {/* Action Button */}
                <Link 
                  to={`/audiobook/${book.id}`}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors"
                >
                  {book.progress > 0 ? <FaPlay className="mr-2" /> : <FaPlay className="mr-2" />}
                  {book.progress > 0 ? 'Continue' : 'Start'}
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* No Results Message */}
      {!isLoading && filteredAudiobooks.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No audiobooks found matching your criteria</p>
        </div>
      )}
    </div>
  );
};

export default AudiobookList;