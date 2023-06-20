import { lazy, Suspense, useContext } from "react";
import { Route, Routes } from "react-router-dom";
import MainLoader from "./components/MainLoader";
import { useEvents } from "./hooks/useEvents";
import { useGetDevices } from "./hooks/useGetDevices";
import { Login } from "./pages/Login";
import { AppContext } from "./store";

const Home = lazy(() => import("./pages/home"));
const DeviceDetails = lazy(() => import("./pages/device"));

function App() {
  const { state } = useContext(AppContext);

  useEvents();
  useGetDevices();

  if (state.main.loading) {
    return <MainLoader />;
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Suspense fallback={<MainLoader />}>
            <Home />
          </Suspense>
        }
      ></Route>
      <Route
        path="/dev/:sid"
        element={
          <Suspense fallback={<MainLoader />}>
            <DeviceDetails />
          </Suspense>
        }
      />
      <Route
        path="/login"
        element={
          <Suspense fallback={<MainLoader />}>
            <Login />
          </Suspense>
        }
      />
    </Routes>
  );
}

export default App;
