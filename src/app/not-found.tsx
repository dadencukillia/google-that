"use client";

import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex flex-col items-center px-5">
      <Image
        src="/sprite6.png"
        width={ 256 }
        height={ 256 }
        alt="Aura-chan"
      ></Image>
      <h1>Hi, I'm Aura-chan. I see you have lost!</h1>
      <Link href="/" className="text-blue-500 underline text-wrap break-all">Go back</Link>
    </main>
  );
}
