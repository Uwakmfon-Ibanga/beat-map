import React, { useEffect } from "react";
import { useState } from "react";
import supabase from "../supabaseClient";
import LogOutButton from "../components/LogOutButton";
import { useNavigate } from "react-router-dom";

const Home = ({ spotifyToken, setSpotifyToken, setSortedList, setTop10Artists }) => {
  
  const navigate = useNavigate()

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
  async function getTopArtists() {
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

      const artistCount = {};
      const artistDetails = {};
      
      data.items.forEach((item) => {
        item.track.artists.forEach(artist => {
          artistCount[artist.name] = artistCount[artist.name] ? artistCount[artist.name] + 1 : 1; 

          artistDetails[artist.name] = { id: artist.id, uri: artist.uri };
        })
        
      })

      const sortedList = Object.entries(artistCount)
      .sort((a, b) => b[1] -a[1])
      .map(array => ({name: array[0], count: array[1], id: artistDetails[array[0]].id, uri: artistDetails[array[0]].uri}));


      setSortedList(sortedList);
      setTop10Artists(sortedList.slice(0,10));

      navigate('/game')

      if (!data.items) {
        console.log("No saved tracks found.");
      }

    } catch (error) {
      console.log(error);
    }
  }



  return (
    <div className="w-full h-screen bg-[#191414]">
      <div className="py-3 flex justify-end"><LogOutButton/></div>
      <div className="text-white flex flex-col items-center gap-5 mt-20 text-center px-3">
        <h1>This is a game where you try to guess your top artist from all the songs you've liked on spotify</h1>
        <button className="w-[90px] bg-[#1DB954] flex items-center justify-center gap-1 text-black p-2 rounded-xl cursor-pointer" onClick={getTopArtists}>Play</button>
      </div>
      
      
    </div>
  );
};

export default Home;
