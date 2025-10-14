import React from 'react'
import { BsPersonWorkspace } from 'react-icons/bs'

function PaymentTab() {
  return (
    <div className='h-full'>
      <h6 className="text-xl text-[#333333] font-semibold pb-4">Payment</h6>
      <div className="border-1 border-[#FFFFFF32]"></div>
      <div className="flex justify-center flex-col items-center  mx-auto h-full ">
        <div className="bg-[#4F4F4F] w-20 h-20 rounded-full flex items-center justify-center">
          <BsPersonWorkspace color="white" size={36} />
        </div>
        <h6 className='md:text-[32px] font-semibold leading-tight text-white text-center'>
          You currently have no Subscription
        </h6>
      </div>
    </div>
  )
}

export default PaymentTab