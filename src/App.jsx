import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Home from './pages/Home';
import Login from './components/Auth/Login';
import SignUp from './components/Auth/Signup';
import AudiobookDetail from './components/AudiobookDetail';
import AudiobookList from './components/AudiobookList';
import AudiobookPage from './components/AudiobookPage';
import DailyVocabulary from './components/DailyVocabulary';
import UserProfile from './components/UserProfile/UserProfile';
import Dashboard from './components/Dashboard/Dashboard';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  const router = createBrowserRouter(
    [
      {
        path:"/",
        element: <LandingPage/>,
        errorElement: <ErrorBoundary />
      },
      {
        path: "/home",
        element: <Home />,
        errorElement: <ErrorBoundary />
      },
      {
        path:"login",
        element: <Login/>,
        errorElement: <ErrorBoundary />
      },
      {
        path:"signup",
        element: <SignUp/>,
        errorElement: <ErrorBoundary />
      },
      {
        path:"dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
        errorElement: <ErrorBoundary />
      },
      {
        path:"audiobook-detail",
        element: <AudiobookDetail/>,
        errorElement: <ErrorBoundary />
      },
      {
        path:"audiobook-list",
        element: <AudiobookList/>,
        errorElement: <ErrorBoundary />
      },
      {
        path:"audiobook-page",
        element: <AudiobookPage/>,
        errorElement: <ErrorBoundary />
      },
      {
        path:"daily-vocabulary",
        element: <DailyVocabulary/>,
        errorElement: <ErrorBoundary />
      },
      {
        path:"profile",
        element: (
          <ProtectedRoute>
            <UserProfile/>
          </ProtectedRoute>
        ),
        errorElement: <ErrorBoundary />
      },
    ],
    {
      future: {
        v7_startTransition: true,
        v7_relativeSplatPath: true,
        v7_fetcherPersist: true,
        v7_normalizeFormMethod: true,
        v7_partialHydration: true,
        v7_skipActionErrorRevalidation: true
      }
    }
  );

  return <RouterProvider router={router} />
}

export default App;
