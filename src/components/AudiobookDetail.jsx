const AudiobookDetail = ({ audiobook }) => {
    if (!audiobook) {
      return <div className="text-center text-gray-500">No Audiobook Selected</div>; // Fallback message
    }
  
    return (
      <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
        {/* Cover Image */}
        <div className="flex justify-center">
          <img 
            src={audiobook.coverImage} 
            alt={audiobook.title} 
            className="w-48 h-64 object-cover rounded-md shadow-md" 
          />
        </div>
  
        {/* Title and Author */}
        <h1 className="text-2xl font-bold text-gray-800 mt-4">{audiobook.title}</h1>
        <h2 className="text-lg text-gray-600 mb-2">By {audiobook.author}</h2>
  
        {/* Description */}
        <p className="text-gray-700 text-justify mt-4">{audiobook.description}</p>
  
        {/* Progress Tracking */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-800">Listening Progress</h3>
          <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
            <div
              className="bg-blue-500 h-4 rounded-full"
              style={{ width: `${audiobook.progress}%` }}
            ></div>
          </div>
          <p className="text-gray-500 mt-2">{audiobook.progress}% completed</p>
        </div>
  
        {/* Daily Vocabulary */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-800">Daily Vocabulary</h3>
          <div className="space-y-2 mt-2">
            {audiobook.vocabulary.map((word, index) => (
              <div key={index} className="p-2 bg-gray-100 rounded-md">
                <strong className="text-gray-800">{word.word}</strong>:{" "}
                <span className="text-gray-600">{word.meaning}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  export default AudiobookDetail;
  