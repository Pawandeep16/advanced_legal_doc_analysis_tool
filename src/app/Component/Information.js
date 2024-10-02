import React from 'react'

const Information = ({ direction, image, description }) => {
    const isRight = direction === 'right';
  
    return (
      <div className='flex flex-col  bg-red-500  '>
        <div className={`flex ${isRight ? 'flex-row-reverse justify-end bg-blue-400' : 'flex-row'} items-center   `}>
        <div className= {`flex-1 p-4  ${isRight? ' bg-slate-400  ' : 'right-0' }` }>
          <img src={image} alt="Description Image" className="w-56 h-56" />
        </div>
        <div className="flex-1 p-4 bg-pink-400 text-center">
          <p>{description}</p>
        </div>
      </div>
      </div>
    );
  };
  

export default Information





