"use client";

import { Dialog } from "@/components/dialog";
import { SearchBar } from "@/components/searchbar";
import { useRef } from "react";

export function SearchbarDialogUnion({
  prompt
}: {
  prompt: string
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <SearchBar ref={ inputRef }></SearchBar>
      <Dialog inputRef={ inputRef } prompt={ prompt }></Dialog>
    </>
  )
}
