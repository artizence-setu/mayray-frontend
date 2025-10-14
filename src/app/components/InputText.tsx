import React from "react";
import { LucideIcon, User } from "lucide-react";

interface InputComponentProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  Icon?: LucideIcon;
}

const InputComponent: React.FC<InputComponentProps> = ({
  label,
  placeholder,
  value,
  onChange,
  Icon = User,
}) => {
  return (
    <div className="flex flex-col w-full">
      {label && (
        <label className="mb-2 text-sm text-start font-medium text-[#333333]">
          {label}
        </label>
      )}
      <div className="relative w-full">
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full placeholder:text-[#4F4F4F]  border-1 border-white bg-[#FFFFFF40] text-white   rounded-xl py-2 px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        />
        <Icon
          className="absolute right-3 top-1/2 -translate-y-1/2 text-black"
          size={20}
        />
      </div>
    </div>
  );
};

export default InputComponent;
