import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import WordCloudComponent from './components/WordCloudComponent';
import UploadComponent from './components/UploadComponent';

import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';
import './index.css';
import reportWebVitals from './reportWebVitals';

const router = createBrowserRouter([
  {
    path: "result/:userToken",
    element: < WordCloudComponent />
  },
  {
    path: "upload",
    element: < UploadComponent />
  }
])


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
