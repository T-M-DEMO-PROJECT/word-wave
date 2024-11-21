// AudiobookList.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// Import React Icons
import { FaHeadphones, FaPlay, FaPause } from 'react-icons/fa';
import { BiSearch } from 'react-icons/bi';
import { MdAccessTime } from 'react-icons/md';
import { BsBookHalf } from 'react-icons/bs';
// Import a fallback image
const fallbackCover = "https://via.placeholder.com/300x400/1a1a1a/purple?text=No+Cover";

// Add an image error handler function
const handleImageError = (e) => {
  // Use a placeholder service
  e.target.src = `https://via.placeholder.com/300x400/1a1a1a/purple?text=${encodeURIComponent(e.target.alt)}`;
  e.target.onerror = null;
};

const AudiobookList = () => {
  const [audiobooks, setAudiobooks] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Sample data - Replace with actual API call
  useEffect(() => {
    const fetchAudiobooks = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch('https://wordwave-app-backend.onrender.com/audiobooks');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        // Transform data and generate unique IDs
        const transformedData = data.map((book, index) => ({
          id: book._id || `book-${index + 1}`, // Generate a unique ID if none exists
          title: book.title || 'Untitled',
          author: book.author || 'Unknown Author',
          coverUrl: book.coverImage || `https://via.placeholder.com/300x400/1a1a1a/purple?text=${encodeURIComponent(book.title || 'Untitled')}`,
          genre: book.genre || "Unknown",
          duration: typeof book.duration === 'number' ? `${book.duration}:00` : book.duration || "0:00",
          progress: book.progress || 0,
          narrator: book.narrator || 'Unknown Narrator'
        }));

        setAudiobooks(transformedData);
      } catch (error) {
        console.error('Error fetching audiobooks:', error);
        setError('Failed to load audiobooks. Please try again later.');
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
    <div className="min-h-screen bg-[#0A0A0F] text-white">
      {/* Header Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold flex items-center gap-3 text-purple-500">
            <FaHeadphones className="text-4xl" />
            WordWave
          </h1>
        </div>

        {/* Search and Filter Section */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <BiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search audiobooks..."
              className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500 text-white placeholder-gray-400 transition-colors"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <select
            className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-purple-500 text-white transition-colors"
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
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto"></div>
            <p className="mt-4 text-gray-400">Loading your library...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <p className="text-red-400">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 px-6 py-3 bg-purple-500 hover:bg-purple-600 rounded-xl transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        {/* Audiobooks Grid */}
        {!isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAudiobooks.map((book) => (
              <div
                key={book.id}
                className="bg-white/5 rounded-xl border border-white/10 overflow-hidden hover:border-purple-500/50 transition-all duration-300"
              >
                {/* Book Cover with error handling */}
                <div className="relative aspect-[2/3] overflow-hidden">
                  <img
                    src={book.coverUrl || fallbackCover}
                    alt={book.title}
                    onError={handleImageError}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                
                {/* Book Info */}
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-1 truncate">{book.title}</h3>
                  <p className="text-gray-400 mb-4">{book.author}</p>
                  
                  {/* Progress Bar */}
                  <div className="w-full bg-white/10 rounded-full h-2 mb-4">
                    <div
                      className="bg-purple-500 h-2 rounded-full transition-all"
                      style={{ width: `${book.progress}%` }}
                    />
                  </div>

                  {/* Book Details */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-gray-400">
                      <MdAccessTime className="mr-1" />
                      <span className="text-sm">{book.duration}</span>
                    </div>
                    <div className="flex items-center text-gray-400">
                      <BsBookHalf className="mr-1" />
                      <span className="text-sm">{book.genre}</span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <Link 
                    to={`/audiobook/${book.id}`}
                    className="w-full bg-purple-500 hover:bg-purple-600 text-white py-3 px-4 rounded-xl flex items-center justify-center transition-colors"
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
            <p className="text-gray-400">No audiobooks found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AudiobookList;