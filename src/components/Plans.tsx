import check from '../assets/img/Vector.svg'

type planCard ={
    title: string,
    price:number,
    offer:string[],
    planFunc?:()=> any,
    btnText:string
}



const Plans = ({title,price,offer,btnText,planFunc}:planCard) => {

  return (
    <div className='border w-[350px] min-h-[520px] rounded-2xl flex flex-col justify-between px-4 py-3 bg-black text-white shadow-xl'>
        <div className=''>
            <h4 className='text-lg font-bold'>{title}</h4>
            <p className='text-xl'><span className='text-3xl font-semibold'>&#8358;{price}</span>/month</p>
        </div>
        <div>
            <ul>
                {offer?.map((item, index) => (
                    <li key={index} className='flex items-center  gap-2 mb-3'><img alt='Check' src={check}/> <span className=''>{item}</span></li>
                ))}
                
            </ul>
        </div>
        <div className='flex justify-center'>
            <button onClick={planFunc} className='border w-[90%] h-[55px] bg-[#fff] text-[black] font-medium active:bg-[#fff]  hover:bg-[#ece9e9] duration-150'>{btnText}</button>
        </div>
    </div>
  )
}

export default Plans