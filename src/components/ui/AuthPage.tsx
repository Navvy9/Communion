import React, { useState } from 'react';

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    religion: '',
    country: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      // Perform login logic here
      console.log('Logging in with:', { email: formData.email, password: formData.password });
    } else {
      // Perform registration logic here
      console.log('Registration data:', formData);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-500">
      <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-700">{isLogin ? 'Login' : 'Register'}</h2>
        </div>

        {/* Tab Switch */}
        <div className="flex justify-center mb-8">
          <button
            className={`w-1/2 p-2 ${isLogin ? 'bg-indigo-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={`w-1/2 p-2 ${!isLogin ? 'bg-indigo-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setIsLogin(false)}
          >
            Register
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <div className="mb-4">
                <label className="block mb-1 text-gray-600">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  required={!isLogin}
                />
              </div>

              <div className="mb-4">
                <label className="block mb-1 text-gray-600">Religion</label>
                <select
                  name="religion"
                  value={formData.religion}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  required={!isLogin}
                >
                  <option value="">Select Religion</option>
                  <option value="Hinduism">Hinduism</option>
                  <option value="Christianity">Christianity</option>
                  <option value="Islam">Islam</option>
                  <option value="Sikhism">Sikhism</option>
                  <option value="Judaism">Judaism</option>
                  <option value="Buddhism">Buddhism</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block mb-1 text-gray-600">Country</label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                  required={!isLogin}
                />
              </div>
            </>
          )}

          <div className="mb-4">
            <label className="block mb-1 text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-gray-600">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          {!isLogin && (
            <div className="mb-4">
              <label className="block mb-1 text-gray-600">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
                required={!isLogin}
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-indigo-500 text-white p-2 rounded-lg hover:bg-indigo-600 transition duration-200"
          >
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;
