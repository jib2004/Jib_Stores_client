import { ChangeEvent, FormEvent, useMemo, useState} from 'react'
import { useParams } from 'react-router'
import { userDetails } from '../../types'
import { useAppDispatch } from '../../hooks/hooks'
import { getUserDetails } from '../../api/userSlice/userSlice'
import { useProfileUpdateMutation, useGetUserInformationQuery } from '../../api/users/auth'
import { toast } from 'sonner'

const PersonalInfo = () => {
    const dispatch = useAppDispatch()
    const [userInfo,setUserInfo] = useState<userDetails>({})
    const [userChanges,setUserChanges] = useState<Record<string, string | File>>({})
    const [loading, setLoading] = useState<boolean>(false)
    const [profileUpdate] = useProfileUpdateMutation()
    const params = useParams()
    
    const {data} = useGetUserInformationQuery(params.id,{
        skip:!params.id,
        refetchOnReconnect: true,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true,
    })

    const handleChange = (e:ChangeEvent<HTMLInputElement>) =>{
        setUserChanges(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
        setUserChanges(prev => ({
            ...prev,
            files: file  // ✅ store the actual file object
        }))
    }
}

    const handleProfileUpdate = async(e:FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        setLoading(true)
    const formData = new FormData()
    Object.entries(userChanges).forEach(([key, value]) => {
        formData.append(key, value)
    })

        try {
            const res = await profileUpdate({
                id:params.id,
                body:formData
            }).unwrap()
            dispatch(getUserDetails(res.data))
            setUserInfo(res.data)
            toast.success("Profile Successfully Updated!")
        } catch (error) {
            console.log(error)
        }finally{
            setLoading(false)
            setUserChanges({})
        }
    }


    useMemo(()=>{
        if(data?.data){
            setUserInfo(data.data)
        }
    },[data])

return (
    <section className='w-full flex flex-col'>
        <figure className='flex flex-col'>
            <div className='h-[128px] relative bg-[#549FBA] px-5 rounded-t-xl'>
                <div className='border-[7px] border-white absolute -bottom-12 rounded-full w-fit h-fit '>
                <input type="file"
                className='absolute w-full aspect-square opacity-0 cursor-pointer'
                onChange={handleFileChange}
                name="files" 
                id="files"
                />
                <img 
                className='w-[104px] aspect-square object-cover rounded-full  '
                src={userInfo?.profilePicture?.length > 0 ? `https://res.cloudinary.com/${import.meta.env.VITE_CLOUDINARY_KEY}/image/upload/${userInfo.profilePicture[0]}` : `https://res.cloudinary.com/${import.meta.env.VITE_CLOUDINARY_KEY}/image/upload/profile_n40jzx`}
                // src={`https://res.cloudinary.com/${import.meta.env.VITE_CLOUDINARY_KEY}/image/upload/samples/smile`} 
                alt="profile_pic" />
                </div>
            </div>

            <div className='h-[128px] bg-white flex flex-col justify-end px-5 pb-3 border-b-2'>
                <h3 className='text-[#181C1E] text-2xl leading-8'>{userInfo.name}</h3>
                <span className='leading-6 text-[#3F484C]'>{`Standard Member since ${userInfo.created_at?.slice(0,4)}`}</span>
            </div>
        </figure>

        <form onSubmit={handleProfileUpdate} className='bg-white p-5 flex flex-col gap-5'>
            <div className='flex items-center gap-4'>
                <div className='basis-1/2 flex flex-col gap-4'>
                    <label
                    className='text-[14px] leading-5 tracking-[0.7px] text-[#3F484C] font-semibold'
                    htmlFor="name">FULL NAME</label>
                    <input
                    onChange={handleChange}
                    className='bg-[#F1F4F6] text-[#6B7280] placeholder:text-[#6B7280] rounded-lg' 
                    type="text"
                    name='name'
                    id='name'  
                    placeholder={userInfo.name}
                    />
                </div>

                <div className='basis-1/2 flex flex-col gap-4'>
                    <label
                    className='text-[14px] leading-5 tracking-[0.7px] text-[#3F484C] font-semibold'
                    htmlFor="email">EMAIL</label>
                    <input
                    onChange={handleChange}
                    className='bg-[#F1F4F6] text-[#6B7280] placeholder:text-[#6B7280] rounded-lg' 
                    type="text"
                    name='email'
                    id='email'  
                    placeholder={userInfo.email}
                    />
                </div>
            </div>

            <div className='flex flex-col gap-4'>
                    <label
                    className='text-[14px] leading-5 tracking-[0.7px] text-[#3F484C] font-semibold'
                    htmlFor="phoneNumber">PHONE NUMBER</label>
                    <input
                    onChange={handleChange}
                    className='bg-[#F1F4F6] text-[#6B7280] placeholder:text-[#6B7280] rounded-lg' 
                    type="text"
                    name='phoneNumber'
                    id='phoneNumber'  
                    placeholder={userInfo.phoneNumber}
                    />
                </div>

                <div className='flex flex-col gap-4'>
                    <label
                    className='text-[14px] leading-5 tracking-[0.7px] text-[#3F484C] font-semibold'
                    htmlFor="address">ADDRESS</label>
                    <input
                    onChange={handleChange}
                    className='bg-[#F1F4F6] text-[#6B7280] placeholder:text-[#6B7280] rounded-lg' 
                    type="text"
                    name='address'
                    id='address'  
                    placeholder={userInfo.address}
                    />
                </div>

                <div className='flex justify-end'>
                    <button disabled={loading} className='bg-[#036780] text-[14px] font-semibold text-white p-5 w-fit'>{loading ? "Loading..." : "Save Changes"}</button>
                </div>
        </form>
    </section>
  )
}

export default PersonalInfo