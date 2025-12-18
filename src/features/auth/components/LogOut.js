import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectLoggedInUser } from '../authSlice';
import { signOutAsync } from '../authSlice';

function LogOut() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectLoggedInUser);
  useEffect(() => {
    dispatch(signOutAsync(user?.id));
    navigate('/login');
  }, [dispatch, navigate, user?.id]);
}

export default LogOut