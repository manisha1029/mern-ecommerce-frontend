import { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './App.css';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import CartPage from './pages/CartPage';
import Checkout from './pages/Checkout';
import ProductDetailPage from './pages/ProductDetailPage';
import Protected from './features/auth/components/Protected';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItemsByUserIdAsync } from './features/cart/cartSlice';
import { selectLoggedInUser } from './features/auth/authSlice';
import PageNotFound from './pages/PageNotFound';
import OrderSuccesPage from './pages/OrderSuccesPage';
import UserOrdersPage from './pages/UserOrdersPage';
import UserProfilePage from './pages/UserProfilePage';
import { fetchLoggedInUserAsync } from './features/user/userSlice';
import LogOut from './features/auth/components/LogOut';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import AdminProductListPage from './pages/AdminProductListPage';
import AdminProductDetailPage from './pages/AdminProductDetailPage';
import ProtectedAdmin from './features/auth/components/ProtectedAdmin';
import AdminProductFormPage from './pages/AdminProductFormPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: (  
      <Protected>
        <Home />
      </Protected>
    ),
  },
  {
    path: '/login',
    element: <LoginPage></LoginPage>,
  },
  {
    path: '/signup',
    element: <SignupPage></SignupPage>,
  },
  {
    path: '/cart',
    element: (
      <Protected>
        <CartPage />
      </Protected>
    ),
  },
  {
    path: '/checkout',
    element: (
      <Protected>
        <Checkout />
      </Protected>
    ),
  },
  {
    path: '/product-detail/:id',
    element: (
      <Protected>
        <ProductDetailPage />
      </Protected>
    ),
  },
  {
    path: '/admin/products',
    element: <ProtectedAdmin>
      <AdminProductListPage />
    </ProtectedAdmin>,
  },
  {
    path: '/admin/products/:id',
    element: <ProtectedAdmin>
      <AdminProductDetailPage />
    </ProtectedAdmin>,
  },
  {
    path: '/admin/products/new',
    element: <ProtectedAdmin>
      <AdminProductFormPage />
    </ProtectedAdmin>,
  },
  {
    path: '/order-success/:id',
    element: <OrderSuccesPage />,
  },
  {
    path: '/orders',
    element: <UserOrdersPage />,
  },
  {
    path: '/profile',
    element: <UserProfilePage />,
  },
  {
    path: '/logout',
    element: <LogOut />,
  },
  {
    path: '/forgot-password',
    element: <ForgotPasswordPage />,
  },
  {
    path: '*',
    element: <PageNotFound />,
  },
]);

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  useEffect(() => {
    if (user) {
      dispatch(fetchItemsByUserIdAsync(user.id));
      dispatch(fetchLoggedInUserAsync(user.id));
    }
  }, [dispatch, user]);
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
