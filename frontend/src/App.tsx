import React, { lazy, Suspense, useContext, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Loader from "./components/Loader";
import { useGetDevices } from "./hooks/useGetDevices";
import { Login } from "./pages/Login";
import { AppContext } from "./store";

const Home = lazy(() => import("./pages/home"));
const DeviceDetails = lazy(() => import("./pages/device"));

function App() {
  const {dispatch} = useContext(AppContext)

  useEffect(() => {
    console.log("init event source")
    const evSource = new EventSource(`http://localhost:8000/events`);
    evSource.onmessage = async (event) => {
      if (event.data.startsWith('{')) {
        dispatch({type:"UPDATE_DEVICE", payload: JSON.parse(event.data)});
      }
    }
  }, [dispatch]);
  
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
      <Route
        path="/login"
        element={
          <Suspense fallback={<Loader />}>
            <Login />
          </Suspense>
        }
      />
    </Routes>
  );
}

export default App;
