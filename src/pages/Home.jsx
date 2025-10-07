import React, { useEffect } from "react";
import { useState } from "react";
import supabase from "../supabaseClient";
import LogOutButton from "../components/LogOutButton";

const Home = ({ spotifyToken, setSpotifyToken }) => {
  const [pace, setPace] = useState("");

  // Check if user is authenticated
  useEffect(() => {
    const checkUser = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!session?.provider_token) {
          window.location.href = "/";
        } else {
          console.log("User is signed in");
          setSpotifyToken(session.provider_token);
        }
      } catch (err) {
        console.error('Error checking session in Home:', err);
      }
    };
    checkUser();
  }, []);

  // Fetch user's saved tracks from Spotify
  async function getSongs() {
    try {
      const response = await fetch(
        "https://api.spotify.com/v1/me/tracks?limit=50",
        {
          headers: {
            Authorization: `Bearer ${spotifyToken}`,
          },
        }
      );

      if (!response.ok) {
        const text = await response.text();
        console.error("Error fetching songs: status", response.status, "body:", text);
        throw new Error(`HTTP error: ${response.status}`);
      }
      const data = await response.json();
      
      const trackIds = data.items.map((item => item.track.id))

      const randomTrack = data.items[Math.floor(Math.random() * data.items.length)];
      console.log(`${randomTrack.track.name} by ${randomTrack.track.artists.map(artist => artist.name)}`)
      console.log(`this is the track's spotify external url${randomTrack.track.external_urls.spotify}`)
      console.log("this is the track's id", randomTrack.track)
      
      window.location.href = randomTrack.track.external_urls.spotify;
      

      if (!data.items) {
        console.log("No saved tracks found.");
      }

      
      
      return trackIds;
    } catch (error) {
      console.log(error);
    }
  }






  const presets = [
    { label: "Chill", range: "60–90 BPM" },
    { label: "Focus", range: "90–110 BPM" },
    { label: "Workout", range: "120–150 BPM" },
    { label: "Run", range: "160+ BPM" },
  ];

  const handleChange = (e) => {
    setPace(e.target.value);
  };

  const handleSubmit = () => {
    alert(`You picked: ${pace}`);
    // 🔥 Here is where you’d call your Spotify API logic
  };


  

  return (
    <div className="w-full h-screen bg-[#191414] flex justify-center items-center">
      <LogOutButton/>
      <div className="p-6 w-[300px] mx-auto bg-white shadow rounded-2xl">
        <h2 className="text-xl font-bold mb-4">Pick Your Pace</h2>

        <form className="space-y-3 ">
          {presets.map((preset) => (
            <label
              key={preset.label}
              className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-100"
            >
              <input
                type="radio"
                name="pace"
                value={preset.label}
                checked={pace === preset.label}
                onChange={handleChange}
                className="mr-2"
                style={{ accentColor: "#1DB954" }}
              />
              <span className="font-medium">{preset.label}</span>
              <span className="ml-auto text-gray-500 text-sm">
                {preset.range}
              </span>
            </label>
          ))}
        </form>

        <button
          onClick={handleSubmit}
          disabled={!pace}
          className="mt-4 w-full bg-[#1DB954] text-white py-2 px-4 rounded-lg disabled:opacity-50"
        >
          Continue
        </button>

        <button className="bg-green-400" onClick={getSongs}>
          get list of songs
        </button>
      </div>
    </div>
  );
};

export default Home;
