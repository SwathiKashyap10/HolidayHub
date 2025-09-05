import React from 'react'

const Banner = () => {
  return (
    <div className='grid max-sm:grid-cols-1 max-sm:gap-20 max-sm:px-3 grid-cols-2 gap-2 px-8 py-16'>
      <div className='flex flex-col justify-center items-center text-center'>
        <p className=' bg-blue-200 text-blue-700 px-5 py-2 rounded-full text-xs max-sm:px-5 max-sm:py-1 max-sm:text-xs mb-8'>Trusted by 1,000+ Happy Guests</p>
        <h3 className='text-3xl sm:text-3xl md:text-4xl font-semibold mb-3'>Why Choose Us</h3>
        <p className="text-gray-600 text-md sm:text-md mt-4 max-w-2xl px-13 text-justify">We make booking rooms effortless, reliable, and affordable. With a wide range of options, transparent pricing, and 24/7 support, we ensure your stay is always comfortable and stress-free. From budget-friendly stays to premium experiences, our platform is designed to match every need and preference. Enjoy a smooth booking process, verified listings, secure payments, and dedicated customer care that’s always just a click away.</p>
      </div>
      <div className='grid grid-cols-3 gap-2 p-5'>
        <div className='col-span-2'><img src="https://res.cloudinary.com/demo6uvtg/image/upload/v1756747827/gallery1_led8fi.jpg" alt='3' className='h-full'/></div>
        <div><img src="https://res.cloudinary.com/demo6uvtg/image/upload/v1756748064/gallery5_z6y3fq.jpg" alt='3' className='h-full'/></div>
        <div><img src="https://res.cloudinary.com/demo6uvtg/image/upload/v1756747888/gallery2_iamhhp.jpg" alt='3' className='w-full'/></div>
        <div><img src="https://res.cloudinary.com/demo6uvtg/image/upload/v1756747919/gallery3_yxpaas.jpg" alt='3' className='w-full'/></div>
        <div><img src="https://res.cloudinary.com/demo6uvtg/image/upload/v1756747983/gallery4_c4ccwi.jpg" alt='3' className='w-full'/></div>
      </div>
    </div>
  )
}

export default Banner
