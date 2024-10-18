
import React from 'react'
function Pricing( { plan, price, features } ) {
  return (


    <div className='flex flex-col  w-[400px] mx-auto  rounded overflow-hidden shadow-md shadow-white bg-white  justify-start ' >
      <div className="text-center px-6 py-4">
      <div className=" flex  flex-col ">
        <div className="font-bold text-2xl mb-2">{plan}</div>
        <p className="text-gray-700 text-base ">
          ${price}/month
        </p>
      </div>
      <div className="px-6 pt-4  font-bold  text-left "  >
        {features.map((feature, index) => (
          <ul key={index} className="block text-gray-600 text-sm mb-2 list-disc">
            <li className='' >{feature}</li>
          </ul>
        ))}
      </div>
      
    </div>
    <div className="px-6 py-4 mt-auto flex  items-center justify-center">
    <button className="bg-[#3d1156] hover:bg-[#5838c2] text-white w-full font-bold py-2 px-4 rounded  ">
      Choose Plan
    </button>
  </div>

    </div>
  )
}

export default Pricing




  



