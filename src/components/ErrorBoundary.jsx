import { useRouteError, useNavigate } from 'react-router-dom';

const ErrorBoundary = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700 via-pink-600 to-blue-500 flex items-center justify-center p-4">
      <div className="bg-gray-900 p-8 rounded-xl shadow-2xl text-white max-w-lg w-full">
        <h1 className="text-3xl font-bold text-pink-500 mb-4">Oops!</h1>
        <p className="text-xl mb-4">Something went wrong</p>
        <div className="bg-gray-800 p-4 rounded-lg mb-6">
          <p className="text-gray-300">
            {error.statusText || error.message || "Unknown error occurred"}
          </p>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => navigate(-1)}
            className="flex-1 py-3 rounded-lg bg-gray-800 hover:bg-gray-700 transition-all duration-300 font-semibold"
          >
            Go Back
          </button>
          <button
            onClick={() => navigate('/')}
            className="flex-1 py-3 rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 hover:from-purple-500 hover:to-pink-500 transition-all duration-300 font-semibold"
          >
            Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorBoundary; 