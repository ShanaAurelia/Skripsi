import React, { useRef } from 'react';
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
import Mainpage from './views/main-page/Mainpage';
import FollowTheDrum from './views/follow-the-drum/FollowTheDrum';

function App() {
  const student = dummyStudent;
  // const student = undefined;
  return (
    <BrowserRouter>
      <Skeleton />
      <Routes>
        <Route
          path='*'
          element={<PageNotFound />}
        />
        {student
          ? ['/home', '/'].map(
              (
                path,
                index // user is authenticated
              ) => (
                // if link is /home or /, it will lead to homepage
                <Route
                  path={path}
                  element={<Homepage />}
                  key={index}
                />
              )
            )
          : ['/home', '/'].map(
              (
                path,
                index // user is not authenticated
              ) => (
                // if link is /home or /, it will lead to mainpage
                <Route
                  path={path}
                  element={<Mainpage />}
                  key={index}
                />
              )
            )}
        <Route
          path='/story'
          element={<Story />}
        />
        <Route
          path='/crossword'
          element={<CrosswordPage />}
        />
        <Route
          path='/followthedrum'
          element={<FollowTheDrum />}
        />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
