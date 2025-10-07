  import React from "react";
  import supabase from "../supabaseClient";
  import SignInButton from "../components/SignInButton";
  import { useEffect, useState } from "react";
  import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

  const SignIn = ({ setSpotifyToken, spotifyToken }) => {

    const navigate = useNavigate();

    async function CheckForToken() {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSpotifyToken(session?.provider_token || "");

      if (!session) {
        console.log("No user is signed in");
      }else if (session?.provider_token) {
        navigate('/Home')
      }
    }

    useEffect(() => {
      CheckForToken();

    
        const {
          data: { subscription },
        } = supabase.auth.onAuthStateChange((event, session) => {
          console.log("Auth event:", event);
          if (event === "SIGNED_IN") {
            setSpotifyToken(session?.provider_token || "");
          }
          if (event === "SIGNED_OUT") {
            setSpotifyToken("");
          }
        });

        return () => subscription?.unsubscribe();
      
    }, []);

    return (
      <div className="w-full h-screen bg-black flex flex-col gap-2 justify-center items-center">
        <h1 className="text-white text-center font-bold">
          To continue you'll have to sign-in to your spotify account
        </h1>
        <FaUser style={{ color: "white", fontSize: "50px" }} />
        <SignInButton spotifyToken={spotifyToken} />
      </div>
    );
  };

  export default SignIn;
