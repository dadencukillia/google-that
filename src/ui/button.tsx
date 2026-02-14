export function Button({
  label
}: {
  label: string
}) {
  return (
    <button className="px-4 h-[36px] rounded-[8px] bg-[#f8f9fa] dark:bg-[#303134] dark:text-[#e8eaed] text-[#202124] text-sm">{ label }</button>
  )
}
