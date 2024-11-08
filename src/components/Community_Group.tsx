import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Religion {
  name: string;
  description: string;
  groups: string[];
}

const religions: Religion[] = [
  {
    name: 'Christianity',
    description: 'Christianity is based on the teachings of Jesus Christ and is one of the largest religions in the world.',
    groups: ['Catholic', 'Protestant', 'Orthodox'],
  },
  {
    name: 'Islam',
    description: 'Islam is a monotheistic faith revealed through the Prophet Muhammad, with teachings from the Quran.',
    groups: ['Sunni', 'Shia'],
  },
  {
    name: 'Hinduism',
    description: 'Hinduism is one of the oldest religions, characterized by a variety of rituals, philosophies, and beliefs.',
    groups: ['Vaishnavism', 'Shaivism', 'Shaktism'],
  },
  {
    name: 'Buddhism',
    description: 'Buddhism focuses on spiritual development, meditation, and the pursuit of enlightenment.',
    groups: ['Theravada', 'Mahayana', 'Vajrayana'],
  },
  {
    name: 'Judaism',
    description: 'Judaism is the monotheistic religion of the Jewish people, based on the teachings of the Torah.',
    groups: ['Orthodox', 'Conservative', 'Reform'],
  },
];

export default function CommunityGroup() {
  const [showModal, setShowModal] = useState(false);
  const [selectedReligion, setSelectedReligion] = useState<Religion | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleJoinClick = (religion: Religion, group: string) => {
    setSelectedReligion(religion);
    setSelectedGroup(group);
    setShowModal(true);
  };

  const handleNextClick = () => {
    if (selectedReligion && selectedGroup) {
      navigate(`/chat/${selectedReligion.name}/${selectedGroup}`);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Community Groups</h1>
      <p className="mb-6">
        Connect with like-minded individuals and explore diverse faith communities. Discover more about community groups and how they can enrich your spiritual journey.
      </p>

      <div className="border shadow-lg rounded-lg overflow-hidden">
        <table className="min-w-full">
          <caption className="text-lg font-medium p-4">Explore Religions and Their Groups</caption>
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left"><center>Group Number</center></th>
              <th className="p-4 text-left"><center>Religion</center></th>
              <th className="p-4 text-left"><center>Groups</center></th>
              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {religions.map((religion, index) => (
              <tr key={religion.name} className="border-t">
                <td className="p-4 font-medium">{index + 1}</td> {/* Group Number Column */}
                <td className="p-4 font-medium">{religion.name}</td>
                <td className="p-4">{religion.groups.join(', ')}</td>
                <td className="p-4 text-center">
                  {religion.groups.map((group, idx) => (
                    <button
                      key={idx}
                      className="bg-blue-500 text-white px-4 py-2 m-1 rounded hover:bg-blue-600 transition-all"
                      onClick={() => handleJoinClick(religion, group)} // Open modal on Join click
                    >
                      Join {group}
                    </button>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && selectedReligion && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[400px] relative">
            {/* Cross Symbol to Close Modal */}
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
              onClick={() => setShowModal(false)}
              aria-label="Close Modal"
            >
              &times;
            </button>
            <h2 className="text-xl font-semibold mb-4">{selectedReligion.name} - {selectedGroup}</h2>
            <p className="mb-4">{selectedReligion.description}</p>
            <button
              className="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-all"
              onClick={handleNextClick} // Redirect on Next button click
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
