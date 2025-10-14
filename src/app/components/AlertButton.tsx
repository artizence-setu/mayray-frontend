import { Facebook } from "lucide-react";
import React, { useRef, useEffect, CSSProperties, ReactNode } from "react";

interface ReusablePopupProps {
    open: boolean;
    setOpen: (value: boolean) => void;
    style?: CSSProperties; // for top, left, etc.
}

const ReusablePopup: React.FC<ReusablePopupProps> = ({ open, setOpen, style }) => {
    const popupRef = useRef<HTMLDivElement>(null);

    // Close when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        }

        if (open) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [open, setOpen]);

    if (!open) return null;

    return (
        <div
            ref={popupRef}
            className="absolute w-100 right-30 rounded-b-2xl top-[16%]  bg-white text-black   py-6 px-4 z-50"
            style={style}
        >
            <div className="flex justify-between items-center text-center">
                <span className="font-semibold">Notifications</span>
                <button className="border border-[#0CD6DD] p-2 rounded-lg">Read All</button>

            </div>
            <div className="flex flex-row gap-4 mt-4">
                {/* Circle Icon */}
                <span className="bg-[#B4B7BC] rounded-full h-12 w-12 flex-shrink-0 flex justify-center items-center">
                    <Facebook className="h-6 w-6 text-white" />
                </span>

                {/* Text */}
                <p className="text-[14px] flex-1">
                    We truly value the trust you place in us. We’re committed to promoting
                    transparency, empowering authentic creativity, supporting your rights,
                    and ensuring strong protections in place to help keep everyone safe.
                </p>
            </div>
            <div className="flex flex-row gap-4 mt-4">
                {/* Circle Icon */}
                <span className="bg-[#B4B7BC] rounded-full h-12 w-12 flex-shrink-0 flex justify-center items-center">
                    <Facebook className="h-6 w-6 text-white" />
                </span>

                {/* Text */}
                <p className="text-[14px] flex-1">
                    We truly value the trust you place in us. We’re committed to promoting
                    transparency, empowering authentic creativity, supporting your rights,
                    and ensuring strong protections in place to help keep everyone safe.
                </p>
            </div>

        </div>
    );
};

export default ReusablePopup;
