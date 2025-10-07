import React from 'react'
import supabase from '../supabaseClient'

const LogOutButton = () => {
    async function logOut() {
        try {
            const {error} = await supabase.auth.signOut()
            if (error) throw error
            window.location.href = "/"
        } catch (error) {
            console.log('Error signing out:', error.message)
        }
    }
  return (
    <button className='w-[160px] bg-[#1DB954] flex items-center gap-1 text-black p-2 rounded-xl cursor-pointer' onClick={logOut}>Log Out</button>
  )
}

export default LogOutButton
