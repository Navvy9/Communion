import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface FormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: ''
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
      const response = await axios.post('http://localhost:8080/api/auth/login', formData);
      if (response.data.token) {
        // Store token and username in localStorage
        localStorage.setItem('token', response.data.token); // Store token for later use
        localStorage.setItem('username', response.data.username); // Store username

        setMessage('Login successful! Redirecting to dashboard...');
        setIsError(false);
        setTimeout(() => navigate('/'), 2000);
      }
    } catch (error: unknown) { // Specify the type as unknown
      if (axios.isAxiosError(error) && error.response) {
        setIsError(true);
        setMessage(error.response.data.message || 'Login failed. Please check your credentials.');
      } else {
        setIsError(true);
        setMessage('Login failed. Please try again.');
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-opacity-60 backdrop-blur-sm">
      <div className="w-full max-w-md p-8 space-y-3 bg-white bg-opacity-90 backdrop-blur-md rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center">Login</h1>
        {message && (
          <div className={`p-4 text-center ${isError ? 'text-red-600' : 'text-green-600'}`}>
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
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
          <button
            type="submit"
            className="w-full py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Login
          </button>
        </form>
        <p className="text-sm text-center">
          Don&apos;t have an account?{' '}
          <a href="/register" className="text-blue-600 hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
