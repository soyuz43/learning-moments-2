// src/components/auth/Register.jsx

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Login.css"
import { createUser, getUserByEmail } from "../../services/userService"

export const Register = (props) => {
  const [user, setUser] = useState({
    email: "",
    fullName: "",
    cohort: 0,
  })
  let navigate = useNavigate()

  const registerNewUser = () => {
    const newUser = {
      ...user,
      cohort: parseInt(user.cohort),
    }

    createUser(newUser).then((createdUser) => {
      if (createdUser.hasOwnProperty("id")) {
        localStorage.setItem(
          "learning_user",
          JSON.stringify({
            id: createdUser.id,
            staff: createdUser.isStaff,
          })
        )

        navigate("/")
      }
    })
  }

  const handleRegister = (e) => {
    e.preventDefault()
    getUserByEmail(user.email).then((response) => {
      if (response.length > 0) {
        // Duplicate email. No good.
        window.alert("Account with that email address already exists")
      } else {
        // Good email, create user.
        registerNewUser()
      }
    })
  }

  const updateUser = (evt) => {
    const copy = { ...user }
    copy[evt.target.id] = evt.target.value
    setUser(copy)
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white px-6 py-10">
      <form 
        className="bg-gray-800 bg-opacity-80 backdrop-blur-md shadow-lg rounded-lg p-8 w-full max-w-md border border-gray-700"
        onSubmit={handleRegister}
      >
        <h1 className="text-4xl font-extrabold text-gray-100 tracking-wide mb-4 text-center">
          Learning Moments
        </h1>
        <h2 className="text-lg text-gray-400 text-center mb-6">Create an Account</h2>
  
        <div className="space-y-4">
          <input
            onChange={updateUser}
            type="text"
            id="fullName"
            className="w-full px-4 py-3 bg-gray-700 text-gray-300 rounded-lg border border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
            placeholder="Enter your name"
            required
          />
          <input
            onChange={updateUser}
            type="email"
            id="email"
            className="w-full px-4 py-3 bg-gray-700 text-gray-300 rounded-lg border border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
            placeholder="Email address"
            required
          />
          <input
            onChange={updateUser}
            type="number"
            id="cohort"
            className="w-full px-4 py-3 bg-gray-700 text-gray-300 rounded-lg border border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
            placeholder="Cohort #"
            required
          />
        </div>
  
        <button
          type="submit"
          className="w-full mt-6 px-4 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition font-medium transform hover:scale-105"
        >
          Register
        </button>
      </form>
    </main>
  );
  
}
