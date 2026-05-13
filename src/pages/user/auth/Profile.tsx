// import React from 'reactnamennnnnnjkljbndscvjbcdsjkcdsjldscjbcsd jkscdjkdcsjkdscnmkmk sdcjncsdjk sdjkn'

import App from '../../../App'
import ProfileLayout from '../../../layouts/ProfileLayout'
import PersonalInfo from '../../../components/profile/PersonalInfo'
import { Toaster } from 'sonner'
import PasswordAndSecurity from '../../../components/profile/PasswordAndSecurity'
import OrderTable from '../../../components/profile/OrderTable'

const Profile = () => { 
  return (
    <App>
      <ProfileLayout>
      <PersonalInfo />
      <PasswordAndSecurity/>
      <OrderTable/>
      </ProfileLayout>

      <Toaster position='top-right'/>
      </App>
  )
}

export default Profile