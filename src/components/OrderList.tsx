import { useEffect, useState } from 'react'
import { useUpdateOrderStatusMutation } from '../api/users/seller'

const ORDER_STATUS_OPTIONS = [
  'processing',
  'in-transit',
  'delivered',
  'canceled'
]

const OrdersList = ({ orders, sellerId }) => {
  const [updateOrderStatus, { isLoading: updating }] = useUpdateOrderStatusMutation()
  // Use a Set to store unique product status strings like "productId:status"
  const [statusSet, setStatusSet] = useState([])

  
  console.log(statusSet)
  // Flatten all productDetails from all orders into a single array and filter by sellerId
  const allProductDetails = orders?.flatMap((order) =>
    (order.productDetails || [])
      .filter((product) => product.sellerId === sellerId)
      .map((product) => ({
        ...product,
        orderNumber: order.orderNumber,
        orderStatus: product.orderStatus || order.orderStatus,
        orderId: order._id,
        productId: product.id,
        dateOrdered: order.dateOrdered,
        address: order.address
      }))
  ) || []



  console.log(allProductDetails)

  // Initialize statusSet with current statuses
  useEffect(() => {
if (allProductDetails.length > 0) {
    const initialStatuses = allProductDetails.map((product) => ({
      productId: product.orderNumber,
      orderStatus: product.orderStatus
    }));
    setStatusSet(initialStatuses);
  }
  }, [orders, sellerId])

  const handleStatusChange = async (sellerId: string, orderId: string, newStatus: string) => {
    // Update the statusSet state
    setStatusSet((prev) => {
        const existingIndex = prev.findIndex(item => item.productId === orderId);
        if (existingIndex !== -1) {
            const updated = [...prev];
            updated[existingIndex].orderStatus = newStatus;
            return updated;
        } else {
         return [...prev, { productId: orderId, orderStatus: newStatus }];
        }})
    

    
    try {
      await updateOrderStatus({ orderNumber:orderId, sellerId, body:{orderStatus: newStatus} }).unwrap()
    } catch (error) {
      console.log(error)
    }
  }

  if (allProductDetails.length === 0) {
    return <div className="text-slate-500">No orders yet.</div>
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-left text-sm">
        <thead>
          <tr>
            <th className="py-2 px-4 font-semibold">Order No</th>
            <th className="py-2 px-4 font-semibold">Product</th>
            <th className="py-2 px-4 font-semibold">Quantity</th>
            <th className="py-2 px-4 font-semibold">Price</th>
            <th className="py-2 px-4 font-semibold">Status</th>
            <th className="py-2 px-4 font-semibold">Date</th>
            <th className="py-2 px-4 font-semibold">Address</th>

          </tr>
        </thead>
        <tbody className='py-10'>
          {allProductDetails.map((product, idx: number) => (
            <tr key={product.productId + idx} className="border-t">

              <td className="py-2 px-4">{product.orderNumber} </td>
              <td className="py-2 px-4 flex items-center gap-2">
                <img
                  src={`https://your-image-domain.com/${product.productImg}`}
                  alt={product.productName}
                  className="w-10 h-10 object-cover rounded"
                  onError={e => (e.currentTarget.style.display = 'none')}
                />
                <span>{product.productName} </span>
              </td>
              <td className="py-2 px-4">{product.quantity}</td>
              <td className="py-2 px-4">₦{product.price?.toLocaleString() || '0.00'}</td>
              <td className="py-2 px-4">
                <select
                  className="border rounded px-2 py-1"
                  value={statusSet.find(status => status.productId === product.orderNumber)?.orderStatus || product.orderStatus}
                  onChange={e => handleStatusChange(product.sellerId, product.orderNumber, e.target.value)}
                  disabled={updating}
                >
                  {ORDER_STATUS_OPTIONS.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </td>
              <td className="py-2 px-4">{new Date(product.dateOrdered).toLocaleDateString()}</td>
                <td className="py-2 px-4">{product.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default OrdersList