import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dob: string;
  religion: string;
}

const Register: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    dob: '',
    religion: ''
  });

  const [message, setMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      await axios.post('http://communion.onrender.com/api/auth/register', formData);
      setMessage('Registration successful! Redirecting to login...');
      setIsError(false);
      setTimeout(() => navigate('/login'), 2000);
    } catch (error: unknown) { // Specify the type as unknown
      if (axios.isAxiosError(error) && error.response) {
        setIsError(true);
        setMessage(error.response.data.message || 'Registration failed. Please try again.');
      } else {
        setIsError(true);
        setMessage('Registration failed. Please try again.');
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-opacity-60 backdrop-blur-sm">
      <div className="w-full max-w-md p-8 space-y-3 bg-white bg-opacity-90 backdrop-blur-md rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center">Register</h1>
        {message && (
          <div className={`p-4 text-center ${isError ? 'text-red-600' : 'text-green-600'}`}>
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center space-x-2">
            <label className="w-1/3 text-sm font-bold">First Name</label>
            <input
              type="text"
              name="firstName"
              className="w-2/3 px-3 py-2 border rounded-lg"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex items-center space-x-2">
            <label className="w-1/3 text-sm font-bold">Last Name</label>
            <input
              type="text"
              name="lastName"
              className="w-2/3 px-3 py-2 border rounded-lg"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex items-center space-x-2">
            <label className="w-1/3 text-sm font-bold">Email</label>
            <input
              type="email"
              name="email"
              className="w-2/3 px-3 py-2 border rounded-lg"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex items-center space-x-2">
            <label className="w-1/3 text-sm font-bold">Password</label>
            <input
              type="password"
              name="password"
              className="w-2/3 px-3 py-2 border rounded-lg"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex items-center space-x-2">
            <label className="w-1/3 text-sm font-bold">Date of Birth</label>
            <input
              type="date"
              name="dob"
              className="w-2/3 px-3 py-2 border rounded-lg"
              value={formData.dob}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex items-center space-x-2">
            <label className="w-1/3 text-sm font-bold">Religion</label>
            <input
              type="text"
              name="religion"
              className="w-2/3 px-3 py-2 border rounded-lg"
              value={formData.religion}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Register
          </button>
        </form>
        <p className="text-sm text-center">
          Already have an account?{' '}
          <a href="/login" className="text-blue-600 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
