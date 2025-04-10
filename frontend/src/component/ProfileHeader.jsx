import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Camera } from 'lucide-react';
import React, { useState } from 'react'

const ProfileHeader = ({ onSave, userData }) => {

  const [isEditing , setIsEditing] = useState(false);
  const [editedData, setEditedData ] = useState({});

  const queryClient = useQueryClient();

  const { data: authUser } = useQuery({ queryKey: ["authUser"] })

  const handleImageChange = (event) => {
  const file = event.target.files[0];
  if(file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      setEditedData((prev) => ({ ...prev, [event.target.name]: reader.result }));
    };
    reader.readAsDataURL(file);
  }
  }

  const handleSave = () => {
    onSave(editedData);
    setIsEditing(false);
  }
  return (
    <div className="bg-white shadow rounded-lg mb-6  ">
      <div className="p-4 grid grid-cols-2">
        <div className=" mt-5 mb-4">
          <img src={editedData.profilePicture || userData.profilePicture || "/avatar.png"} alt={userData.name} className="lg:w-40 lg:h-40 w-32 h-32 rounded-full mx-auto object-cover" />

          {isEditing && (
            <label className="flex justify-center m-1 right-1/2 transform tranlate-x-16 text-black bg-white p-2 rounded-full shadow cursor-pointer">
              <Camera size={20} />
              <input type="file" className="hidden" name='profilePicture'
               onChange={handleImageChange}
                accect='image/*' />
            </label>
          )}
        </div>

        <div className=" m-4">
          {isEditing ? (
            <input type="text" value={editedData.name ?? userData.name} onChange={(e) => setEditedData({ ...editedData, name: e.target.value })} className="text-2xl text-black font-bold mb-2 text-center w-full" />
          ) : (
            <div className="">
            <h1 className="text-4xl font-bold mb-2 text-black">{userData.name} {userData.username}</h1>
            <h2 className="text-2xl font-bold mb-2 text-gray-500">{userData.email}</h2>
            </div>
            
          )}
        </div>
      </div>

      

      {isEditing ? (
        <button 
        onClick={handleSave}
         className="w-full bg-blue-800 text-white py-2 px-4 rounded-full hover:bg-blue-dark transition duration-300">
          Save Profile
        </button>
      ) : (
        <button onClick={() => setIsEditing(true)} className="w-full bg-blue-800 text-white py-2 px-4 rounded-full hover:bg-blue-dark transition duration-300">
          Edit Profile
        </button>
      )}

     

    </div>
  )
}

export default ProfileHeader