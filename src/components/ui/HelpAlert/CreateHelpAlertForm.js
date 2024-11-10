import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
const CreateHelpAlertForm = ({ addHelpAlert }) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [photo, setPhoto] = useState(null);
    const handleSubmit = (e) => {
        e.preventDefault();
        addHelpAlert({ name, description, photo });
        setName("");
        setDescription("");
        setPhoto(null);
    };
    return (_jsxs("form", { onSubmit: handleSubmit, className: "space-y-4 p-4 border rounded-lg shadow-md", children: [_jsx("input", { type: "text", placeholder: "Name", value: name, onChange: (e) => setName(e.target.value), className: "w-full p-2 border rounded", required: true }), _jsx("textarea", { placeholder: "What help is needed?", value: description, onChange: (e) => setDescription(e.target.value), className: "w-full p-2 border rounded", required: true }), _jsx("input", { type: "file", onChange: (e) => setPhoto(e.target.files ? e.target.files[0] : null), className: "w-full p-2 border rounded" }), _jsx("button", { type: "submit", className: "w-full bg-blue-500 text-white p-2 rounded", children: "Create Help Alert" })] }));
};
export default CreateHelpAlertForm;
