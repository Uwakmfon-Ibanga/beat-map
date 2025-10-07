import React from 'react'
import supabase from '../supabaseClient'
import { FaSpotify } from 'react-icons/fa'

const SignInButton = ({spotifyToken}) => {

    async function signInWithSpotify() {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'spotify',
    options: {
      scopes: 'user-library-read user-top-read playlist-read-private user-read-private user-read-playback-state',
      redirectTo: `${window.location.origin}/Home`
    }
  }
)
  if (error) throw error
  
    
  } catch (error) {
    console.log('Error signing in:', error.message)
  }
}

  return (
    <>
    
    <button className='w-[160px] bg-[#1DB954] flex items-center gap-1 text-black p-2 rounded-xl cursor-pointer' onClick={() => {signInWithSpotify()
      
    }}>Sign in to Spotify <FaSpotify /></button>
    </>
  )
}

export default SignInButton
