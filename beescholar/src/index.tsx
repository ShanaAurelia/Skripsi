import React, { useRef } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import Homepage from './views/homepage/Homepage';
import Skeleton from './views/skeleton/Skeleton';
import PageNotFound from './views/page-not-found/PageNotFound';
import Story from './views/story/Story';

function App() {
  return (
    <BrowserRouter>
      <Skeleton />
      <Routes>
        <Route
          path='*'
          element={<PageNotFound />}
        />
        {['/home', '/'].map((path, index) => (
          // if link is /home or /, it will lead to homepage
          <Route
            path={path}
            element={<Homepage />}
            key={index}
          />
        ))}
        <Route
          path='/story'
          element={<Story />}
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
