import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-gradient-to-r from-purple-700 to-blue-800">
      <div className="flex flex-col gap-6 items-center">
        <h2 className="text-white text-4xl font-bold">Browse Our Blog Collection</h2>
        <Link href={"/blogs"}><h2 className=" text-center text-2xl font-bold w-fit px-2 py-1 bg-white rounded-lg text-sky-900 brightness-200">Explore Blogs</h2></Link>
      </div>
    </main>
  );
}
