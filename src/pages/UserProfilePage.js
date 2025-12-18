import React from 'react';
import Navbar from '../features/navbar/Navbar';
import UserProfile from '../features/user/components/UserProfile';

function UserProfilePage() {
  return (
    <Navbar>
      <div className="bg-white min-h-screen">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <h1 className="text-2xl font-bold">My Profile</h1>
          <UserProfile />
        </div>
      </div>
    </Navbar>
  );
}

export default UserProfilePage;
