import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import "./App.css";
import supabase from "./supabaseClient";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import { createContext, useState } from "react";
import Questions from "./pages/Questions";
export const userContext = createContext()

function App() {
  const [spotifyToken, setSpotifyToken] = useState("");
  const [top10Artists, setTop10Artists] = useState([]);
  const [sortedList, setSortedList] = useState([]);

  

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
            path="/home"
            element={
              <Home
                spotifyToken={spotifyToken}
                setSpotifyToken={setSpotifyToken}
                setTop10Artists={setTop10Artists}
                  setSortedList={setSortedList}
              />
            }
          />
          <Route path="/game" element={<Questions top10Artists={top10Artists} sortedList={sortedList}/>}/>
          {/* <Route path="*" element={<PageNotFound/>} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
