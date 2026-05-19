import { useState } from "react"
import App from "../../../App"
import MuiOrdersTable from "../../../components/profile/MuiOrdersTable"
import ProfileLayout from "../../../layouts/ProfileLayout"

const OrderHistory = () => {
  const [currentPage,setCurrentPage] = useState<number>(1)

  return (
    <App>
        <ProfileLayout>
          <MuiOrdersTable page={currentPage} limit={10} setPage={setCurrentPage} showPagination={true}/>
        </ProfileLayout>
    </App>
  )
}

export default OrderHistory