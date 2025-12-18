import { Link, Navigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resetCartAsync } from '../features/cart/cartSlice';
import { useEffect } from 'react';
import { resetCurrentOrder } from '../features/order/orderSlice';
import { selectUserInfo } from '../features/user/userSlice';

function OrderSuccesPage() {
  const userId = useSelector(selectUserInfo);
  const params = useParams();
  const orderId = params.id;

  const dispatch = useDispatch();

  useEffect(() => {
    // reset cart after order is placed
    dispatch(resetCartAsync(userId));

    // reset current order
    dispatch(resetCurrentOrder());
  }, [dispatch, userId]);

  if (!userId) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      {!orderId && <Navigate to="/" replace />}
      <main className="grid min-h-full place-items-center bg-gray-900 px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <h2 className="mt-4 text-balance text-5xl font-semibold tracking-tight text-white sm:text-7xl">
            Order placed successfully
          </h2>
          <p className="mt-4 text-balance text-5xl font-semibold tracking-tight text-white sm:text-7xl">
            Order ID: {orderId}
          </p>
          <p className="mt-6 text-pretty text-lg font-medium text-gray-400 sm:text-xl/8">
            We will deliver the items within 3 days
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to="/"
              className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              Go back to home
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
export default OrderSuccesPage;
