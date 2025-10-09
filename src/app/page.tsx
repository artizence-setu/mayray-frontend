import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">

        <Link href="/login" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-10 cursor-pointer rounded-full">Login</Link>

      </main>

    </div>
  );
}
