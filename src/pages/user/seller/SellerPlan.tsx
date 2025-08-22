import App from '../../../App'
import Plans from '../../../components/Plans'
import { useNavigate } from 'react-router'
import { useAppSelector, useAppDispatch } from '../../../hooks/hooks'
import { getUserDetails } from '../../../api/userSlice/userSlice'
import { useUserDetailsUpdateMutation,useUserCreatePlanMutation } from '../../../api/users/auth'
import { useState,useEffect } from 'react'
import Loading from '../../../components/Loading'
import { userDetails } from '../../../types'


const SellerPlan = () => {
    const navigate =  useNavigate()
    const dispatch = useAppDispatch()
    const [update] = useUserDetailsUpdateMutation()
    const user = useAppSelector(state=> state.user)
    const [createPlan] = useUserCreatePlanMutation()
    const [loading, setLoading] = useState(true)
    const [planLoading, setPlanLoading] = useState<boolean>(false)


    
    const getStarted = async() =>{
        try {
            const res = await update({id:user._id,body:{plan: 'free',isSeller:true} as userDetails}).unwrap()
            dispatch(getUserDetails(res.data))
            navigate('/dashboard')
            setTimeout(() => {
                setPlanLoading(false)
            }, 5000);
        } catch (error) {
            console.log(error)
        }
        
        
    }

    const subscribe = async (amt:number) =>{
    //    const title = e.target.parentElement.previousSibling.previousSibling.firstElementChild.textContent.toLowerCase()
       const price:number = amt 
       let plan:string|undefined = undefined 
        setPlanLoading(true)
       
       if(price == 20000){
         plan = 'PLN_2xyrlaaadpwby81'
        
       }else{
          plan='PLN_zcganehur477wt4'
       }

       try {
            const response = await createPlan({
            email:user.email,
            plan:plan,
            amount:price
            }).unwrap()
            dispatch(getUserDetails(response.user))
            if(response.data.status){
                window.open(response.data.data.authorization_url,"_blank")
                navigate('/subscription-confirmation')
            }
            setTimeout(() => {
                setPlanLoading(false)
            }, 5000);
           
       } catch (error) {
            console.log(error)
       }

    }

     useEffect(()=>{
        setTimeout(()=>{
          setLoading(false)
        },import.meta.env.VITE_LOADING_TIMER )
      },[])
  return (
    <div className='bg-[#fafbfd]  min-h-screen'>
        <Loading loading={loading}/>
        <App>

         <h1 className='text-center font-semibold text-[50px] mb-5'>Choose your plan</h1>

        <div className='flex items-center h-[80%] justify-center gap-8'>
            <Plans 
            title='Free' 
            price={0} 
            btnText={planLoading ? "Please Wait...":'Get Started'}
            planFunc={getStarted}
            isloading={planLoading}
            offer={[
            'Limited product listings (up to 5 products)',
            'Basic analytics (views and clicks)',
            'Standard customer support (email only)',
            'Access to community forums'
            ]}/>
            
            <Plans 
            title={planLoading ? "Please Wait...":'Basic'}
            price={10000}
            btnText='Buy Now' 
            planFunc={() => subscribe(10000)}
            isloading={planLoading}
            offer={[
                'Increased product listings (up to 20 products)',
                'Enhanced analytics (sales tracking, customer demographics)',
                'Promotional tools (discount codes, featured listings)',
                'Standard customer support (email and chat)',
                'Basic marketing resources (templates, guides)'
            ]}/>

            <Plans 
            title={planLoading ? "Please Wait..." : 'Standard'} 
            price={20000}
            btnText='Buy Now'
            planFunc={() => subscribe(20000)} 
            isloading={planLoading}
            offer={[
                'Unlimited product listings',
                'Advanced analytics (detailed reports, customer behavior insights)',
                'Priority promotional tools (seasonal campaigns, social media integration)',
                'Priority customer support (24/7 chat and phone)',
                'Access to exclusive webinars and training sessions'
            ]}/>
            </div>
            
        
        </App>
        </div>
  )
}

export default SellerPlan