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
        // Simulated API call
        const data = {
          id: id,
          title: "The Great Gatsby",
          author: "F. Scott Fitzgerald",
          coverImage: "https://via.placeholder.com/300x400",
          description:
            "The Great Gatsby is a 1925 novel by American writer F. Scott Fitzgerald. Set in the Jazz Age on Long Island...",
          duration: "4:25:30",
          progress: 35,
          genre: "Classic",
          releaseDate: "2023-01-15",
          rating: 4.5,
          totalListeners: 1234,
          vocabulary: [
            { word: "Ostentatious", meaning: "Characterized by vulgar or pretentious display", context: "Chapter 3" },
            { word: "Nebulous", meaning: "Unclear, vague, or ill-defined", context: "Chapter 5" },
            { word: "Laconic", meaning: "Using few words; concise", context: "Chapter 2" },
          ],
          chapters: [
            { title: "Chapter 1: The Beginning", duration: "30:15" },
            { title: "Chapter 2: The Encounter", duration: "25:45" },
            { title: "Chapter 3: The Party", duration: "35:20" },
          ],
        };
        setAudiobook(data);
      } catch (err) {
        setError("Failed to load audiobook details");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAudiobookDetails();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F85339]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-6 bg-[#C6CEC9]">
        <p>{error}</p>
        <button
          onClick={() => navigate('/')}
          className="mt-4 text-[#F85339] hover:underline"
        >
          Return to Library
        </button>
      </div>
    );
  }

  const togglePlayPause = () => setIsPlaying(!isPlaying);
  const toggleBookmark = () => setIsBookmarked(!isBookmarked);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-[#C6CEC9]">
      <button
        onClick={() => navigate('/')}
        className="flex items-center text-[#F85339] hover:text-[#d84734] mb-6"
      >
        <FaArrowLeft className="mr-2" />
        Back to Library
      </button>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex p-6">
          <div className="flex-shrink-0 md:w-1/3">
            <img
              src={audiobook.coverImage}
              alt={audiobook.title}
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>

          <div className="md:ml-6 md:w-2/3 mt-4 md:mt-0">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">{audiobook.title}</h1>
                <h2 className="text-xl text-gray-600 mt-2">By {audiobook.author}</h2>
              </div>
              <button
                onClick={toggleBookmark}
                className="text-gray-500 hover:text-[#F85339]"
              >
                {isBookmarked ? <BsBookmarkFill /> : <BsBookmarkPlus />}
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6 text-gray-600">
              <div className="flex items-center">
                <BiTime className="mr-2" />
                <span>{audiobook.duration}</span>
              </div>
              <div>Genre: {audiobook.genre}</div>
              <div>Rating: {audiobook.rating}/5</div>
              <div>Listeners: {audiobook.totalListeners.toLocaleString()}</div>
            </div>

            <p className="text-gray-700 mt-6">{audiobook.description}</p>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Progress</h3>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-[#F85339] h-4 rounded-full transition-all duration-300"
              style={{ width: `${audiobook.progress}%` }}
            ></div>
          </div>
          <p className="text-gray-600 mt-2">{audiobook.progress}% completed</p>
        </div>

        <div className="p-6 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Chapters</h3>
          <div className="space-y-3">
            {audiobook.chapters.map((chapter, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-3 bg-[#F4F4F4] rounded-lg hover:bg-gray-100"
              >
                <span className="text-gray-800">{chapter.title}</span>
                <span className="text-gray-600">{chapter.duration}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-[#C6CEC9] p-4 shadow-lg">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button
            onClick={togglePlayPause}
            className="bg-[#F85339] hover:bg-[#d84734] text-white p-3 rounded-full shadow-lg transition"
          >
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
          <span className="text-gray-800">Playing {audiobook.title}</span>
          <MdVolumeUp className="text-gray-600 text-xl" />
        </div>
      </div>
    </div>
  );
};

export default AudiobookDetail;
