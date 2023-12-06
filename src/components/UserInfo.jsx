import Image from "next/image";
import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function UserInfo() {
  const { status, data: session } = useSession();
  if (status === "authenticated") {
    return (
      <>
      <div className=" irish shadow-xl p-8 rounded-md flex flex-col gap-3  bg-opacity-50">
        <Image
          className="rounded-full"
          src={session?.user?.image}
          width={80}
          height={80}
          alt="user image"
        />
        <div className="font-serif py-4">
          Name: <span className="font-bold font-serif">{session?.user?.name}</span>
        </div>
        <div className="font-serif">
          Email: <span className="font-bold font-serif">{session?.user?.email}</span>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-5 mt-10 justify-center items-center w-full">
        <Link href="/donate"><button className="bg-yellow-950 hover:bg-yellow-900 text-white border border-slate-950 font-bold py-2 px-8 rounded">Donate</button></Link>
        <Link href="/search"><button className="bg-yellow-950 hover:bg-yellow-900 text-white border border-slate-950 font-bold py-2 px-8 rounded">Search</button></Link>
        <Link href="#"><button className="bg-yellow-950 hover:bg-yellow-900 text-white border border-slate-950 font-bold py-2 px-4 rounded">Transactions</button></Link>
      </div>
      </>
    );
  } else {
    return (
      <div className="flex justify-center mt-20">       
        <div>
          <div className="headbook w-200 h-64 relative">
        <div className="BookBridge w-96 text-center leading-relaxed"><span className="text-white text-8xl font-bold font-['Poppins'] ">BOOK</span><span className="text-white text-8xl font-bold font-['Poppins'] "> BRIDGE</span></div>
        <div className="byline left-[67.94px] top-[191.65px] absolute text-zinc-100 text-lg font-bold font-['Poppins'] mt-30 ml-15">-Passing Wisdom, Building Futures.</div>
        </div>      
      <div className="flex justify-center mt-10">
        <button
          onClick={() => signIn("google")}
          className="flex items-center gap-4 shadow-xl bg-slate-400 bg-opacity-50 text-black mb-20 px-4 py-3 rounded-md font-semibold"
        >
          Sign in with Google
        </button>
      </div>
      </div>
      </div>
    );
  }
}