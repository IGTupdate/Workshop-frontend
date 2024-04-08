'use client'
import ProfileForm from './__common/ProfileForm'
import ProfileIcon from './__common/ProfileIcon'

type Props = {}

const page = (props: Props) => {
  return (
    <div className=' flex flex-col gap-4 pb-4'>
        <h1 className=' customer-page-title'>My Profile</h1>
        <ProfileIcon/>
        <ProfileForm/>
    </div>
  )
}

export default page