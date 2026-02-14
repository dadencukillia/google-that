import { SearchIcon } from "lucide-react";
import { InputEventHandler, Ref } from "react";

export function SearchBar({
  ref = null,
  onInput = undefined
}: {
  ref?: Ref<HTMLInputElement>|null,
  onInput?: InputEventHandler<HTMLInputElement>|undefined
}) {
  return (
    <div className="max-w-[668px] w-full h-[50px] mx-auto flex flex-row rounded-[26px] bg-[#ffffff] dark:bg-[#303134] text-[#474747] dark:text-[#bfbfbf] border-1 dark:border-none border-[#dadce0] items-center">
      <input ref={ ref } onInput={ onInput } className="flex-1 h-full pt-1 pl-5 text-base outline-none"></input>
      <SearchIcon className="mx-5" width={ 16 }></SearchIcon>
    </div>
  )
}
