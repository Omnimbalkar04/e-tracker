import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import { useParams } from 'react-router-dom'
import { axiosInstance } from '../lib/axios';
import ProfileHeader from '../component/ProfileHeader';
import toast from 'react-hot-toast';

const ProfilePage = () => {
  const {username} = useParams();
  const queryClient = useQueryClient();

  const { data: authUser , isLoading } = useQuery({ queryKey: ["authUser"], });

  const { data: userProfile , isLoading: isUserProfileIsLoading } = useQuery({ queryKey: ["userProfile", username],
    queryFn: () => axiosInstance.get(`/users/${username}`),
   });

   const { mutate: updateProfile } = useMutation({
    mutationFn: async (updatedData) => {
     await axiosInstance.put("users/profile", updatedData);
    },
    onSuccess: () => {
      toast.success("Profile Updated Successfully")
      queryClient.invalidateQueries(["userProfile", username]);
    }
   })

   if(isLoading || isUserProfileIsLoading) return null;

   const userData = authUser;

const handleSave = (updatedData) => {
  updateProfile(updatedData);
}
  return (
    <div className="max-w-4xl mx-auto p-4">
      <ProfileHeader userData={userData} onSave={handleSave}/>
    </div>
  )
}

export default ProfilePage