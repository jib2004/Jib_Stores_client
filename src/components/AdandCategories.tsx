import { Link } from 'react-router'
import Carousel from './Carousel'

const AdandCategories = () => {
  return (
    <section className='flex  flex-col-reverse md:flex-row md:w-[90%] md:mx-auto   md:gap-10 md:overflow-y-hidden'>
        <div className='hidden md:block md:border-e-[3px]  w-[344px] pt-9 md:px-2 '>
            <ul className='flex flex-col gap-4 items-end w-full h-full'>
                <li className='  px-4 w-[80%]'>
                    <Link to={"/"}>Women's Fashion</Link>
                </li>
                <li className='  px-4 w-[80%]'>
                    <Link to={"/"}>Men's Fashion</Link>
                </li>
                <li className='  px-4 w-[80%]'>
                    <Link to={"/"}>Electronics</Link>
                </li>
                <li className='  px-4 w-[80%]'>
                    <Link to={"/"}>Home & Lifestyle</Link>
                </li>
                <li className='  px-4 w-[80%]'>
                    <Link to={"/"}>Medicine</Link>
                </li>
                <li className='  px-4 w-[80%]'>
                    <Link to={"/"}>Sport & Outdoor</Link>
                </li>
                <li className='  px-4 w-[80%]'>
                    <Link to={"/"}>Baby's & Toys</Link>
                </li>
                <li className='  px-4 w-[80%]'>
                    <Link to={"/"}>Groceries</Link>
                </li>
                <li className='  px-4 w-[80%]'>
                    <Link to={"/"}>Health & Beauty</Link>
                </li>
            </ul>
        </div>

        <div className='w-fit h-fit md:pt-9'>
            <Carousel/>
        </div>
    </section>
  )
}

export default AdandCategories