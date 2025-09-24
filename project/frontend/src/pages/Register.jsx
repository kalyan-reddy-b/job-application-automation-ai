import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser } from '../api/api'

function Register() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    phone: '',
    college: '',
    branch: '',
    graduation_year: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      await registerUser(formData)
      navigate('/login', { 
        state: { message: 'Registration successful! Please login.' }
      })
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="text-center text-3xl font-bold text-gray-900">
            Create Account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Join JobPortal to find your dream job
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}
          
          <div className="grid grid-cols-2 gap-4">
            <input
              name="first_name"
              type="text"
              required
              value={formData.first_name}
              onChange={handleChange}
              placeholder="First Name"
              className="border border-gray-300 px-3 py-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
            <input
              name="last_name"
              type="text"
              required
              value={formData.last_name}
              onChange={handleChange}
              placeholder="Last Name"
              className="border border-gray-300 px-3 py-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <input
            name="username"
            type="text"
            required
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            className="w-full border border-gray-300 px-3 py-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />

          <input
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full border border-gray-300 px-3 py-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />

          <input
            name="password"
            type="password"
            required
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full border border-gray-300 px-3 py-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />

          <input
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            className="w-full border border-gray-300 px-3 py-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />

          <input
            name="college"
            type="text"
            value={formData.college}
            onChange={handleChange}
            placeholder="College/University"
            className="w-full border border-gray-300 px-3 py-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              name="branch"
              type="text"
              value={formData.branch}
              onChange={handleChange}
              placeholder="Branch/Stream"
              className="border border-gray-300 px-3 py-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
            <input
              name="graduation_year"
              type="number"
              value={formData.graduation_year}
              onChange={handleChange}
              placeholder="Graduation Year"
              className="border border-gray-300 px-3 py-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 disabled:opacity-50"
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>

          <div className="text-center">
            <span className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-600 hover:text-blue-800">
                Sign in
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register