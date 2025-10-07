import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import "./App.css";
import supabase from "./supabaseClient";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import { createContext, useState } from "react";
export const userContext = createContext()

function App() {
  const [spotifyToken, setSpotifyToken] = useState("");
  

  return (
    <>
          <BrowserRouter>
        <Routes>
                    <Route
            path="/"
            element={
               (
                <SignIn
                  setSpotifyToken={setSpotifyToken}
                  spotifyToken={spotifyToken}
                />
              )
            }
          />
          <Route
            path="/Home"
            element={
              <Home
                spotifyToken={spotifyToken}
                setSpotifyToken={setSpotifyToken}
              />
            }
          />
          {/* <Route path="*" element={<PageNotFound/>} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
