import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex h-[77vh] flex-col items-center justify-center p-24">
      <h1 className="text-3xl max-w-xl text-center">
        Another Todo Application made using Nile DB, Next.js and shadcn/ui <br/>
        <a href="/login">
          <Button className="mt-5">Login</Button>
        </a>
      </h1>
    </main>
  );
}
