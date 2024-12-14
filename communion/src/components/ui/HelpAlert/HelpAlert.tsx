import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface HelpAlertData {
  name: string;
  helpNeeded: string;
  email: string;
  phoneNumber: string;
}

interface DisplayHelpAlert {
  _id: string;
  name: string;
  helpNeeded: string;
  email: string;
  phoneNumber: string;
  createdAt: string;
  userId: string;
  status: string;
}

const HelpAlert: React.FC = () => {
  const [formData, setFormData] = useState<HelpAlertData>({
    name: '',
    helpNeeded: '',
    email: '',
    phoneNumber: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [helpAlerts, setHelpAlerts] = useState<DisplayHelpAlert[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const loggedInUserId = localStorage.getItem('userId');
  const username = localStorage.getItem("username") || "";

  useEffect(() => {
    const fetchHelpAlerts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/helpalerts', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setHelpAlerts(response.data);
      } catch (err) {
        console.error('Error fetching help alerts:', err);
        setError('Failed to fetch help alerts. Please try again later.');
        setTimeout(() => setError(null), 2000);  // Clear error after 2 seconds
      }
    };
    fetchHelpAlerts();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await axios.post(
        'http://localhost:8080/api/helpalerts',
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setSuccessMessage('Help Alert created successfully!');
      setTimeout(() => setSuccessMessage(null), 2000);  // Clear success message after 2 seconds

      setFormData({
        name: '',
        helpNeeded: '',
        email: '',
        phoneNumber: '',
      });
      setHelpAlerts((prev) => [response.data, ...prev]);
      setIsModalOpen(false); // Close modal after successful submission
    } catch (err) {
      console.error('Error creating Help Alert:', err);
      setError('Failed to create Help Alert. Please log in first.');
      setTimeout(() => setError(null), 2000);  // Clear error after 2 seconds
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:8080/api/helpalerts/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setHelpAlerts((prev) => prev.filter((alert) => alert._id !== id));
    } catch (err) {
      console.error('Failed to delete Help Alert:', err);
      setError('Failed to delete Help Alert. Please try again.');
      setTimeout(() => setError(null), 2000);  // Clear error after 2 seconds
    }
  };

  const handleStatusChange = async (id: string, status: string) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/helpalerts/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setHelpAlerts((prev) =>
        prev.map((alert) =>
          alert._id === id ? { ...alert, status: response.data.status } : alert
        )
      );
    } catch (err) {
      console.error('Error updating status:', err);
      setError('Failed to update status. Only user who created help will be able to change status.');
      setTimeout(() => setError(null), 2000);  // Clear error after 2 seconds
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Help Alerts</h1>

      <button
        onClick={() => setIsModalOpen(true)}
        className="absolute top-4 right-4 bg-blue-500 text-white p-2 rounded"
      >
        Create Help
      </button>

      {/* Show success or error message */}
      {successMessage && <p className="text-green-500">{successMessage}</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-md w-1/3">
            <h2 className="text-2xl font-bold mb-4">Create Help Alert</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="helpNeeded" className="block text-sm font-medium text-gray-700">
                  Help Needed
                </label>
                <input
                  type="text"
                  id="helpNeeded"
                  name="helpNeeded"
                  value={formData.helpNeeded}
                  onChange={(e) => setFormData({ ...formData, helpNeeded: e.target.value })}
                  required
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                  required
                  className="mt-1 p-2 border border-gray-300 rounded w-full"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-300 text-black p-2 rounded"
                >
                  Cancel
                </button>
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {helpAlerts.map((alert) => (
            <div key={alert._id} className="bg-white p-4 rounded shadow-md">
              <h3 className="text-lg font-semibold">{alert.name}</h3>
              <p className="text-sm text-gray-600">{alert.helpNeeded}</p>
              <p className="text-sm">{alert.email}</p>
              <p className="text-sm">{alert.phoneNumber}</p>
              <p className="text-xs text-gray-400">
                {new Date(alert.createdAt).toLocaleString()}
              </p>

              {/* Status section */}
              <div>
                <button
                  onClick={() => handleStatusChange(alert._id, 'pending')}
                  className={`mr-2 p-2 rounded ${alert.status === 'pending' ? 'bg-red-500' : 'bg-gray-300'}`}
                >
                  Pending
                </button>
                <button
                  onClick={() => handleStatusChange(alert._id, 'fulfilled')}
                  className={`p-2 rounded ${alert.status === 'fulfilled' ? 'bg-green-500' : 'bg-gray-300'}`}
                >
                  Fulfilled
                </button>
                <p className={`mt-2 ${alert.status === 'fulfilled' ? 'text-green-500' : 'text-red-500'}`}>
                  {alert.status === 'fulfilled' ? '✔ Fulfilled' : '! Pending'}
                </p>
              </div>

              {alert.userId === loggedInUserId && (
                <button
                  onClick={() => handleDelete(alert._id)}
                  className="mt-2 bg-red-500 text-white p-2 rounded"
                >
                  Delete
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HelpAlert;
