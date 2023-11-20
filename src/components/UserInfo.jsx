import Image from "next/image";
import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";

export default function UserInfo() {
  const { status, data: session } = useSession();
  console.log(session);
  if (status === "authenticated") {
    return (
      <div className="shadow-xl p-8 rounded-md flex flex-col gap-3 bg-yellow-200">
        <Image
          className="rounded-full"
          src={session?.user?.image}
          width={60}
          height={60}
          alt="user image"
        />
        <div>
          Name: <span className="font-bold">{session?.user?.name}</span>
        </div>
        <div>
          Email: <span className="font-bold">{session?.user?.email}</span>
        </div>
      </div>
    );
  } else {
    return (
        <button onClick={() => signIn("google")}
        className="flex items-center gap-4 shadow-xl rounded-lg pl-3">
            <span className="bg-blue-500 text-white px-4 py-3">
                Sign in with Google
            </span>
        </button>
    );
  }
}