type CategoriesCardProp={
  title:string,
  imgSrc:string
}


const CategoriesCard = ({title,imgSrc}:CategoriesCardProp) => {
  return (
    <div className='w-[170px] h-[145px] rounded border border-[rgba(0,0,0,0.3)] flex flex-col justify-center items-center gap-4 hover:bg-[#DB4444] hover:text-white cursor-pointer duration-200'>
        <figure>
          <img src={imgSrc} alt={` ${title} icon`}  className='size-[56px] object-contain'/>
        </figure>
        <div>
          <p className='font-light'>{title}</p>
        </div>
    </div>
  )
}

export default CategoriesCard