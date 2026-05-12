import { ChangeEvent, FormEvent,useState } from 'react'
import psIcon from '../../assets/img/passwordandsecurity.svg'
import { toast } from 'sonner'
import { useProfileUpdateMutation } from '../../api/users/auth'
import { useAppSelector } from '../../hooks/hooks'


const PasswordAndSecurity = () => {
    const [userChanges,setUserChanges] = useState<Record<string, string>>({})
    const [loading, setLoading] = useState<boolean>(false)
    const [passwordChange] = useProfileUpdateMutation()

    const user = useAppSelector(state => state.user ) 


    const handleChange = (e:ChangeEvent<HTMLInputElement>) =>{
        setUserChanges(prev =>({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = async(e:FormEvent<HTMLFormElement>) =>{
        e.preventDefault()

        if(!userChanges?.newPassword || !userChanges?.password || !userChanges?.confirmPassword){
            toast.error("Kindly fill all Fields!")
            return
        }

        if(userChanges.newPassword?.length < 8){
            toast.error("Password too short!")
            return
        }

        if(userChanges?.newPassword !== userChanges?.confirmPassword){
            toast.error("Passwords not alike!!")
            return 
        }
        setLoading(true)
        try {
            
            await passwordChange({
                id:user._id,
                body:{
                    password:userChanges.password,
                    newPassword:userChanges.newPassword
                }
            }).unwrap()
            toast.success("Password Changed Successfully!")
        } catch (error) {
            toast.error(error.data.message)
        }finally{
            setLoading(false)
            setUserChanges({})
        }
    }
  return (
    <section className='bg-white'>
        <div className=''>
            <figure className='flex items-center gap-3 px-5  h-[97px] border-b'>
                <img src={psIcon} alt="icon" />
                <figcaption className='text-[#181C1E] text-2xl font-semibold '>
                    Password & Security
                </figcaption>
            </figure>

            <div className='p-5 flex gap-5 flex-col'>
                <h5 className='font-semibold tracking-[0.7px] leading-5 text-[14px] text-[#181C1E]'>CHANGE PASSWORD</h5>
                <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
                    <div className='flex items-center gap-5'>
                        <div className='flex flex-col gap-3 basis-1/2'>
                            <label 
                            className='text-[#3F484C] text-[14px] font-semibold leading-5 tracking-[0.7px]'
                            htmlFor="password">Current Password</label>
                            <input
                            onChange={handleChange}
                            className='bg-[#F1F4F6] !h-auto px-4 py-2 text-[#6B7280]'
                            type="password" 
                            name="password" 
                            id="password" 
                            placeholder='********' />
                        </div>

                        <div className='flex flex-col gap-3 basis-1/2'>
                            <label 
                            className='text-[#3F484C] text-[14px] font-semibold leading-5 tracking-[0.7px]'
                            htmlFor="newPassword">New Password</label>
                            <input
                            onChange={handleChange}
                            className='bg-[#F1F4F6] !h-auto px-4 py-2 text-[#6B7280]'
                            type="password" 
                            name="newPassword" 
                            id="newPassword" 
                            placeholder='********' />
                        </div>

                        <div className='flex flex-col gap-3 basis-1/2'>
                            <label 
                            className='text-[#3F484C] text-[14px] font-semibold leading-5 tracking-[0.7px]'
                            htmlFor="confirmPassword">Confirm Password</label>
                            <input
                            onChange={handleChange}
                            
                            className='bg-[#F1F4F6] !h-auto px-4 py-2 text-[#6B7280]'
                            type="password" 
                            name="confirmPassword" 
                            id="password" 
                            placeholder='********' />
                        </div>
                    </div>

                    <div className='flex justify-end'>
                        <button
                        disabled={loading}
                        type='submit' 
                        className='bg-[#715286] rounded-lg text-white leading-6 w-fit'>
                            {loading ? "Loading..." : "Update Password"}
                        </button>
                    </div>
                </form>
            </div>
            
        </div>
    </section>
  )
}

export default PasswordAndSecurity