import React, { useState, useEffect } from 'react';

interface Donation {
  donorName: string;
  amount: number;
}

interface DonationRequest {
  id: string;
  projectName: string;
  description: string;
  upi: string;
  donations: Donation[];
  verifiedBy: string | null;
}

const DonationComponent: React.FC = () => {
  const [requests, setRequests] = useState<DonationRequest[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [highlightedDonor, setHighlightedDonor] = useState<string | null>(null);

  // Modal state
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [upi, setUpi] = useState('');

  // Donation state
  const [donateMode, setDonateMode] = useState<string | null>(null);
  const [donorName, setDonorName] = useState('');
  const [amount, setAmount] = useState('');

  // Fetch token (assuming it's stored in localStorage)
  const getToken = () => {
    return localStorage.getItem('token');
  };

  const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
    const token = getToken();
    if (!token) {
      console.error('No authentication token found');
      throw new Error('Unauthorized');
    }
    const headers = {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    };

    return fetch(url, { ...options, headers });
  };

  // Fetch donation requests
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetchWithAuth('http://localhost:8080/api/donations');
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status}`);
        }
        const data = await response.json();
        setRequests(data);
      } catch (error) {
        console.error('Failed to fetch donation requests:', error);
      }
    };
    fetchRequests();
  }, []);

  // Open and close modal
  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setProjectName('');
    setDescription('');
    setUpi('');
  };

  // Create donation request
  const handleCreateRequest = async () => {
    if (projectName && description && upi) {
      try {
        const response = await fetchWithAuth('http://localhost:8080/api/donations', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ projectName, description, upi }),
        });
        if (!response.ok) {
          throw new Error(`Failed to create: ${response.status}`);
        }
        const newRequest = await response.json();
        setRequests((prev) => [...prev, newRequest]);
        handleCloseModal();
      } catch (error) {
        console.error('Failed to create donation request:', error);
      }
    }
  };

  // Add donation
  const handleAddDonation = async (requestId: string) => {
    if (donorName && amount) {
      try {
        const response = await fetchWithAuth(`http://localhost:8080/api/donations/${requestId}/donate`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ donorName, amount: parseFloat(amount) }),
        });
        if (!response.ok) {
          throw new Error(`Failed to donate: ${response.status}`);
        }
        const updatedRequest = await response.json();
        setRequests((prev) =>
          prev.map((request) =>
            request.id === requestId ? updatedRequest : request
          )
        );
        setDonateMode(null);
        setDonorName('');
        setAmount('');
      } catch (error) {
        console.error('Failed to add donation:', error);
      }
    }
  };

  // Verify donation
  const handleVerifyDonation = async (requestId: string, donorName: string) => {
    try {
      const response = await fetchWithAuth(`http://localhost:8080/api/donations/${requestId}/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ donorName }),
      });
      if (!response.ok) {
        throw new Error(`Failed to verify: ${response.status}`);
      }
      const updatedRequest = await response.json();
      setRequests((prev) =>
        prev.map((request) =>
          request.id === requestId ? updatedRequest : request
        )
      );
      setHighlightedDonor(donorName);
    } catch (error) {
      console.error('Failed to verify donation:', error);
    }
  };

  return (
    <div className="donation-app p-4 bg-gray-100 min-h-screen">
      <header className="mb-6 text-center">
        <h1 className="text-3xl font-bold text-gray-800">Donation Platform</h1>
        {highlightedDonor && (
          <div className="mt-4 bg-green-100 text-green-800 p-3 rounded-md">
            🎉 <strong>{highlightedDonor}</strong> has recently donated! 🎉
          </div>
        )}
        <button
          onClick={handleOpenModal}
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md"
        >
          Request Donation
        </button>
      </header>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Create Donation Request</h2>
            <label className="block mb-2">
              <span className="text-gray-700">Project Name</span>
              <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200"
              />
            </label>
            <label className="block mb-2">
              <span className="text-gray-700">Description</span>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200"
              />
            </label>
            <label className="block mb-4">
              <span className="text-gray-700">UPI ID</span>
              <input
                type="text"
                value={upi}
                onChange={(e) => setUpi(e.target.value)}
                className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200"
              />
            </label>
            <button
              onClick={handleCreateRequest}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md mr-2"
            >
              Submit
            </button>
            <button
              onClick={handleCloseModal}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Donation Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {requests.map((request) => (
          <div
            key={request.id}
            className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
          >
            <h3 className="text-xl font-semibold">{request.projectName}</h3>
            <p className="text-gray-700">{request.description}</p>
            <p className="text-sm text-gray-500">
              <strong>UPI:</strong> {request.upi}
            </p>
            {request.verifiedBy && (
              <p className="text-green-600 mt-2">
                <strong>Verified by:</strong> {request.verifiedBy}
              </p>
            )}
            <button
              onClick={() => setDonateMode(donateMode === request.id ? null : request.id)}
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg"
            >
              {donateMode === request.id ? 'Cancel' : 'Donate'}
            </button>
            {donateMode === request.id && (
              <div className="mt-4">
                <label className="block mb-2">
                  <span className="text-gray-700">Your Name</span>
                  <input
                    type="text"
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200"
                  />
                </label>
                <label className="block mb-4">
                  <span className="text-gray-700">Amount</span>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200"
                  />
                </label>
                <button
                  onClick={() => handleAddDonation(request.id)}
                  className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg mr-2"
                >
                  Submit Donation
                </button>
              </div>
            )}
            {request.donations.map((donation, index) => (
              <div
                key={index}
                className="mt-2 p-2 bg-gray-100 rounded-md shadow-sm"
              >
                <p>
                  Donor: <strong>{donation.donorName}</strong>, Amount: ₹
                  {donation.amount}
                </p>
                {!request.verifiedBy && (
                  <button
                    onClick={() =>
                      handleVerifyDonation(request.id, donation.donorName)
                    }
                    className="mt-2 text-sm bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded"
                  >
                    Verify Donation
                  </button>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DonationComponent;
