import React, { useState } from "react";

interface HelpAlertData {
  name: string;
  description: string;
  photo?: File | null;
}

interface CreateHelpAlertFormProps {
  addHelpAlert: (alertData: HelpAlertData) => void;
}

const CreateHelpAlertForm: React.FC<CreateHelpAlertFormProps> = ({ addHelpAlert }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addHelpAlert({ name, description, photo });
    setName("");
    setDescription("");
    setPhoto(null);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-lg shadow-md">
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <textarea
        placeholder="What help is needed?"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="file"
        onChange={(e) => setPhoto(e.target.files ? e.target.files[0] : null)}
        className="w-full p-2 border rounded"
      />
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
        Create Help Alert
      </button>
    </form>
  );
};

export default CreateHelpAlertForm;
