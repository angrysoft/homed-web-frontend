import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Loader from "./components/Loader";
import { useGetDevices } from "./hooks/useGetDevices";

const Home = lazy(() => import("./pages/home"));
const DeviceDetails = lazy(() => import("./pages/device"));

function App() {
  const { loading } = useGetDevices();
  if (loading) {
    return <Loader />;
  }

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
