import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import WordWaveLanding from './pages/LandingPage';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Dashboard from './components/Dashboard/Dashboard';
import AudiobookList from './components/AudiobookList';
import AudiobookPlayer from './components/AudiobookPlayer';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import ErrorBoundary from './components/ErrorBoundary';
import DailyVocabulary from './components/DailyVocabulary';

const router = createBrowserRouter([
  {
    path: '/',
    element: <WordWaveLanding />,
    errorElement: <ErrorBoundary />
  },
  {
    path: '/login',
    element: <Login />,
    errorElement: <ErrorBoundary />
  },
  {
    path: '/signup',
    element: <Signup />,
    errorElement: <ErrorBoundary />
  },
  {
    path: '/dashboard',
    element: <ProtectedRoute><Dashboard /></ProtectedRoute>,
    errorElement: <ErrorBoundary />
  },
  {
    path: '/audiobooks',
    element: <AudiobookList />,
    errorElement: <ErrorBoundary />
  },
  {
    path: '/vocabulary',
    element: <DailyVocabulary />,
    errorElement: <ErrorBoundary />
  },
  {
    path: '/audiobook/:id',
    element: <ProtectedRoute><AudiobookPlayer /></ProtectedRoute>,
    errorElement: <ErrorBoundary />
  },
  {
    path: '*',
    element: (
      <div className="min-h-screen bg-[#0A0A0F] text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
          <a 
            href="/dashboard" 
            className="text-purple-400 hover:text-purple-300"
          >
            Return to Dashboard
          </a>
        </div>
      </div>
    ),
    errorElement: <ErrorBoundary />
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
