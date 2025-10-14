import Image from 'next/image'
import React from 'react'
import { BsPersonWorkspace } from 'react-icons/bs'
import { MdEdit } from 'react-icons/md'
import { RiDeleteBin5Line, RiInboxArchiveLine } from 'react-icons/ri'

function WorkspaceTab() {
  const data = [
    { name: "Mr Rahman’s workspace", specialization: "Software Engineer", photo: "/images//avatar.png" },
    { name: "Mr Rahman’s workspace", specialization: "Marketing Manager", photo: "/images//avatar.png" },

  ]
  return (
    <div className='h-full'>
      <h6 className="text-xl text-[#333333] font-semibold pb-4">Workspace</h6>
      <div className="border-1 border-[#FFFFFF32]"></div>
      <div className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols- gap-x-8 gap-y-4 py-4'>
        {data.length > 0 ? (
          data?.map((item, index) => (
            <div className='bg-[#FFFFFF40] rounded-2xl p-4' key={index}>
              <div className='flex items-center gap-4'>
                <div><img className='rounded-full mr-5' height={70} width={70} src={item.photo} alt="image" /></div>
                <div>
                  <h6 className='text-white text-lg font-normal'>{item.name}</h6>
                  <span className='text-[14px] font-normal text-white'>{item.specialization}</span>

                  <div className='border-b-1 border-[#FFFFFF80]  py-2'></div>
                  <div className="flex flex-row gap-4 mt-4">
                    <div className="bg-[#4F4F4F] text-white flex items-center gap-2 px-3 py-2 rounded-full cursor-pointer hover:bg-[#5a5a5a] transition">
                      <MdEdit className="text-white text-[14px]" />
                      <span className=' text-[14px]'>Edit</span>
                    </div>

                    <div className="bg-[#4F4F4F] text-white flex items-center gap-2 px-3 py-2 rounded-full cursor-pointer hover:bg-[#5a5a5a] transition">
                      <RiDeleteBin5Line className="text-white  text-[14px]" />
                      <span className=' text-[14px]'>Delete</span>
                    </div>

                    <div className="bg-[#4F4F4F] text-white flex items-center gap-2 px-3 py-2 rounded-full cursor-pointer hover:bg-[#5a5a5a] transition">
                      <RiInboxArchiveLine className="text-white  text-[14px]" />
                      <span className=' text-[14px]'>Archive</span>
                    </div>
                  </div>

                </div>

              </div>
            </div>
          ))
        ) : (

          <div className="flex justify-center flex-col items-center  mx-auto ">
            <div className="bg-[#4F4F4F] w-20 h-20 rounded-full flex items-center justify-center">
              <BsPersonWorkspace color="white" size={36} />
            </div>
            <h6 className='md:text-[32px] font-semibold leading-tight text-white text-center'>You currently have no workspace</h6>
          </div>
        )}
      </div>



    </div>
  )
}

export default WorkspaceTab