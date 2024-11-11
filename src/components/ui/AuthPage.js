import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const AuthPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        dob: '',
        religion: '',
    });
    const [message, setMessage] = useState(null);
    const [isError, setIsError] = useState(false);
    const [isLogin, setIsLogin] = useState(true); // Toggle between login and register
    const navigate = useNavigate();
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = isLogin
            ? 'https://communion.onrender.com/api/auth/login'
            : 'https://communion.onrender.com/api/auth/register';
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
                }
                else {
                    setMessage('Login failed. No token received.');
                    setIsError(true);
                }
            }
            else {
                // Handle registration separately
                if (response.status === 200 || response.status === 201) {
                    setMessage('Registration successful! Please log in.');
                    setIsError(false);
                    setTimeout(() => setIsLogin(true), 2000);
                }
                else {
                    setMessage('Registration response received but may have an issue.');
                    setIsError(true);
                }
            }
        }
        catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                const errorMessage = error.response.data.message ||
                    `${isLogin ? 'Login' : 'Registration'} failed. Please try again.`;
                setIsError(true);
                setMessage(errorMessage);
                console.error('Error details:', error.response.data); // Log the error response
            }
            else {
                setIsError(true);
                setMessage('Something went wrong. Please try again.');
                console.error('Unknown error:', error); // Log unknown errors
            }
        }
    };
    return (_jsx("div", { className: "flex items-center justify-center min-h-screen bg-opacity-60 backdrop-blur-sm", children: _jsxs("div", { className: "w-full max-w-md p-8 space-y-3 bg-white bg-opacity-90 backdrop-blur-md rounded-lg shadow-lg", children: [_jsx("h1", { className: "text-2xl font-bold text-center", children: isLogin ? 'Login' : 'Register' }), message && (_jsx("div", { className: `p-4 text-center ${isError ? 'text-red-600' : 'text-green-600'}`, children: message })), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [isLogin ? (_jsxs(_Fragment, { children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("label", { className: "w-1/3 text-sm font-bold", children: "Email" }), _jsx("input", { type: "email", name: "email", className: "w-2/3 px-3 py-2 border rounded-lg", value: formData.email, onChange: handleChange, required: true })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("label", { className: "w-1/3 text-sm font-bold", children: "Password" }), _jsx("input", { type: "password", name: "password", className: "w-2/3 px-3 py-2 border rounded-lg", value: formData.password, onChange: handleChange, required: true })] })] })) : (_jsxs(_Fragment, { children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("label", { className: "w-1/3 text-sm font-bold", children: "First Name" }), _jsx("input", { type: "text", name: "firstName", className: "w-2/3 px-3 py-2 border rounded-lg", value: formData.firstName, onChange: handleChange, required: true })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("label", { className: "w-1/3 text-sm font-bold", children: "Last Name" }), _jsx("input", { type: "text", name: "lastName", className: "w-2/3 px-3 py-2 border rounded-lg", value: formData.lastName, onChange: handleChange, required: true })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("label", { className: "w-1/3 text-sm font-bold", children: "Email" }), _jsx("input", { type: "email", name: "email", className: "w-2/3 px-3 py-2 border rounded-lg", value: formData.email, onChange: handleChange, required: true })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("label", { className: "w-1/3 text-sm font-bold", children: "Password" }), _jsx("input", { type: "password", name: "password", className: "w-2/3 px-3 py-2 border rounded-lg", value: formData.password, onChange: handleChange, required: true })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("label", { className: "w-1/3 text-sm font-bold", children: "Date of Birth" }), _jsx("input", { type: "date", name: "dob", className: "w-2/3 px-3 py-2 border rounded-lg", value: formData.dob, onChange: handleChange, required: true })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("label", { className: "w-1/3 text-sm font-bold", children: "Religion" }), _jsx("input", { type: "text", name: "religion", className: "w-2/3 px-3 py-2 border rounded-lg", value: formData.religion, onChange: handleChange, required: true })] })] })), _jsx("button", { type: "submit", className: "w-full py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700", children: isLogin ? 'Login' : 'Register' })] }), _jsxs("p", { className: "text-sm text-center", children: [isLogin ? "Don't have an account?" : 'Already have an account?', ' ', _jsx("button", { onClick: () => setIsLogin(!isLogin), className: "text-blue-600 hover:underline", children: isLogin ? 'Register' : 'Login' })] })] }) }));
};
export default AuthPage;
