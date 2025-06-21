import { FaXmark } from "react-icons/fa6";
import { Link } from 'react-router';
import gsap from 'gsap';

const Topbanner = () => {

     const handleDisplay = () =>{
        gsap.to('.top-banner',{
            y:-150,
            duration: 1,
            ease: "power1.out",
            display:"none"
        })
    }
  
  return (
    <div className='bg-black text-white h-9 flex justify-end pr-20 top-banner'>
        <div className='flex items-center basis-[55%] justify-between'>
            <div>
                <h5 className='text-[0.875rem] font-light'>Sign up and get 10% off to your first order. <Link to={'/register'} className='underline'>Sign Up Now</Link> </h5>
            </div>

            <div>
                <FaXmark className=' cursor-pointer' onClick={handleDisplay}/>
            </div>
        </div>

    </div>
  )
}

export default Topbanner