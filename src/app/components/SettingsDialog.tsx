"use client";

import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import {
  LogOut,
  User,
  CreditCard,
  Clock,
  Palette,
  Briefcase,
  X,
  ChevronRight,
} from "lucide-react";
import { AccountTab } from "./SettingsTabs/AccountTab";
import WorkspaceTab from "./SettingsTabs/WorkspaceTab";
import PaymentTab from "./SettingsTabs/PaymentTab";
import HistoryTab from "./SettingsTabs/HistoryTab";
import PersonalizeTab from "./SettingsTabs/PersonalizeTab";

const MENU = [
  { id: "account", name: "Account", icon: User },
  { id: "workspace", name: "Workspace", icon: Briefcase },
  { id: "payment", name: "Payment", icon: CreditCard },
  {
    id: "history",
    name: "History",
    icon: Clock,
    children: [
      { id: "chat", name: "Chat" },
      { id: "news", name: "Search top 10 news" },
      { id: "places", name: "Top natural place in UK" },
    ],
  },
  { id: "personalize", name: "Personalize", icon: Palette },
];

export function SettingsDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const [activeTab, setActiveTab] = useState("account");
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [activeHistoryTab, setActiveHistoryTab] = useState("chat"); // default

  const toggleDropdown = (id: string) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="flex w-auto h-full   max-w-none md:w-fit mt-22 justify-center border-none items-center p-6"
        style={{ height: "550px" }}
      >
        <div className="flex w-full h-full gap-4">
          {/* Sidebar */}
          <div
            className="flex flex-col justify-between w-[230px] p-4"
            style={{
              borderImageSource:
                "linear-gradient(180deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.16) 100%)",
              borderImageSlice: 1,
              backdropFilter: "blur(40px)",
              boxShadow:
                "inset 0px 6px 10px 0px #FFFFFF99, inset 0px -6px 10px 0px #FFFFFF80",
              borderRadius: "20px",
            }}
          >
            <div className="space-y-2">
              {MENU.map((item) => {
                const Icon = item.icon;
                const active = activeTab === item.id;

                return (
                  <div key={item.id} className="flex flex-col">
                    <button
                      onClick={() => {
                        if (item.children) toggleDropdown(item.id);
                        else setActiveTab(item.id);
                      }}
                      className={cn(
                        "flex items-center justify-between w-full rounded-xl px-3 py-2 text-sm transition-all",
                        active
                          ? "bg-[#FFFFFF40] text-black font-medium shadow-sm"
                          : "text-white/80 hover:bg-white/10"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`h-10 w-10 p-1 rounded-full flex items-center justify-center ${
                            active ? "bg-[#4F4F4F]" : "bg-white/70"
                          }`}
                        >
                          <Icon
                            className={`h-4 w-4 ${
                              active ? "text-white" : "text-black"
                            }`}
                          />
                        </div>

                        {item.name}
                      </div>
                      {item.children && (
                        <ChevronRight
                          className={cn(
                            "h-4 w-4 transition-transform duration-200",
                            openDropdown === item.id && "rotate-90"
                          )}
                        />
                      )}
                    </button>

                    {/* Dropdown Submenu */}
                    {item.children && openDropdown === item.id && (
                      <div className="ml-8 mt-1 space-y-1">
                        {item.children.map((child) => (
                          <button
                            key={child.id}
                            onClick={() => {
                              setActiveTab(item.id);
                              setActiveHistoryTab(child.id);
                            }}
                            className={cn(
                              "w-full text-left text-sm rounded-lg px-3 py-1.5 transition-all",
                              activeHistoryTab === child.id
                                ? "bg-white/30 text-black"
                                : "text-white/70 hover:bg-white/10"
                            )}
                          >
                            {child.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <button className="flex items-center gap-3  px-3 py-2 text-sm font-semibold text-white  hover:bg-red-500/10">
              <div className="bg-red-500 p-2 rounded-full">
                <LogOut className="h-4 w-4 text-white " />
              </div>{" "}
              Log Out
            </button>
          </div>

          <div
            className={`flex-1 rounded-2xl relative p-6 scrollbar-hide overflow-y-auto w-[450px] ${
              activeTab === "personalize" ? "bg-white" : ""
            }`}
            style={{
              maxHeight: "100%",

              borderImageSource:
                "linear-gradient(180deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.16) 100%)",
              borderImageSlice: 1,
              backdropFilter: "blur(40px)",
              boxShadow:
                "inset 0px 6px 10px 0px #FFFFFF99, inset 0px -6px 10px 0px #FFFFFF80",
              borderRadius: "20px",
            }}
          >
            <button
              onClick={() => onOpenChange(false)}
              className="absolute right-4 top-4 p-1 rounded-full hover:bg-white/20"
            >
              <X className="h-5 w-5 text-white" />
            </button>

            {activeTab === "account" && <AccountTab />}
            {activeTab === "workspace" && <WorkspaceTab />}
            {activeTab === "payment" && <PaymentTab />}
            {activeTab === "history" && (
              <HistoryTab activeSubTab={activeHistoryTab} />
            )}
            {activeTab === "personalize" && <PersonalizeTab />}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
