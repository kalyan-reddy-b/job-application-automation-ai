import { useEffect, useState } from 'react'
import { fetchMyApplications } from '../api/api'
import { useAuth } from '../hooks/useAuth'

function Dashboard() {
  const { user } = useAuth()
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadApplications()
  }, [])

  const loadApplications = async () => {
    try {
      const response = await fetchMyApplications()
      setApplications(response.data)
    } catch (error) {
      console.error('Error loading applications:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      reviewing: 'bg-blue-100 text-blue-800',
      interview: 'bg-purple-100 text-purple-800',
      accepted: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800'
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
  }

  const stats = {
    total: applications.length,
    pending: applications.filter(app => app.status === 'pending').length,
    interview: applications.filter(app => app.status === 'interview').length,
    accepted: applications.filter(app => app.status === 'accepted').length
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading dashboard...</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {user?.first_name || user?.username}!
        </h1>
        <p className="text-gray-600 mt-2">Here's an overview of your job applications</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">Total Applications</h3>
          <p className="text-3xl font-bold text-blue-600">{stats.total}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">Pending</h3>
          <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">Interviews</h3>
          <p className="text-3xl font-bold text-purple-600">{stats.interview}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">Accepted</h3>
          <p className="text-3xl font-bold text-green-600">{stats.accepted}</p>
        </div>
      </div>

      {/* Recent Applications */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="px-6 py-4 border-b">
          <h2 className="text-xl font-semibold text-gray-800">Recent Applications</h2>
        </div>
        <div className="p-6">
          {applications.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No applications yet.</p>
              <a href="/jobs" className="text-blue-600 hover:text-blue-800 mt-2 inline-block">
                Browse jobs to get started →
              </a>
            </div>
          ) : (
            <div className="space-y-4">
              {applications.slice(0, 5).map((application) => (
                <div key={application.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-semibold text-gray-900">{application.job.title}</h3>
                    <p className="text-gray-600">{application.job.company.name}</p>
                    <p className="text-sm text-gray-500">
                      Applied on {new Date(application.applied_date).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(application.status)}`}>
                      {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                    </span>
                  </div>
                </div>
              ))}
              {applications.length > 5 && (
                <div className="text-center pt-4">
                  <a href="/applications" className="text-blue-600 hover:text-blue-800">
                    View all applications →
                  </a>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard