import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import WordCloudComponent from "./components/WordCloudComponent";
import UploadComponent from "./components/UploadComponent";
import Root from "./components/layout/Root";

import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";
import "./index.css";
import "jquery";
import "@popperjs/core";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";

const router = createBrowserRouter([
  {
    path: "",
    element: <Root />,
    children: [
      {
        path: "result/:userToken",
        element: <WordCloudComponent />,
      },
      {
        path: "",
        element: <UploadComponent />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
