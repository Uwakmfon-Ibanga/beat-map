import React, { useContext, useState } from 'react'
import { userContext } from '../App'

const LogIn = () => {
    const [value, setValue] = useState('')
    const {user, setUser} = useContext(userContext)

    function handleSubmit() {
        e.preventDefault();
        setUser(value)
    }
  return (
    <div>
      <form >
        <input type="text" value={value} onChange={(e)=>setValue(e.target.value)} />
        <button onSubmit={handleSubmit} type='submit'>log in</button>
      </form>
    </div>
  )
}

export default LogIn
