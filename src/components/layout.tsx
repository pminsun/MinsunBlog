import { PropsWithChildren, useEffect, useState } from "react";
import Header from "./header";
import Footer from "./footer";

export default function Layout({ children }: PropsWithChildren) {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <main className="flex flex-col items-center bg-primary min-h-full relative pb-[65px]">
        {mounted && (
          <>
            <Header />
            <section className="lg:max-w-3xl w-full h-full py-4 px-5 lg:px-0 mt-[56px]">
              {children}
            </section>
            <Footer />
          </>
        )}
      </main>
    </>
  );
}
