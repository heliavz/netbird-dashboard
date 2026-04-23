import { IconHelp, IconUser } from "@tabler/icons-react";

export default function TopBar() {
  return (
    <header className="fixed top-0 left-[220px] right-0 h-12 bg-nb-gray-950 border-b border-nb-gray-900 flex items-center justify-end px-5 gap-3 z-10">
      <button className="w-7 h-7 flex items-center justify-center rounded text-nb-gray-500 hover:text-nb-gray-200 hover:bg-nb-gray-920 transition-colors">
        <IconHelp size={17} />
      </button>
      <button className="w-7 h-7 flex items-center justify-center rounded-full bg-nb-gray-800 text-nb-gray-300 hover:bg-nb-gray-700 transition-colors">
        <IconUser size={15} />
      </button>
    </header>
  );
}
