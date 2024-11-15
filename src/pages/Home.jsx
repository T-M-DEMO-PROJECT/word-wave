import React, { useState, useEffect } from 'react';
import ProgressTracker from '../components/ProgressTracker';
import Navbar from '../components/Navbar';
import BookCard from '../components/BookCard';
import { bookService } from '../services/api';

const Home = () => {
  const [featuredBooks, setFeaturedBooks] = useState([]);
  const [currentBook, setCurrentBook] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [books, current, cats] = await Promise.all([
          bookService.getFeaturedBooks(),
          bookService.getCurrentlyReading(),
          bookService.getCategories()
        ]);
        
        setFeaturedBooks(books);
        setCurrentBook(current[0]);
        setCategories(cats);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-blue-600 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Welcome to AudioBook</h1>
          <p className="text-xl mb-6">Discover thousands of audiobooks at your fingertips</p>
          <button className="bg-white text-blue-600 px-6 py-2 rounded-full font-semibold hover:bg-blue-50 transition-colors">
            Browse Library
          </button>
        </div>
      </div>

      {/* Progress Section */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-4">Your Reading Progress</h2>
        <ProgressTracker />
      </div>

      {/* Continue Listening Section */}
      {currentBook && (
        <div className="container mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold mb-4">Continue Listening</h2>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center space-x-4">
              <img 
                src={currentBook.cover} 
                alt={currentBook.title}
                className="w-24 h-24 object-cover rounded-md"
              />
              <div>
                <h3 className="font-semibold">{currentBook.title}</h3>
                <p className="text-gray-600">Chapter {currentBook.currentChapter} of {currentBook.totalChapters}</p>
                <div className="mt-2 w-48 h-2 bg-gray-200 rounded-full">
                  <div 
                    className="h-full bg-blue-600 rounded-full"
                    style={{ width: `${currentBook.progress}%` }}
                  ></div>
                </div>
              </div>
              <button className="ml-auto bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700">
                Resume
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Featured Books Section */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-4">Featured Books</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {featuredBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </div>

      {/* Categories Section */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-4">Browse Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category) => (
            <div 
              key={category.id}
              className="bg-white p-6 rounded-lg shadow-md text-center hover:bg-blue-50 cursor-pointer transition-colors"
            >
              <h3 className="font-semibold">{category.name}</h3>
              <p className="text-sm text-gray-500">{category.bookCount} books</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;