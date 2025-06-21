
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import phone from '../assets/img/bagus-hernawan-A6JxK37IlPo-unsplash.jpg'
import video1 from '../assets/video/coming_soon_with_animation (3).mp4'


const Carousel = () => {
  return (
    
    <Splide className='   h-[300px] w-full md:h-[344px] xl:w-[950px]'  
    options={{ 
        type: 'loop',
        lazyLoad:'sequential', 
        perPage: 1,
        perMove    : 1,
        autoplay: true,
        interval: 5000, 

        
        }}>
    <SplideSlide>
        <div className= " h-[300px] w-full md:h-[344px] xl:w-[950px] border ">
        <video  src={video1} loop autoPlay className="w-full h-full object-fill "></video>
        </div>
    </SplideSlide>
    <SplideSlide>
        <img src={phone} className= " h-[300px] w-full md:h-[344px] xl:w-[950px] object-cover" alt="Slide 2" />
    </SplideSlide>
    <SplideSlide>
        <img src={phone} className= " h-[300px] w-full md:h-[344px] xl:w-[950px] object-cover" alt="Slide 3" />
    </SplideSlide>
    <SplideSlide>
        <img src={phone} className= " h-[300px] w-full md:h-[344px] xl:w-[950px] object-cover" alt="Slide 4" />
    </SplideSlide>
</Splide>
  )
}

export default Carousel