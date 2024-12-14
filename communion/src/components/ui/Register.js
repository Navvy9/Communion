import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const Register = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        dob: '',
        religion: ''
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
            await axios.post('https://communion.onrender.com/api/auth/register', formData);
            setMessage('Registration successful! Redirecting to login...');
            setIsError(false);
            setTimeout(() => navigate('/login'), 2000);
        }
        catch (error) { // Specify the type as unknown
            if (axios.isAxiosError(error) && error.response) {
                setIsError(true);
                setMessage(error.response.data.message || 'Registration failed. Please try again.');
            }
            else {
                setIsError(true);
                setMessage('Registration failed. Please try again.');
            }
        }
    };
    return (_jsx("div", { className: "flex items-center justify-center min-h-screen bg-opacity-60 backdrop-blur-sm", children: _jsxs("div", { className: "w-full max-w-md p-8 space-y-3 bg-white bg-opacity-90 backdrop-blur-md rounded-lg shadow-lg", children: [_jsx("h1", { className: "text-2xl font-bold text-center", children: "Register" }), message && (_jsx("div", { className: `p-4 text-center ${isError ? 'text-red-600' : 'text-green-600'}`, children: message })), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("label", { className: "w-1/3 text-sm font-bold", children: "First Name" }), _jsx("input", { type: "text", name: "firstName", className: "w-2/3 px-3 py-2 border rounded-lg", value: formData.firstName, onChange: handleChange, required: true })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("label", { className: "w-1/3 text-sm font-bold", children: "Last Name" }), _jsx("input", { type: "text", name: "lastName", className: "w-2/3 px-3 py-2 border rounded-lg", value: formData.lastName, onChange: handleChange, required: true })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("label", { className: "w-1/3 text-sm font-bold", children: "Email" }), _jsx("input", { type: "email", name: "email", className: "w-2/3 px-3 py-2 border rounded-lg", value: formData.email, onChange: handleChange, required: true })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("label", { className: "w-1/3 text-sm font-bold", children: "Password" }), _jsx("input", { type: "password", name: "password", className: "w-2/3 px-3 py-2 border rounded-lg", value: formData.password, onChange: handleChange, required: true })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("label", { className: "w-1/3 text-sm font-bold", children: "Date of Birth" }), _jsx("input", { type: "date", name: "dob", className: "w-2/3 px-3 py-2 border rounded-lg", value: formData.dob, onChange: handleChange, required: true })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("label", { className: "w-1/3 text-sm font-bold", children: "Religion" }), _jsx("input", { type: "text", name: "religion", className: "w-2/3 px-3 py-2 border rounded-lg", value: formData.religion, onChange: handleChange, required: true })] }), _jsx("button", { type: "submit", className: "w-full py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700", children: "Register" })] }), _jsxs("p", { className: "text-sm text-center", children: ["Already have an account?", ' ', _jsx("a", { href: "/login", className: "text-blue-600 hover:underline", children: "Login" })] })] }) }));
};
export default Register;
