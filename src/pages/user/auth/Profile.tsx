// import React from 'reactnamennnnnnjkljbndscvjbcdsjkcdsjldscjbcsd jkscdjkdcsjkdscnmkmk sdcjncsdjk sdjkn'

import App from '../../../App'
import ProfileLayout from '../../../layouts/ProfileLayout'
import PersonalInfo from '../../../components/profile/PersonalInfo'
import { Toaster } from 'sonner'
import PasswordAndSecurity from '../../../components/profile/PasswordAndSecurity'

const Profile = () => { 
  return (
    <App>
      <ProfileLayout>
      <PersonalInfo />
      <PasswordAndSecurity/>
      </ProfileLayout>

      <Toaster position='top-right'/>
      </App>
  )
}

export default Profile