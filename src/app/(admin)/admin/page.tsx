import Link from "next/link";
import GreenButton from "@/components/ui_personal/green-button";
import GreenOutlineButton from "@/components/ui_personal/green-outline-button";
import { LogoutButton } from "@/components/ui/logout-button";

export default function AdminPage() {
  return (
    <div className="p-8 h-[70vh] flex flex-col mx-[65px]">
      <LogoutButton className="ml-auto cursor-pointer" />
      <div className="space-x-4 flex items-center justify-center h-full">
        <Link href="/admin/create-blog" className="cursor-pointer">
          <GreenButton
            className="w-full md:w-auto cursor-pointer"
            title="Navigate to Create Blog"
          />
        </Link>

        <Link href="/admin/create-career" className="cursor-pointer">
          <GreenOutlineButton
            className="w-full md:w-auto cursor-pointer"
            title="Navigate to Create Career"
          />
        </Link>
      </div>
    </div>
  );
}
