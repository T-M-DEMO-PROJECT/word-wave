// AudiobookList.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaHeadphones, FaPlay } from 'react-icons/fa';

const AudiobookList = () => {
  const books = [
    {
      _id: '1',
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      coverImage: "https://www.gutenberg.org/cache/epub/64317/pg64317.cover.medium.jpg",
    },
    {
      _id: '2',
      title: "Pride and Prejudice",
      author: "Jane Austen",
      coverImage: "https://www.gutenberg.org/cache/epub/1342/pg1342.cover.medium.jpg",
    },
    {
      _id: '3',
      title: "Dracula",
      author: "Bram Stoker",
      coverImage: "https://www.gutenberg.org/cache/epub/345/pg345.cover.medium.jpg",
    },
    {
      _id: '4',
      title: "Frankenstein",
      author: "Mary Shelley",
      coverImage: "https://www.gutenberg.org/cache/epub/84/pg84.cover.medium.jpg",
    },
    {
      _id: '5',
      title: "Alice in Wonderland",
      author: "Lewis Carroll",
      coverImage: "https://www.gutenberg.org/cache/epub/11/pg11.cover.medium.jpg",
    },
    {
      _id: '6',
      title: "The Picture of Dorian Gray",
      author: "Oscar Wilde",
      coverImage: "https://www.gutenberg.org/cache/epub/174/pg174.cover.medium.jpg",
    },
    {
      _id: '7',
      title: "Jane Eyre",
      author: "Charlotte Brontë",
      coverImage: "https://www.gutenberg.org/cache/epub/1260/pg1260.cover.medium.jpg",
    },
    {
      _id: '8',
      title: "Moby Dick",
      author: "Herman Melville",
      coverImage: "https://www.gutenberg.org/cache/epub/2701/pg2701.cover.medium.jpg",
    },
    {
      _id: '9',
      title: "The Adventures of Sherlock Holmes",
      author: "Arthur Conan Doyle",
      coverImage: "https://www.gutenberg.org/cache/epub/1661/pg1661.cover.medium.jpg",
    },
    {
      _id: '10',
      title: "Little Women",
      author: "Louisa May Alcott",
      coverImage: "https://www.gutenberg.org/cache/epub/514/pg514.cover.medium.jpg",
    },
    {
      _id: '11',
      title: "The War of the Worlds",
      author: "H. G. Wells",
      coverImage: "https://www.gutenberg.org/cache/epub/36/pg36.cover.medium.jpg",
    },
    {
      _id: '12',
      title: "The Time Machine",
      author: "H. G. Wells",
      coverImage: "https://www.gutenberg.org/cache/epub/35/pg35.cover.medium.jpg",
    },
    {
      _id: '13',
      title: "Wuthering Heights",
      author: "Emily Brontë",
      coverImage: "https://www.gutenberg.org/cache/epub/768/pg768.cover.medium.jpg",
    }
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white p-8">
      {/* Header */}
      <div className="mb-12 flex items-center gap-3">
        <FaHeadphones className="text-4xl text-purple-500" />
        <h1 className="text-4xl font-bold text-purple-400">
          WordWave Library
        </h1>
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {books.map((book) => (
          <div
            key={book._id}
            className="bg-white/5 rounded-xl border border-white/10 overflow-hidden hover:border-purple-500/50 transition-all duration-300"
          >
            <div className="relative aspect-[2/3] overflow-hidden">
              <img
                src={book.coverImage}
                alt={book.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/300x400/1a1a1a/purple?text=WordWave";
                }}
              />
            </div>
            
            <div className="p-4">
              <h3 className="font-bold text-lg mb-1 truncate">{book.title}</h3>
              <p className="text-gray-400 mb-4">{book.author}</p>
              
              <Link 
                to={`/audiobook/${book._id}`}
                className="w-full bg-purple-500 hover:bg-purple-600 text-white py-3 px-4 rounded-xl flex items-center justify-center"
              >
                <FaPlay className="mr-2" />
                Start Listening
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AudiobookList;