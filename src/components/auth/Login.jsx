// learning-moments/src/components/auth/Login.jsx
import   { useState } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import "./Login.css"
import { getUserByEmail } from "../../services/userService"

export const Login = () => {
  const [email, set] = useState("")
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()

    return getUserByEmail(email).then((foundUsers) => {
      if (foundUsers.length === 1) {
        const user = foundUsers[0]
        localStorage.setItem(
          "learning_user",
          JSON.stringify({
            id: user.id,
          })
        )

        navigate("/")
      } else {
        window.alert("Invalid login")
      }
    })
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white px-6 py-10">
      <section className="bg-gray-800 bg-opacity-80 backdrop-blur-md shadow-lg rounded-lg p-8 w-full max-w-md border border-gray-700">
        <form onSubmit={handleLogin}>
          <h1 className="text-4xl font-extrabold text-gray-100 tracking-wide mb-4 text-center">
            Learning Moments
          </h1>
          <h2 className="text-lg text-gray-400 text-center mb-6">Please sign in</h2>
          <h3>liam.chen@example.com</h3>
  
          <div className="space-y-4">
            <input
              type="email"
              value={email}
              className="w-full px-4 py-3 bg-gray-700 text-gray-300 rounded-lg border border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
              onChange={(evt) => set(evt.target.value)}
              placeholder="Email address"
              required
            />
          </div>
  
          <button
            type="submit"
            className="w-full mt-6 px-4 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition font-medium transform hover:scale-105"
          >
            Sign in
          </button>
        </form>
      </section>
  
      <section className="mt-4 text-gray-400">
        <Link
          to="/register"
          className="hover:text-indigo-400 transition transform hover:scale-105"
        >
          Not a member yet? Register here
        </Link>
      </section>
    </main>
  );
  
}

