import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Login from './components/Auth/Login';
import SignUp from './components/Auth/Signup';
import AudiobookDetail from './components/AudiobookDetail';
import AudiobookList from './components/AudiobookList';
import AudiobookPage from './components/AudiobookPage';
import DailyVocabulary from './components/DailyVocabulary';
import UserProfile from './components/UserProfile';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />
    },
    {
      path:"login",
      element: <Login/>
    },
    {
      path:"signup",
      element: <SignUp/>
    },
    {
      path:"audiobook-detail",
      element: <AudiobookDetail/>
    },
    {
      path:"audiobook-list",
      element: <AudiobookList/>
    },
    {
      path:"audiobook-page",
      element: <AudiobookPage/>
    },
    {
      path:"daily-vocabulary",
      element: <DailyVocabulary/>
    },
    {
      path:"profile",
      element: <UserProfile/>
    }
  ]);

  return (
    <RouterProvider router={router} />
  )
}

export default App;
