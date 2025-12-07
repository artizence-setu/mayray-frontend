"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { User, Mail, Eye } from "lucide-react"
import { MdEdit } from "react-icons/md"
import { RiDeleteBin6Fill } from "react-icons/ri"
import { Button } from "@/components/ui/button"
import InputComponent from "../InputText"
import { useUpdateAvatar } from "@/features/profile/useUpdateAvatar"
import { toast } from "sonner"
import { useProfile } from "@/features/profile/useProfile"
import { useUpdateProfile } from "@/features/profile/useUpdateProfile"
import { useQueryClient } from "@tanstack/react-query"

export function AccountTab() {
  const [formdata, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    phoneNumber:""
  })
   const [avatar, setAvatar] = useState("/images/avatar.png")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const updateAvatar = useUpdateAvatar();
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useProfile();
const updateProfile = useUpdateProfile();


useEffect(() => {
  if (data) {
    setFormData({
      firstName: data.first_name || "",
      lastName: data.last_name || "",
      email: data.email || "",
      phoneNumber: data.phone || "",
      currentPassword: "",
      newPassword: ""
    });

    if (data.profile_photo_url) {
      setAvatar(data.profile_photo_url);
    }
  }
}, [data]);

 const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (event) => {
    if (event.target?.result) {
      setAvatar(event.target.result as string); // preview
    }
  };
  reader.readAsDataURL(file);

  // 2️⃣ Upload avatar via API
  updateAvatar.mutate(file, {
    onSuccess: () => {
      toast.success("Avatar updated!");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
};
const handleProfileUpdate = () => {
  updateProfile.mutate(
    {
      first_name: formdata.firstName,
      last_name: formdata.lastName,
      phone: formdata.phoneNumber,
      email: formdata.email,
    },
    {
      onSuccess: () => {
        toast.success("Profile updated successfully!");

        // 🔥 REFETCH PROFILE AFTER UPDATE
        queryClient.invalidateQueries({ queryKey: ["profile"] });
      },
      onError: (err) => {
        toast.error(err.message);
      },
    }
  );
};


  return (
    <div className="flex flex-col gap-4 text-white">
      <h6 className="text-xl text-black font-semibold">Account</h6>
      <div className="border-1 border-[#FFFFFF32]"></div>
      <div className="flex flex-col items-center gap-2">
       <div className="relative w-24 h-24">
      {/* Avatar Image */}
      <Image
        src={avatar}
        alt="Profile"
        width={100}
        height={100}
        className="rounded-full border border-white/40 object-cover w-full h-full"
      />

      {/* Edit button */}
      <button
        onClick={() => fileInputRef.current?.click()}
        className="absolute bottom-1 right-1 rounded-full bg-white/70 p-1 shadow"
      >
        <MdEdit className="h-4 w-4 text-gray-700" />
      </button>

      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
        <p className="text-xs text-white/70">Upload JPG, PNG under 2MB</p>
      </div>

      <div className="flex w-full gap-3 items-start">
        <div className="flex-1">
          <InputComponent
            label="Email"
            placeholder="Enter email address"
            value={formdata.email}
            onChange={(e) =>
              setFormData({ ...formdata, email: e.target.value })
            }
            Icon={Mail}
          />
        </div>
        <div className="flex items-center gap-2 mt-[32px]">
          <span className="bg-white/70 p-2.5 rounded-full cursor-pointer hover:bg-white transition">
            <MdEdit className="text-gray-800 text-lg" />
          </span>
          <span className="bg-white/70 p-2.5 rounded-full cursor-pointer hover:bg-red-100 transition">
            <RiDeleteBin6Fill className="text-black text-lg" />
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InputComponent
          label="First Name"
          placeholder="Enter first name"
          value={formdata.firstName}
          onChange={(e) =>
            setFormData({ ...formdata, firstName: e.target.value })
          }
          Icon={User}
        />
        <InputComponent
          label="Last Name"
          placeholder="Enter last name"
          value={formdata.lastName}
          onChange={(e) =>
            setFormData({ ...formdata, lastName: e.target.value })
          }
          Icon={User}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InputComponent
          label="Current Password"
          placeholder="Enter current password"
          value={formdata.currentPassword}
          onChange={(e) =>
            setFormData({ ...formdata, currentPassword: e.target.value })
          }
          Icon={Eye}
        />
        <InputComponent
          label="New Password"
          placeholder="New password"
          value={formdata.newPassword}
          onChange={(e) =>
            setFormData({ ...formdata, newPassword: e.target.value })
          }
          Icon={Eye}
        />
      </div>
            <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
               <InputComponent
          label="Phone Number"
          placeholder="Enter Phone Number"
          value={formdata.phoneNumber}
          onChange={(e) =>
            setFormData({ ...formdata, phoneNumber: e.target.value })
          }
          Icon={Eye}
        />
              </div>


     <Button
  onClick={handleProfileUpdate}
  className="self-end bg-white/70 hover:bg-white text-black rounded-full"
>
  Save Changes
</Button>

    </div>
  )
}
