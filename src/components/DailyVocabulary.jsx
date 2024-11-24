import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import VocabularyWord from './VocabularyWord';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { 
  RiBookFill,
  RiFireFill,
  RiRefreshLine
} from 'react-icons/ri';

const DailyVocabulary = () => {
  const navigate = useNavigate();
  const [vocabulary, setVocabulary] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVocabulary = async () => {
      try {
        const token = localStorage.getItem('token');
        
        if (!token) {
          throw new Error('No authentication token found');
        }

        const response = await axios.get('https://wordwave-app-backend.onrender.com/vocabulary/two-random', {
          headers: {
            'Authorization': `Bearer ${token}`
          },
          timeout: 15000
        });

        const vocabularyData = response.data.data;
        console.log('Vocabulary Data:', vocabularyData);

        if (!vocabularyData || !Array.isArray(vocabularyData)) {
          throw new Error('Invalid vocabulary data received');
        }

        setVocabulary(vocabularyData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching vocabulary:', err);
        setError(err.message || 'Failed to fetch vocabulary');
        setLoading(false);
      }
    };

    fetchVocabulary();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0A0F] text-white flex items-center justify-center">
        <div className="text-xl">Loading vocabulary...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0A0A0F] text-white flex items-center justify-center">
        <div className="text-xl text-red-400">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Daily Vocabulary</h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.reload()}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 transition-colors"
          >
            <RiRefreshLine className="text-xl" />
            <span>Refresh Words</span>
          </motion.button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {vocabulary.length > 0 ? (
            vocabulary.map((word, index) => (
              <VocabularyWord 
                key={index} 
                wordData={{
                  word: word.word,
                  pronunciation: word.pronunciation,
                  definition: word.meaning,
                  example: word.exampleSentence,
                  synonyms: word.synonyms || [],
                  antonyms: word.antonyms || []
                }} 
              />
            ))
          ) : (
            <div className="col-span-2 text-center text-gray-400 py-12">
              No vocabulary words available
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DailyVocabulary;