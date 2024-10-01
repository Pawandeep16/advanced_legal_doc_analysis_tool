import React from 'react';
import Header from "../Component/Header";
import image from "../Assets/icons/banner.png";
import Image from 'next/image';
import About from "../Component/About"

function Homepage() {
  return (
    <div className='flex flex-col scroll-smooth'>
      <Header  />
      <div className='relative '>
        <div>
        <Image className=' w-[90%] h-[80%]' src={image} alt="Background Image"   />
        </div>
        <div className='absolute inset-0 flex items-center justify-center'>
          <h1 className='text-white text-center text-9xl font-bold'>Advanced Legal Document Analysis Tool</h1>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-gray-800 via-blue-100/30 to-black opacity-100"></div>
      </div>
      <About/>
    </div>
  );
}

export default Homepage;


// #1f3e57