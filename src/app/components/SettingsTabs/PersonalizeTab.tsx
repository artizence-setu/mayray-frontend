import React, { useState } from 'react'

function PersonalizeTab() {
  const [bgColor, setBgColor] = useState('#ffffff')

  const colors = ['#FF595E', '#FFCA3A', '#8AC926', '#1982C4', '#6A4C93']

  return (
    <div>
      <h6 className="text-xl text-[#333333] font-semibold pb-4">
        Personalize
      </h6>

      <div className="border border-[#FFFFFF32] mb-4"></div>

      <div
        className="w-full h-[250px]   rounded-xl mb-6 border border-gray-300"
        style={{ backgroundColor: bgColor }}
      ></div>

      <h6  className='font-medium py-2'>Chose Background Color</h6>
      <div className="flex gap-4">
        {colors.map((color) => (
          <button
            key={color}
            onClick={() => setBgColor(color)}
            className="w-18 h-18 rounded-full "
            style={{ backgroundColor: color }}
          ></button>
        ))}
      </div>
    </div>
  )
}

export default PersonalizeTab
