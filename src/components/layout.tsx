import { PropsWithChildren, useEffect, useState } from 'react'
import Header from './ScreenStructure/header'
import Footer from './ScreenStructure/footer'

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      <section className=" w-full pt-4 lg:px-0 mt-[56px]">{children}</section>
      <Footer />
    </>
  )
}
