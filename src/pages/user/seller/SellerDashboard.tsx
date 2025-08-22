import SellerMain from './SellerMain'
import { useAppSelector } from '../../../hooks/hooks'
import { useNavigate } from 'react-router'
import { useEffect, useState } from 'react'
import Loading from '../../../components/Loading'
import { useGetUserInformationQuery } from '../../../api/users/auth'
import { useGetProductsQuery, useGetAllSellerOrdersQuery } from '../../../api/users/seller'
import OrdersList from '../../../components/OrderList'



const SellerDashboard = () => {
  const user = useAppSelector(state => state.user)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const { data: userInfo } = useGetUserInformationQuery(user?._id || "")
  const { data: products } = useGetProductsQuery(user?._id || "")
  const { data: orders } = useGetAllSellerOrdersQuery(user?._id || "")


  const formattedBalance = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(userInfo?.data.wallet.balance || 0);
// console.log(orders)
  useEffect(() => {
    if (user.plan === "") {
      navigate("/plans")
    }
    setTimeout(() => {
      setLoading(false)
    }, import.meta.env.VITE_LOADING_TIMER)
  }, [])

  return (
    <div>
      <Loading loading={loading} />
      <SellerMain>
        <div className="flex flex-wrap gap-8 mb-8">
          {/* Wallet Section */}
          <div className="flex-1 min-w-[250px] bg-slate-50 rounded-xl p-6 shadow-md">
            <h2 className="font-semibold text-lg">Wallet Balance</h2>
            <div className="text-3xl font-bold my-4">{formattedBalance}</div>
            <button className="bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-700 transition">Withdraw</button>
          </div>
          {/* Analytics Section */}
          <div className="flex-2 min-w-[300px] bg-slate-50 rounded-xl p-6 shadow-md">
            <h2 className="font-semibold text-lg">Analytics</h2>
            <div className="mt-4 text-slate-500">
              <div>Total Sales: ₦0.00</div>
              <div>Orders: {orders?.data.length || 0}</div>
              <div>Products: {products?.data.length || 0}</div>
            </div>
          </div>
        </div>
        {/* Orders Section */}
        <div className="bg-slate-50 rounded-xl p-6 shadow-md">
          <h2 className="font-semibold text-lg mb-4">Recent Orders</h2>
          <OrdersList orders={orders?.data || []} sellerId={user._id} />
        </div>
      </SellerMain>
    </div>
  )
}

export default SellerDashboard