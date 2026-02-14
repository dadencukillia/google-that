import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Button } from "@/ui/button";
import Image from "next/image";
import { SearchbarDialogUnion } from "./searchbar_dialog_union";

export default async function DialogPage({
  params
}: {
  params: Promise<{ prompt: string }>
}) {
  const { prompt } = await params;

  return (
    <main className="min-h-screen flex flex-col justify-between">
      <Header></Header>
      <div className="mx-5">
        <div className="flex flex-col items-center justify-end">
          <small>Not affiliated with</small>
          <Image
            width={ 500 }
            height={ 200 }
            preload={ true }
            loading="eager"
            src="/google_logo.svg"
            alt="Google Logo"
          ></Image>
        </div>
        <div className="py-5">
          <SearchbarDialogUnion prompt={ decodeURIComponent(prompt) }></SearchbarDialogUnion>
        </div>
        <div className="flex gap-2 justify-center mt-[11px]">
          <Button label="Google Search"></Button>
          <Button label="I feel lucky"></Button>
        </div>
      </div>
      <Footer></Footer>
    </main>
  )
}
