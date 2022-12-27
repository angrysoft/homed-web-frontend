import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Loader from "./components/Loader";

const Home = lazy(() => import("./pages/home"));
const DeviceDetails = lazy(() => import("./pages/device"));

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
        path="/dev/:sid"
        element={
          <Suspense fallback={<Loader />}>
            <DeviceDetails />
          </Suspense>
        }
      />
    </Routes>
  );
}

export default App;
