import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Loader from "./components/Loader";
import { useGetDevices } from "./hooks/useGetDevices";
import { Login } from "./pages/Login";
import { useEvents } from "./hooks/useEvents";

const Home = lazy(() => import("./pages/home"));
const DeviceDetails = lazy(() => import("./pages/device"));

function App() {
  useEvents();

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
