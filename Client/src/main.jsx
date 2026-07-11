import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import HeaderBar from "./Component/HeaderBar";
import Home from "./Component/Home";
import JeuBar from "./Component/JeuBar";
import Remp from "./Component/Remp";
import JeuHome from "./Component/JeuHome";
import Liste from "./Component/Liste";
import Affichage from "./Component/Affichage";
import { getElement, getRemp, getSearch, getList } from "./lib/fetch.js";
import Edit from "./Component/Edit";





// router
const router = createBrowserRouter([
  {
    path: "/",
    Component: HeaderBar,
    children: [
      {
        index: true, Component: Home
      },
      {
        path: ":jeu/", Component: JeuBar, children: [
          {
            index: true, Component: JeuHome
          },
          { path: "remp", Component: Remp },
          {
            path: ":elem",
            Component: Liste,
            loader: async ({ params }) => {
              return { element: await getList(params.jeu, params.elem) }
            }
          },
          {
            path: ":elem/:id",
            Component: Affichage,
            loader: async ({ params }) => {
              return { element: await getElement(params.id) }
            }
          },
          {
            path: ":elem/:id/edit",
            Component: Edit,
            loader: async ({ params }) => {
              return { element: await getElement(params.id) }
            }
          }]
      }]
  },
]);

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <RouterProvider router={router} />,
);