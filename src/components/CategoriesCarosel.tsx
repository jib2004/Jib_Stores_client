import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import CategoriesCard from "./CategoriesCard";
import { Link } from "react-router";


const CategoriesCarosel = () => {
  return (
    <div className="w-[90%] mx-auto flex flex-col gap-9 my-8 border-y-[2px] py-6">

        <div className="flex flex-col gap-2">
            <div className="flex items-center gap-4">
                <div className="w-[20px] h-[40px] bg-[#DB4444] rounded"></div> 
                <h5 className="font-semibold text-[#DB4444]">Categories</h5>
            </div>

            <div>
                <h2 className="text-[36px] font-semibold">Browse By Category</h2>
            </div>            
        </div>

        <div >
    <Splide className=''  
    options={{ 
        perMove    : 3,
        gap        : '10px',
        pagination : false,
        drag  : true, // Enable dragging
        autoplay   : false,
        
        trimSpace:'true',
        margin:'0',
        breakpoints:{
            640: {
                perPage: 2,
                paddingHorizontal:'20px',
            },
            768: {
                perPage:4,
                paddingHorizontal:'60px',
            },
            1024: {
                perPage:4,
                paddingHorizontal:'60px',
            },
            1280: {
                perPage:5,
                paddingHorizontal:'60px',
            },
            1536: {
                perPage:7,
                paddingHorizontal:'60px',
            }
        }
        }}>
    <SplideSlide>
    <Link to={`/search/phones`}> <CategoriesCard title="Phones" imgSrc={'https://img.icons8.com/glyph-neue/56/iphone14-pro.png'}/></Link>
    </SplideSlide>
    <SplideSlide>
        <Link to={`/search/fashion`}><CategoriesCard title="Fashion" imgSrc={'https://img.icons8.com/ios-filled/56/little-black-dress.png'}/></Link>
    </SplideSlide>
    <SplideSlide>
        <Link to={`/search/computing`}><CategoriesCard title="Computing" imgSrc={'https://img.icons8.com/ios-filled/56/studio-display.png'}/></Link>
    </SplideSlide>
    <SplideSlide>
        <Link to={`/search/gaming`}><CategoriesCard title="Gaming" imgSrc={'https://img.icons8.com/pastel-glyph/56/controller.png'}/></Link>
    </SplideSlide>
    <SplideSlide>
        <Link to={`/search/electronics`}><CategoriesCard title="Electronics" imgSrc={'https://img.icons8.com/external-jumpicon-glyph-ayub-irawan/56/external-electronic-marketing-jumpicon-glyph-jumpicon-glyph-ayub-irawan.png'}/></Link>
    </SplideSlide>
    <SplideSlide>
        <Link to={`/search/home_lifestyle`}><CategoriesCard title="Home & Lifestyle" imgSrc={'https://img.icons8.com/ios-filled/250/home.png'}/></Link>
    </SplideSlide>
    <SplideSlide>
        <Link to={`/search/babies_toys`}><CategoriesCard title="Baby's & Toys" imgSrc={'https://img.icons8.com/ios-filled/56/babys-room.png'}/></Link>
    </SplideSlide>
    <SplideSlide>
        <Link to={`/search/sport_outdoor`}><CategoriesCard title="Sport & Outdoor" imgSrc={'https://img.icons8.com/sf-black/56/weightlift.png'}/></Link>
    </SplideSlide>
    <SplideSlide>
        <Link to={`/search/health_beauty`}><CategoriesCard title="Health & Beauty" imgSrc={'https://img.icons8.com/ios-filled/56/doctors-bag.png'}/></Link>
    </SplideSlide>
    <SplideSlide>
        <Link to={`/search/automobile`}><CategoriesCard title="Automobile" imgSrc={'https://img.icons8.com/ios-filled/56/sedan.png'}/></Link>
    </SplideSlide>
    <SplideSlide>
        <Link to={`/search/pets`}><CategoriesCard title="Pets" imgSrc={'https://img.icons8.com/ios-filled/56/pets--v1.png'}/></Link>
    </SplideSlide>
    <SplideSlide>
        <Link to={`/search/groceries`}><CategoriesCard title="Groceries" imgSrc={'https://img.icons8.com/ios-filled/56/fast-moving-consumer-goods.png'}/></Link>
    </SplideSlide>
</Splide>
</div>
</div>
  )
}

export default CategoriesCarosel