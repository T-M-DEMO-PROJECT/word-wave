import React from 'react';
import { motion } from 'framer-motion';
import { FaVolumeUp, FaBookOpen, FaLightbulb } from 'react-icons/fa';

const VocabularyWord = ({ wordData }) => {
  if (!wordData) return null;

  const {
    word = '',
    pronunciation = '',
    definition = '',
    example = '',
    synonyms = [],
    antonyms = []
  } = wordData;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-2xl bg-[#12121A] border border-purple-500/20 p-6 shadow-xl"
    >
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-fuchsia-500/10 to-cyan-500/10 blur-xl" />

      {/* Content */}
      <div className="relative z-10">
        {/* Word and Pronunciation */}
        <div className="mb-6">
          <motion.h3 
            className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent"
            whileHover={{ scale: 1.05 }}
          >
            {word}
          </motion.h3>
          <div className="flex items-center mt-2 space-x-3">
            <span className="text-gray-400">{pronunciation}</span>
            <button className="text-purple-400 hover:text-purple-300 transition-colors">
              <FaVolumeUp />
            </button>
          </div>
        </div>

        {/* Definition */}
        <div className="mb-6 p-4 bg-white/5 rounded-xl border border-white/10">
          <div className="flex items-center mb-2">
            <FaBookOpen className="text-fuchsia-400 mr-2" />
            <span className="text-fuchsia-400 font-semibold">Definition</span>
          </div>
          <p className="text-gray-300">{definition}</p>
        </div>

        {/* Example - Only show if exists */}
        {example && (
          <div className="mb-6 p-4 bg-white/5 rounded-xl border border-white/10">
            <div className="flex items-center mb-2">
              <FaLightbulb className="text-cyan-400 mr-2" />
              <span className="text-cyan-400 font-semibold">Example</span>
            </div>
            <p className="text-gray-300 italic">"{example}"</p>
          </div>
        )}

        {/* Synonyms & Antonyms - Only show if they exist */}
        {(synonyms.length > 0 || antonyms.length > 0) && (
          <div className="grid grid-cols-2 gap-4">
            {synonyms.length > 0 && (
              <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                <h4 className="text-purple-400 font-semibold mb-2">Synonyms</h4>
                <div className="flex flex-wrap gap-2">
                  {synonyms.map((syn, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-purple-500/20 rounded-full text-sm text-purple-300"
                    >
                      {syn}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {antonyms.length > 0 && (
              <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                <h4 className="text-fuchsia-400 font-semibold mb-2">Antonyms</h4>
                <div className="flex flex-wrap gap-2">
                  {antonyms.map((ant, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-fuchsia-500/20 rounded-full text-sm text-fuchsia-300"
                    >
                      {ant}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default VocabularyWord