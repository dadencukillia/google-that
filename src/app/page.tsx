"use client";

import Image from "next/image";
import Link from "next/link";
import { SearchBar } from "@/components/searchbar";
import { useState } from "react";

export default function HomePage() {
  const [currentPrompt, setCurrentPrompt] = useState("");

  const link = currentPrompt === "" ? "" : `${location.origin}/c/${encodeURI(currentPrompt)}`;

  return (
    <main className="flex flex-col items-center px-5">
      <Image
        src="/sprite6.png"
        width={ 256 }
        height={ 256 }
        alt="Aura-chan"
      ></Image>
      <h1>Hi, I'm Aura-chan. Write your prompt, take the link and go away!</h1>
      <div className="w-full h-full my-10">
        <SearchBar onInput={ ev => setCurrentPrompt(ev.currentTarget.value.trim()) }></SearchBar>
      </div>
      <Link href={ link } className="text-blue-500 underline text-wrap break-all">{ link }</Link>
    </main>
  );
}


