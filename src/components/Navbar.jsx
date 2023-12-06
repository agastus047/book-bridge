import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const { status } = useSession();
  return (
    <div className="p-4 flex justify-between items-center shadow-md">
      <div className="marginhome text-zinc-100 text-lg ">
      <Link className="text-lg font-medium" href={"/"}>
        Home
      </Link>
     </div>
      {status === "authenticated" ? (
        <button
          onClick={() => signOut()}
          className="bg-slate-950 hover:bg-red-950 text-white font-bold py-2 px-4 rounded"
          
        >
          Sign Out
        </button>
      ) : (
        <button
          onClick={() => signIn("google")}
          className="bg-slate-950 hover:bg-red-950 text-white  font-bold py-2 px-4 rounded"
        >
          Sign In
        </button>
      )}
    </div>
  )
}