import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/home";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Suspense>
            <Home />
          </Suspense>
        }
      ></Route>
    </Routes>
  );
}

export default App;
