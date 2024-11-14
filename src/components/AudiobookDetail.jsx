import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaPlay, FaPause, FaArrowLeft } from 'react-icons/fa';
import { BiTime } from 'react-icons/bi';
import { BsBookmarkPlus, BsBookmarkFill } from 'react-icons/bs';
import { MdVolumeUp } from 'react-icons/md';

const AudiobookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [audiobook, setAudiobook] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAudiobookDetails = async () => {
      try {
        // Simulated API call - Replace with your actual API
        const data = {
          id: id,
          title: "The Great Gatsby",
          author: "F. Scott Fitzgerald",
          coverImage: "https://via.placeholder.com/300x400",
          description: "The Great Gatsby is a 1925 novel by American writer F. Scott Fitzgerald. Set in the Jazz Age on Long Island, the novel depicts narrator Nick Carraway's interactions with mysterious millionaire Jay Gatsby and Gatsby's obsession to reunite with his former lover, Daisy Buchanan.",
          duration: "4:25:30",
          progress: 35,
          genre: "Classic",
          releaseDate: "2023-01-15",
          rating: 4.5,
          totalListeners: 1234,
          vocabulary: [
            { word: "Ostentatious", meaning: "Characterized by vulgar or pretentious display", context: "Chapter 3" },
            { word: "Nebulous", meaning: "Unclear, vague, or ill-defined", context: "Chapter 5" },
            { word: "Laconic", meaning: "Using few words; concise", context: "Chapter 2" }
          ],
          chapters: [
            { title: "Chapter 1: The Beginning", duration: "30:15" },
            { title: "Chapter 2: The Encounter", duration: "25:45" },
            { title: "Chapter 3: The Party", duration: "35:20" }
          ]
        };
        setAudiobook(data);
      } catch (err) {
        setError("Failed to load audiobook details");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAudiobookDetails();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-6">
        <p>{error}</p>
        <button 
          onClick={() => navigate('/')}
          className="mt-4 text-blue-500 hover:underline"
        >
          Return to Library
        </button>
      </div>
    );
  }

  if (!audiobook) {
    return <div className="text-center text-gray-500 p-6">No Audiobook Found</div>;
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
    // Add actual audio playing logic here
  };

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    // Add actual bookmark saving logic here
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Back Button */}
      <button 
        onClick={() => navigate('/')}
        className="flex items-center text-gray-600 hover:text-gray-800 mb-6"
      >
        <FaArrowLeft className="mr-2" />
        Back to Library
      </button>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header Section */}
        <div className="md:flex p-6">
          {/* Cover Image */}
          <div className="flex-shrink-0 md:w-1/3">
            <img 
              src={audiobook.coverImage} 
              alt={audiobook.title} 
              className="w-full h-auto rounded-lg shadow-md" 
            />
          </div>

          {/* Book Details */}
          <div className="md:ml-6 md:w-2/3 mt-4 md:mt-0">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">{audiobook.title}</h1>
                <h2 className="text-xl text-gray-600 mt-2">By {audiobook.author}</h2>
              </div>
              <button 
                onClick={toggleBookmark}
                className="text-gray-500 hover:text-yellow-500"
              >
                {isBookmarked ? <BsBookmarkFill className="text-yellow-500" /> : <BsBookmarkPlus />}
              </button>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="flex items-center text-gray-600">
                <BiTime className="mr-2" />
                <span>{audiobook.duration}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <span className="mr-2">Genre:</span>
                <span>{audiobook.genre}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <span className="mr-2">Rating:</span>
                <span>{audiobook.rating}/5</span>
              </div>
              <div className="flex items-center text-gray-600">
                <span className="mr-2">Listeners:</span>
                <span>{audiobook.totalListeners.toLocaleString()}</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-700 mt-6">{audiobook.description}</p>
          </div>
        </div>

        {/* Progress Section */}
        <div className="p-6 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Progress</h3>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-blue-500 h-4 rounded-full transition-all duration-300"
              style={{ width: `${audiobook.progress}%` }}
            ></div>
          </div>
          <p className="text-gray-600 mt-2">{audiobook.progress}% completed</p>
        </div>

        {/* Chapters Section */}
        <div className="p-6 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Chapters</h3>
          <div className="space-y-3">
            {audiobook.chapters.map((chapter, index) => (
              <div 
                key={index}
                className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer"
              >
                <span className="text-gray-800">{chapter.title}</span>
                <span className="text-gray-600">{chapter.duration}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Vocabulary Section */}
        <div className="p-6 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Vocabulary from this Book</h3>
          <div className="grid gap-4">
            {audiobook.vocabulary.map((word, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-gray-800">{word.word}</h4>
                    <p className="text-gray-600 mt-1">{word.meaning}</p>
                  </div>
                  <span className="text-sm text-gray-500">{word.context}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Fixed Player Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={togglePlayPause}
              className="w-12 h-12 flex items-center justify-center bg-blue-500 text-white rounded-full hover:bg-blue-600"
            >
              {isPlaying ? <FaPause /> : <FaPlay />}
            </button>
            <div className="ml-4">
              <div className="text-gray-800 font-medium">{audiobook.title}</div>
              <div className="text-gray-600 text-sm">{audiobook.author}</div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <MdVolumeUp className="text-gray-600 text-xl" />
            <div className="w-24 h-2 bg-gray-200 rounded-full">
              <div className="w-1/2 h-full bg-blue-500 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudiobookDetail;