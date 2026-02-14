export function Footer() {
  return (
    <div className="flex flex-col text-[15px]">
      <div className="w-full px-7.5 py-3.75 bg-surface-bg dark:bg-surface-bg-dark border-b-1 border-[#d2d2d2] dark:border-[#444746]">
        <p>{ Intl.DateTimeFormat().resolvedOptions().timeZone }</p>
      </div>
      <div className="w-full px-5 bg-surface-bg dark:bg-surface-bg-dark flex flex-wrap justify-evenly">
        {[
          "Not affiliated with Google LLC",
          "Privacy",
          "Terms",
          "Settings",
        ].map((text, index) => (
          <p key={ index } className="p-3.75">{ text }</p>
        ))}
      </div>
    </div>
  );
}
