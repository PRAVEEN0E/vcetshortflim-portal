import Link from "next/link";
import { AlertCircle, ArrowLeft } from "lucide-react";

export default function RegistrationNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#07090E] text-white p-4">
      <div className="glass-card max-w-md w-full p-8 rounded-3xl text-center space-y-4 border-amber-500/30">
        <AlertCircle className="w-12 h-12 text-amber-400 mx-auto" />
        <h2 className="text-2xl font-bold text-white">Registration Not Found</h2>
        <p className="text-xs text-zinc-400">
          The requested registration ID does not exist or has been removed from the competition database.
        </p>
        <div className="pt-2">
          <Link
            href="/admin/dashboard"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 text-black font-bold text-xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Dashboard</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
