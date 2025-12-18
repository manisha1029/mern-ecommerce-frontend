import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUserInfo } from '../userSlice';
import { updateUserAsync } from '../userSlice';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';

export default function UserProfile() {
  const user = useSelector(selectUserInfo);
  const [selectEditAddress, setSelectEditAddress] = useState(null);
  const [isAddNewAddress, setIsAddNewAddress] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm();


  function handleAddNewAddressSubmit(data) {
    const newUser = {...user, address: [...user.address, data]};
    dispatch(updateUserAsync(newUser));
    toast.success('Address added successfully');
    setIsAddNewAddress(false);
    setIsOpen(false);
    reset();
  }

  function handleEditAddress(index, address) {
    setSelectEditAddress(index);
    setIsOpen(true);
    setValue('name', address.name);
    setValue('email', address.email);
    setValue('phone-number', address['phone-number']);
    setValue('address', address.address);
    setValue('city', address.city);
    setValue('state', address.state);
    setValue('postal-code', address['postal-code']);
  }

  function handleEditAddressSubmit(data) {
    // Handle form submission logic here
    const newUser = { ...user, address: [...user.address] }; // for shallow copy issue.
    newUser.address[selectEditAddress] = data;
    dispatch(updateUserAsync(newUser));
    // Close modal after successful submission
    setIsOpen(false);
    setSelectEditAddress(null);
    toast.success('Address updated successfully');
    reset();
  }

  function handleRemoveAddress(index) {
    const newUser = { ...user, address: [...user.address] }; // for shallow copy issue.
    newUser.address.splice(index, 1);
    dispatch(updateUserAsync(newUser));
    toast.success('Address removed successfully');
  }

  return (
    <div>
      <div>
        <div>
          <div className="mx-auto mt-12 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <h1 className="text-4xl my-5 font-bold tracking-tight text-gray-900">
                Name : {user?.address?.name || 'Guest User'}
              </h1>
              <h3 className="text-xl my-5 font-bold tracking-tight text-red-900">
                Email address: {user?.email}
              </h3>
              <h3 className="text-xl my-5 font-bold tracking-tight text-red-900">
                User Role : {user?.role}
              </h3>
            </div>
            {isAddNewAddress && (
              <div
                className={`${isOpen ? 'fixed' : 'hidden'} inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center backdrop-blur-sm`}
                onClick={() => {
                  setIsOpen(false);
                  setIsAddNewAddress(false);
                }}
              >
                <div
                  className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto relative"
                  onClick={e => e.stopPropagation()}
                >
                  {/* Close button */}
                  <button
                    type="button"
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10"
                    onClick={() => {
                      setIsOpen(false);
                      setIsAddNewAddress(false);
                    }}
                  >
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>

                  <form
                    className="px-6 py-8"
                    onSubmit={handleSubmit(handleAddNewAddressSubmit)}
                  >
                    <div className="space-y-12">
                      <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-2xl font-semibold leading-7 text-gray-900">
                          Personal Information
                        </h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                          Use a permanent address where you can receive mail.
                        </p>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                          <div className="sm:col-span-3">
                            <label
                              htmlFor="name"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Full Name
                            </label>
                            <div className="mt-2">
                              <input
                                type="text"
                                name="name"
                                id="name"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ps-2"
                                {...register('name', {
                                  required: 'Name is required',
                                })}
                              />
                              {errors.name && (
                                <p className="text-red-500">
                                  {errors.name.message}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="sm:col-span-4">
                            <label
                              htmlFor="email"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Email address
                            </label>
                            <div className="mt-2">
                              <input
                                type="email"
                                name="email"
                                id="email"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ps-2"
                                {...register('email', {
                                  required: 'Email is required',
                                  pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: 'Invalid email address',
                                  },
                                })}
                              />
                              {errors.email && (
                                <p className="text-red-500">
                                  {errors.email.message}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="sm:col-span-3">
                            <label
                              htmlFor="phone-number"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Phone Number
                            </label>
                            <div className="mt-2">
                              <input
                                type="tel"
                                name="phone-number"
                                id="phone-number"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ps-2 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                {...register('phone-number', {
                                  required: 'Phone Number is required',
                                  minLength: {
                                    value: 10,
                                    message: 'Phone Number must be 10 digits',
                                  },
                                  maxLength: {
                                    value: 10,
                                    message: 'Phone Number must be 10 digits',
                                  },
                                })}
                              />
                              {errors['phone-number'] && (
                                <p className="text-red-500">
                                  {errors['phone-number'].message}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="col-span-full">
                            <label
                              htmlFor="address"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Street address
                            </label>
                            <div className="mt-2">
                              <input
                                type="text"
                                name="address"
                                id="address"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ps-2 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                {...register('address', {
                                  required: 'Address is required',
                                })}
                              />
                              {errors.address && (
                                <p className="text-red-500">
                                  {errors.address.message}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="sm:col-span-2 sm:col-start-1">
                            <label
                              htmlFor="city"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              City
                            </label>
                            <div className="mt-2">
                              <input
                                type="text"
                                name="city"
                                id="city"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ps-2 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                {...register('city', {
                                  required: 'City is required',
                                })}
                              />
                              {errors.city && (
                                <p className="text-red-500">
                                  {errors.city.message}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="sm:col-span-2">
                            <label
                              htmlFor="region"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              State / Province
                            </label>
                            <div className="mt-2">
                              <input
                                type="text"
                                name="region"
                                id="region"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ps-2 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                {...register('state', {
                                  required: 'State is required',
                                })}
                              />
                              {errors.state && (
                                <p className="text-red-500">
                                  {errors.state.message}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="sm:col-span-2">
                            <label
                              htmlFor="postal-code"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              ZIP / Postal code
                            </label>
                            <div className="mt-2">
                              <input
                                type="number"
                                name="postal-code"
                                id="postal-code"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ps-2 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                {...register('postal-code', {
                                  required: 'Postal Code is required',
                                })}
                              />
                              {errors['postal-code'] && (
                                <p className="text-red-500">
                                  {errors['postal-code'].message}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 flex items-center justify-end gap-x-6">
                        <button
                          type="button"
                          className="text-sm font-semibold leading-6 text-gray-900 hover:text-gray-700"
                          onClick={() => {
                            setIsOpen(false);
                            setIsAddNewAddress(false);
                            reset();
                          }}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          Add Address
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            )}
            <div className="flex justify-end mb-5">
              <button
                type="button"
                onClick={() => {
                  setIsOpen(true);
                  setIsAddNewAddress(true);
                  reset();
                }}
                className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
              >
                Add New Address
              </button>
            </div>
            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <p className="mt-0.5 text-sm text-gray-500">Your Addresses :</p>
              {user?.address?.map((address, index) => (
                // Modal for Add new address
                <div key={index}>
                  {selectEditAddress === index && (
                    <div
                      className={`${isOpen ? 'fixed' : 'hidden'} inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center backdrop-blur-sm`}
                      onClick={() => {
                        setIsOpen(false);
                        setIsAddNewAddress(false);
                      }}
                    >
                      <div
                        className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto relative"
                        onClick={e => e.stopPropagation()}
                      >
                        {/* Close button */}
                        <button
                          type="button"
                          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10"
                          onClick={() => {
                            setIsOpen(false);
                            setIsAddNewAddress(false);
                          }}
                        >
                          <svg
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>

                        <form
                          className="px-6 py-8"
                          onSubmit={handleSubmit(handleEditAddressSubmit)}
                        >
                          <div className="space-y-12">
                            <div className="border-b border-gray-900/10 pb-12">
                              <h2 className="text-2xl font-semibold leading-7 text-gray-900">
                                Personal Information
                              </h2>
                              <p className="mt-1 text-sm leading-6 text-gray-600">
                                Use a permanent address where you can receive
                                mail.
                              </p>

                              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-3">
                                  <label
                                    htmlFor="name"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                  >
                                    Full Name
                                  </label>
                                  <div className="mt-2">
                                    <input
                                      type="text"
                                      name="name"
                                      id="name"
                                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ps-2"
                                      {...register('name', {
                                        required: 'Name is required',
                                      })}
                                    />
                                    {errors.name && (
                                      <p className="text-red-500">
                                        {errors.name.message}
                                      </p>
                                    )}
                                  </div>
                                </div>

                                <div className="sm:col-span-4">
                                  <label
                                    htmlFor="email"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                  >
                                    Email address
                                  </label>
                                  <div className="mt-2">
                                    <input
                                      type="email"
                                      name="email"
                                      id="email"
                                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ps-2"
                                      {...register('email', {
                                        required: 'Email is required',
                                        pattern: {
                                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                          message: 'Invalid email address',
                                        },
                                      })}
                                    />
                                    {errors.email && (
                                      <p className="text-red-500">
                                        {errors.email.message}
                                      </p>
                                    )}
                                  </div>
                                </div>

                                <div className="sm:col-span-3">
                                  <label
                                    htmlFor="phone-number"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                  >
                                    Phone Number
                                  </label>
                                  <div className="mt-2">
                                    <input
                                      type="tel"
                                      name="phone-number"
                                      id="phone-number"
                                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ps-2 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                      {...register('phone-number', {
                                        required: 'Phone Number is required',
                                        minLength: {
                                          value: 10,
                                          message:
                                            'Phone Number must be 10 digits',
                                        },
                                        maxLength: {
                                          value: 10,
                                          message:
                                            'Phone Number must be 10 digits',
                                        },
                                      })}
                                    />
                                    {errors['phone-number'] && (
                                      <p className="text-red-500">
                                        {errors['phone-number'].message}
                                      </p>
                                    )}
                                  </div>
                                </div>

                                <div className="col-span-full">
                                  <label
                                    htmlFor="address"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                  >
                                    Street address
                                  </label>
                                  <div className="mt-2">
                                    <input
                                      type="text"
                                      name="address"
                                      id="address"
                                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ps-2 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                      {...register('address', {
                                        required: 'Address is required',
                                      })}
                                    />
                                    {errors.address && (
                                      <p className="text-red-500">
                                        {errors.address.message}
                                      </p>
                                    )}
                                  </div>
                                </div>

                                <div className="sm:col-span-2 sm:col-start-1">
                                  <label
                                    htmlFor="city"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                  >
                                    City
                                  </label>
                                  <div className="mt-2">
                                    <input
                                      type="text"
                                      name="city"
                                      id="city"
                                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ps-2 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                      {...register('city', {
                                        required: 'City is required',
                                      })}
                                    />
                                    {errors.city && (
                                      <p className="text-red-500">
                                        {errors.city.message}
                                      </p>
                                    )}
                                  </div>
                                </div>

                                <div className="sm:col-span-2">
                                  <label
                                    htmlFor="region"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                  >
                                    State / Province
                                  </label>
                                  <div className="mt-2">
                                    <input
                                      type="text"
                                      name="region"
                                      id="region"
                                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ps-2 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                      {...register('state', {
                                        required: 'State is required',
                                      })}
                                    />
                                    {errors.state && (
                                      <p className="text-red-500">
                                        {errors.state.message}
                                      </p>
                                    )}
                                  </div>
                                </div>

                                <div className="sm:col-span-2">
                                  <label
                                    htmlFor="postal-code"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                  >
                                    ZIP / Postal code
                                  </label>
                                  <div className="mt-2">
                                    <input
                                      type="number"
                                      name="postal-code"
                                      id="postal-code"
                                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ps-2 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                      {...register('postal-code', {
                                        required: 'Postal Code is required',
                                      })}
                                    />
                                    {errors['postal-code'] && (
                                      <p className="text-red-500">
                                        {errors['postal-code'].message}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="mt-6 flex items-center justify-end gap-x-6">
                              <button
                                type="button"
                                className="text-sm font-semibold leading-6 text-gray-900 hover:text-gray-700"
                                onClick={() => {
                                  setIsOpen(false);
                                  setIsAddNewAddress(false);
                                  reset();
                                }}
                              >
                                Cancel
                              </button>
                              <button
                                type="submit"
                                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                              >
                                Edit Address
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  )}
                  <div
                    key={address.id}
                    className="flex justify-between gap-x-6 px-5 py-5 border-solid border-2 border-gray-200"
                  >
                    <div className="flex gap-x-4">
                      <div className="min-w-0 flex-auto">
                        <p className="text-sm font-semibold leading-6 text-gray-900">
                          {address.name}
                        </p>
                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                          {address.address}
                        </p>
                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                          {address['postal-code']}
                        </p>
                      </div>
                    </div>
                    <div className="hidden sm:flex sm:flex-col sm:items-end">
                      <p className="text-sm leading-6 text-gray-900">
                        Phone: {address['phone-number']}
                      </p>
                      <p className="text-sm leading-6 text-gray-500">
                        {address.city}
                      </p>
                    </div>
                    <div className="hidden sm:flex sm:flex-row sm:items-end">
                      <button
                        className=" text-blue-500 px-4"
                        onClick={() => handleEditAddress(index, address)}
                      >
                        Edit
                      </button>
                      <button
                        className="text-red-500 px-4"
                        onClick={() => handleRemoveAddress(index)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
