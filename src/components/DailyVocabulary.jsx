import React, { useState, useEffect } from 'react';
import VocabularyWord from './VocabularyWord'; // Correct path to child component

// Word data array
const words = [
  {
    word: 'Altruism',
    definition: 'The belief in or practice of selfless concern for the well-being of others.',
    pronunciation: '/ˈæltruːˌɪzəm/',
    synonyms: ['selflessness', 'philanthropy'],
    antonyms: ['selfishness', 'egoism'],
    example: 'Her altruism was evident in the way she volunteered every weekend at the shelter.',
  },
  {
    word: 'Ephemeral',
    definition: 'Lasting for a very short time.',
    pronunciation: '/ɪˈfɛmərəl/',
    synonyms: ['short-lived', 'transient'],
    antonyms: ['permanent', 'lasting'],
    example: 'The beauty of the sunset was ephemeral but breathtaking.',
  },
  // Add more words as needed
];

const DailyVocabulary = () => {
  const [todayWord, setTodayWord] = useState(null);

  useEffect(() => {
    // Calculate today's word based on the current date
    const todayIndex = new Date().getDate() % words.length;
    setTodayWord(words[todayIndex]);
  }, []);

  if (!todayWord) {
    return <p>Loading your daily word...</p>;
  }

  return (
    <div className="p-6 bg-gray-100 rounded-md shadow-lg max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">Word of the Day</h2>
      <VocabularyWord wordData={todayWord} />
    </div>
  );
};

export default DailyVocabulary;
