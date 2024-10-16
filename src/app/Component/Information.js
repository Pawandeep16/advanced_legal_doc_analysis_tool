"use client";
import Image from 'next/image';
import React, { useEffect } from 'react'
import { motion, useAnimation, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer'
import { useRef } from 'react';

const Information = ({ direction, image, heading,description }) => {
    const isRight = direction === 'right';

    const ref = useRef(null);

    // Image Animation using Framer Motion 
    const { scrollYProgress } = useScroll({ target: ref });
    const scale = useTransform(scrollYProgress, [0, 1], [0.5, 1]);
    const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
    const x = useTransform(scrollYProgress, [0, 1], isRight?[' -100vw', '0vw']:[' 100vw', '0vw'] ); 

// Slide in Text for the Description motion 


const controls = useAnimation();
  const [inViewRef, inView] = useInView({ triggerOnce: true });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);


  
    return (
   <div className='bg-black '>

<div className='flex flex-col  justify-center items-center  bg-black text-white  max-w-[80%] mx-auto space-y-30 overflow-hidden  '>
        <div className={`flex ${isRight ? 'flex-row-reverse ' : ''}  py-5 px-10   `}>
        <motion.div
        style={{ scale, opacity }}

        className= {`flex-1 flex px-[50px]  ${isRight? 'justify-start  ' : ' justify-end ' }` }>
          <Image src={image} alt="Description Image" height={400} width={400} className=' object-contain '    />
        </motion.div>

        <motion.div
          ref={(node) => {
            ref.current = node;
            inViewRef(node);
          }}
          initial="hidden"
          animate={controls}
          style={{ x, opacity }}
          variants={{
            hidden: { x: isRight?' 100vw':'-100vw', opacity: 0 },
            visible: { x: 0, opacity: 1, transition: { duration: 1 } },
          }}
       
        className= {`flex-1 flex flex-col text-3xl p-4 tracking-widest    ${isRight? 'justify-start   ' : '  ' }` }>
          <h1 className='text-2xl font-bold text-start py-5 '>{heading}</h1>
          <p className='text-xl'>{description}</p>
        </motion.div>
      </div>

      </div> 
     {/* <div className='h-1 w-full bg-white/60 '></div> */}

   </div>
    );
  };
  

export default Information





