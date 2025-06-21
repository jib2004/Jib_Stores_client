import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import CategoriesCard from "./CategoriesCard";

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
    <CategoriesCard title="Phones" imgSrc={'https://img.icons8.com/glyph-neue/56/iphone14-pro.png'}/>
    </SplideSlide>
    <SplideSlide>
        <CategoriesCard title="Fashion" imgSrc={'https://img.icons8.com/ios-filled/56/little-black-dress.png'}/>
    </SplideSlide>
    <SplideSlide>
        <CategoriesCard title="Computing" imgSrc={'https://img.icons8.com/ios-filled/56/studio-display.png'}/>
    </SplideSlide>
    <SplideSlide>
        <CategoriesCard title="Gaming" imgSrc={'https://img.icons8.com/pastel-glyph/56/controller.png'}/>
    </SplideSlide>
    <SplideSlide>
        <CategoriesCard title="Electronics" imgSrc={'https://img.icons8.com/external-jumpicon-glyph-ayub-irawan/56/external-electronic-marketing-jumpicon-glyph-jumpicon-glyph-ayub-irawan.png'}/>
    </SplideSlide>
    <SplideSlide>
        <CategoriesCard title="Home & Lifestyle" imgSrc={'https://img.icons8.com/ios-filled/250/home.png'}/>
    </SplideSlide>
    <SplideSlide>
        <CategoriesCard title="Baby's & Toys" imgSrc={'https://img.icons8.com/ios-filled/56/babys-room.png'}/>
    </SplideSlide>
    <SplideSlide>
        <CategoriesCard title="Sport & Outdoor" imgSrc={'https://img.icons8.com/sf-black/56/weightlift.png'}/>
    </SplideSlide>
    <SplideSlide>
        <CategoriesCard title="Health & Beauty" imgSrc={'https://img.icons8.com/ios-filled/56/doctors-bag.png'}/>
    </SplideSlide>
    <SplideSlide>
        <CategoriesCard title="Automobile" imgSrc={'https://img.icons8.com/ios-filled/56/sedan.png'}/>
    </SplideSlide>
    <SplideSlide>
        <CategoriesCard title="Pets" imgSrc={'https://img.icons8.com/ios-filled/56/pets--v1.png'}/>
    </SplideSlide>
    <SplideSlide>
        <CategoriesCard title="Groceries" imgSrc={'https://img.icons8.com/ios-filled/56/fast-moving-consumer-goods.png'}/>
    </SplideSlide>
</Splide>
</div>
</div>
  )
}

export default CategoriesCarosel