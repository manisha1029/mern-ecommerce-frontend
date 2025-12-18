import React from 'react';
import Navbar from '../features/navbar/Navbar';
import UserOrders from '../features/user/components/UserOrders';

function UserOrdersPage() {
  return (
    <Navbar>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 bg-white h-full p-10">
        <h1 className="text-2xl font-bold">My Orders</h1>
        <UserOrders />
      </div>
    </Navbar>
  );
}

export default UserOrdersPage;
