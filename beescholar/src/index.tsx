import React, { createContext, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import Homepage from './views/homepage/Homepage';
import Skeleton from './views/skeleton/Skeleton';
import PageNotFound from './views/page-not-found/PageNotFound';
import Story from './views/story/Story';
import CrosswordPage from './views/crossword/Crossword';
import { dummyStudent } from './views/skeleton/Skeleton.constants';
import Mainpage from './views/landing-page/LandingPage';
import FollowTheDrum from './views/follow-the-drum/FollowTheDrum';
import CharacterProfiles from './views/profiles/Profiles';
import { IStudent } from './constants/global.interfaces';
import { AuthProvider, useAuth } from './config/Context';
import RouteProtection from './config/Utilities';
import CampusMap from './views/campus-map/Campus_Map';
import Leaderboard from './views/leaderboard/Leaderboard';
import Stage from './views/stage/Stage';
import StoryCase from './views/story-case/StoryCase';

function App() {
  const [student, setStudent] = useState<IStudent | undefined>();
  const user = useAuth();

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public Routes under "/beescholar" */}
          <Route path={'/'} element={<Skeleton />}>
            <Route index element={<Mainpage />} />
            <Route element={<PageNotFound />} />
          </Route>
          <Route path={'/beescholar'} element={<Skeleton />}>
            <Route index element={<Mainpage />} />
            <Route element={<PageNotFound />} />
          </Route>

          {/* Protected Routes under "/game" */}
          <Route
            path='/game'
            element={
              <RouteProtection>
                <Skeleton />
              </RouteProtection>
            }
          >
            <Route index element={<Homepage />} />
            <Route path='home' element={<Homepage />} />
            <Route path='story' element={<Story />} />
            <Route path='crossword' element={<CrosswordPage />} />
            <Route path='followthedrum' element={<FollowTheDrum />} />
            <Route path='profiles' element={<CharacterProfiles />} />
            <Route path='map' element={<CampusMap/>} />
            <Route path='leaderboard' element={<Leaderboard/>}/>
            <Route path='stage' element={<Stage />} />
            <Route path='storycase' element={<StoryCase />} />
            <Route path='*' element={<PageNotFound />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<App />);

// Uncomment to measure app performance
// reportWebVitals();
