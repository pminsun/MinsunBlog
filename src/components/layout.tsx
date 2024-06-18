import { PropsWithChildren, useEffect, useState } from 'react'
import Header from './ScreenStructure/header'
import Footer from './ScreenStructure/footer'

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <section className="flex flex-col items-center bg-primary min-h-full relative pb-[65px]">
        <Header />
        <section className="w-full h-full py-4 lg:px-0 mt-[56px]">
          {children}
        </section>
        <Footer />
      </section>
    </>
  )
}
