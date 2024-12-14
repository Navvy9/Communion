import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [message, setMessage] = useState(null);
    const [isError, setIsError] = useState(false);
    const navigate = useNavigate();
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
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
        }
        catch (error) { // Specify the type as unknown
            if (axios.isAxiosError(error) && error.response) {
                setIsError(true);
                setMessage(error.response.data.message || 'Login failed. Please check your credentials.');
            }
            else {
                setIsError(true);
                setMessage('Login failed. Please try again.');
            }
        }
    };
    return (_jsx("div", { className: "flex items-center justify-center min-h-screen bg-opacity-60 backdrop-blur-sm", children: _jsxs("div", { className: "w-full max-w-md p-8 space-y-3 bg-white bg-opacity-90 backdrop-blur-md rounded-lg shadow-lg", children: [_jsx("h1", { className: "text-2xl font-bold text-center", children: "Login" }), message && (_jsx("div", { className: `p-4 text-center ${isError ? 'text-red-600' : 'text-green-600'}`, children: message })), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("label", { className: "w-1/3 text-sm font-bold", children: "Email" }), _jsx("input", { type: "email", name: "email", className: "w-2/3 px-3 py-2 border rounded-lg", value: formData.email, onChange: handleChange, required: true })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("label", { className: "w-1/3 text-sm font-bold", children: "Password" }), _jsx("input", { type: "password", name: "password", className: "w-2/3 px-3 py-2 border rounded-lg", value: formData.password, onChange: handleChange, required: true })] }), _jsx("button", { type: "submit", className: "w-full py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700", children: "Login" })] }), _jsxs("p", { className: "text-sm text-center", children: ["Don't have an account?", ' ', _jsx("a", { href: "/register", className: "text-blue-600 hover:underline", children: "Register" })] })] }) }));
};
export default Login;
