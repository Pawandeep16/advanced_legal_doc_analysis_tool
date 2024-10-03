import Image from 'next/image';
import React from 'react'

const Information = ({ direction, image, heading,description }) => {
    const isRight = direction === 'right';
  
    return (
   <div className='bg-black '>

<div className='flex flex-col  justify-center items-center  bg-black text-white  max-w-[80%] mx-auto space-y-30  '>
        <div className={`flex ${isRight ? 'flex-row-reverse ' : ''}  py-5 px-10   `}>
        <div className= {`flex-1 flex px-[50px]  ${isRight? 'justify-start  ' : ' justify-end ' }` }>
          <Image src={image} alt="Description Image" height={400} width={400} className=' object-contain '    />
        </div>
        <div className= {`flex-1 flex flex-col text-3xl p-4 tracking-widest    ${isRight? 'justify-start   ' : '  ' }` }>
          <h1 className='text-2xl font-bold text-start py-5 '>{heading}</h1>
          <p className='text-xl'>{description}</p>
        </div>
      </div>

      </div> 
     {/* <div className='h-1 w-full bg-white/60 '></div> */}

   </div>
    );
  };
  

export default Information





