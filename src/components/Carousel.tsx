import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import phone from '../assets/img/bagus-hernawan-A6JxK37IlPo-unsplash.jpg'
import video1 from '../assets/video/coming_soon_with_animation (3).mp4'

const Carousel = () => {
  const slides = [
    {
      type: 'video',
      src: video1,
      title: 'Coming Soon',
      subtitle: 'Exciting new features arriving',
      cta: 'Learn More'
    },
    {
      type: 'image',
      src: phone,
      title: 'Premium Electronics',
      subtitle: 'Discover the latest smartphones and gadgets',
      cta: 'Shop Now'
    },
    {
      type: 'image',
      src: phone,
      title: 'Special Offers',
      subtitle: 'Up to 50% off on selected items',
      cta: 'View Deals'
    },
    {
      type: 'image',
      src: phone,
      title: 'Free Shipping',
      subtitle: 'On orders over ₦50,000',
      cta: 'Start Shopping'
    }
  ]

  return (
    <div className="relative overflow-hidden rounded-2xl">
      <Splide 
        className="h-full sm:h-[320px] md:h-[400px] lg:h-[450px] w-full"
        options={{ 
          type: 'loop',
          lazyLoad: 'sequential', 
          perPage: 1,
          perMove: 1,
          autoplay: true,
          interval: 5000,
          arrows: true,
          pagination: true,
          gap: 0,
          cover: true,
          heightRatio: 0.5,
        }}
      >
        {slides.map((slide, index) => (
          <SplideSlide key={index}>
            <div className="relative h-full w-full group">
              {/* Background Media */}
              {slide.type === 'video' ? (
                <video 
                  src={slide.src} 
                  loop 
                  autoPlay 
                  muted
                  className="w-full h-full object-cover"
                />
              ) : (
                <img 
                  src={slide.src} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  alt={slide.title} 
                />
              )}
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"></div>
              
              {/* Content */}
              <div className="absolute inset-0 flex items-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                  <div className="max-w-lg text-white">
                    <h2 className="heading-1 text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 animate-slide-up">
                      {slide.title}
                    </h2>
                    <p className="body-large text-lg sm:text-xl mb-6 text-white/90 animate-slide-up" style={{animationDelay: '0.2s'}}>
                      {slide.subtitle}
                    </p>
                    <button className="btn-primary text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 animate-slide-up hover:scale-105 transition-transform duration-200" style={{animationDelay: '0.4s'}}>
                      {slide.cta}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </SplideSlide>
        ))}
      </Splide>
      
      {/* Custom Splide Styles */}
      <style>{`
        .splide__pagination {
          bottom: 1rem;
        }
        
        .splide__pagination__page {
          background: rgba(255, 255, 255, 0.5);
          width: 12px;
          height: 12px;
          margin: 0 4px;
          border-radius: 50%;
          transition: all 0.3s ease;
        }
        
        .splide__pagination__page.is-active {
          background: white;
          transform: scale(1.2);
        }
        
        .splide__arrow {
          background: rgba(255, 255, 255, 0.9);
          border: none;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          opacity: 0;
          transition: all 0.3s ease;
        }
        
        .splide:hover .splide__arrow {
          opacity: 1;
        }
        
        .splide__arrow:hover {
          background: white;
          transform: scale(1.1);
        }
        
        .splide__arrow svg {
          fill: #1f2937;
        }
      `}</style>
    </div>
  )
}

export default Carousel