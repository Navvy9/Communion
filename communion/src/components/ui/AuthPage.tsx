import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface LoginFormData {
  email: string;
  password: string;
}

interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dob: string;
  religion: string;
}

const AuthPage: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormData | RegisterFormData>({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    dob: '',
    religion: '',
  });
  const [message, setMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and register
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const url = isLogin
      ? 'http://localhost:8080/api/auth/login'
      : 'http://localhost:8080/api/auth/register';

    try {
      const response = await axios.post(url, formData);
      console.log('Server Response:', response); // Log the response for debugging

      if (isLogin) {
        if (response.data.token) {
          // Store token and username for login
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('username', response.data.username);
          setMessage('Login successful! Redirecting...');
          setIsError(false);
          setTimeout(() => navigate('/'), 2000);
        } else {
          setMessage('Login failed. No token received.');
          setIsError(true);
        }
      } else {
        // Handle registration separately
        if (response.status === 200 || response.status === 201) {
          setMessage('Registration successful! Please log in.');
          setIsError(false);
          setTimeout(() => setIsLogin(true), 2000);
        } else {
          setMessage('Registration response received but may have an issue.');
          setIsError(true);
        }
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        const errorMessage =
          error.response.data.message ||
          `${isLogin ? 'Login' : 'Registration'} failed. Please try again.`;
        setIsError(true);
        setMessage(errorMessage);
        console.error('Error details:', error.response.data); // Log the error response
      } else {
        setIsError(true);
        setMessage('Something went wrong. Please try again.');
        console.error('Unknown error:', error); // Log unknown errors
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-opacity-60 backdrop-blur-sm">
      <div className="w-full max-w-md p-8 space-y-3 bg-white bg-opacity-90 backdrop-blur-md rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center">
          {isLogin ? 'Login' : 'Register'}
        </h1>
        {message && (
          <div
            className={`p-4 text-center ${isError ? 'text-red-600' : 'text-green-600'}`}
          >
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          {isLogin ? (
            <>
              <div className="flex items-center space-x-2">
                <label className="w-1/3 text-sm font-bold">Email</label>
                <input
                  type="email"
                  name="email"
                  className="w-2/3 px-3 py-2 border rounded-lg"
                  value={(formData as LoginFormData).email}
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
                  value={(formData as LoginFormData).password}
                  onChange={handleChange}
                  required
                />
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center space-x-2">
                <label className="w-1/3 text-sm font-bold">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  className="w-2/3 px-3 py-2 border rounded-lg"
                  value={(formData as RegisterFormData).firstName}
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
                  value={(formData as RegisterFormData).lastName}
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
                  value={(formData as RegisterFormData).email}
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
                  value={(formData as RegisterFormData).password}
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
                  value={(formData as RegisterFormData).dob}
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
                  value={(formData as RegisterFormData).religion}
                  onChange={handleChange}
                  required
                />
              </div>
            </>
          )}
          <button
            type="submit"
            className="w-full py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>
        <p className="text-sm text-center">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-600 hover:underline"
          >
            {isLogin ? 'Register' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
