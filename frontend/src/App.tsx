import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Loader from "./components/Loader";

const Home = lazy(() => import("./pages/home"));

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Suspense fallback={<Loader />}>
            <Home />
          </Suspense>
        }
      ></Route>
      <Route
        path="/"
      />
    </Routes>
  );
}

export default App;
