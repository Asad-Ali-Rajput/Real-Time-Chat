import React, { useState } from 'react';

interface ProfileProps {
  initialPictureUrl: string;
  initialName: string;
  status: string;
  onUpdatePicture: (newPictureUrl: string) => void;
  onUpdateName: (newName: string) => void;
}

const Profile: React.FC<ProfileProps> = ({
  initialPictureUrl,
  initialName,
  status,
  onUpdatePicture,
  onUpdateName,
}) => {
  const [pictureUrl, setPictureUrl] = useState(initialPictureUrl);
  const [name, setName] = useState(initialName);
  const [isEditingName, setIsEditingName] = useState(false);

  const handlePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPictureUrl(e.target.value);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleUpdatePicture = () => {
    onUpdatePicture(pictureUrl);
  };

  const handleUpdateName = () => {
    onUpdateName(name);
    setIsEditingName(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const newPictureUrl = event.target.result as string;
        setPictureUrl(newPictureUrl);
        onUpdatePicture(newPictureUrl); // Update picture URL in parent component if needed
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex items-center space-x-4">
      <img
        src={pictureUrl}
        alt={`${name}'s profile`}
        className="w-12 h-12 rounded-full object-cover"
      />
      <div className="text-gray-900 dark:text-white">
        {isEditingName ? (
          <div className="flex space-x-2">
            <input
              type="text"
              value={name}
              onChange={handleNameChange}
              className="border p-1"
            />
            <button onClick={handleUpdateName} className="bg-blue-500 text-white px-2 py-1 rounded">
              Save
            </button>
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <p className="font-medium">{name}</p>
            <button onClick={() => setIsEditingName(true)} className="text-blue-500">
              Edit Name
            </button>
          </div>
        )}
        <p className="text-sm text-gray-500">{status}</p>
      </div>
      <div className="flex flex-col space-y-2">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="border p-1"
        />
        <button onClick={handleUpdatePicture} className="bg-blue-500 text-white px-2 py-1 rounded">
          Update Picture
        </button>
      </div>
    </div>
  );
};

export default Profile;
