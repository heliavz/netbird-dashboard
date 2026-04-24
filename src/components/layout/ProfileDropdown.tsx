import { cn } from "@/lib/utils";
import {
  IconCreditCard,
  IconLogout,
  IconSettings,
  IconX,
} from "@tabler/icons-react";
import { useEffect, useRef } from "react";

interface ProfileDropdownProps {
  onClose: () => void;
}

const menuItems = [
  {
    icon: <IconCreditCard size={15} />,
    label: "Plans & Billing",
    onClick: () => {},
  },
  {
    icon: <IconSettings size={15} />,
    label: "Profile Settings",
    onClick: () => {},
  },
];

export default function ProfileDropdown({ onClose }: ProfileDropdownProps) {
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  // Close on Escape
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      ref={ref}
      className={cn(
        "absolute top-10 right-0 w-64 rounded-xl border border-nb-gray-900",
        "bg-nb-gray-920 shadow-2xl z-50 overflow-hidden",
      )}
    >
      {/* User info */}
      <div className="px-4 py-3 border-b border-nb-gray-900">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-nb-gray-100 text-sm font-medium">
              Helia Valizadeh
            </span>
            <span className="text-nb-gray-500 text-xs mt-0.5">
              heliavalizadeh@gmail.com
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-nb-gray-600 hover:text-nb-gray-300 transition-colors"
          >
            <IconX size={14} />
          </button>
        </div>
      </div>

      {/* Menu items */}
      <div className="py-1">
        {menuItems.map((item) => (
          <button
            key={item.label}
            onClick={() => {
              item.onClick();
              onClose();
            }}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-2.5 text-sm",
              "text-nb-gray-300 hover:text-nb-gray-100 hover:bg-nb-gray-900",
              "transition-colors text-left",
            )}
          >
            <span className="text-nb-gray-500">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </div>

      {/* Divider + logout */}
      <div className="border-t border-nb-gray-900 py-1">
        <button
          onClick={onClose}
          className={cn(
            "w-full flex items-center gap-3 px-4 py-2.5 text-sm",
            "text-nb-gray-300 hover:text-red-400 hover:bg-nb-gray-900",
            "transition-colors text-left",
          )}
        >
          <IconLogout size={15} className="text-nb-gray-500" />
          Log out
        </button>
      </div>
    </div>
  );
}
