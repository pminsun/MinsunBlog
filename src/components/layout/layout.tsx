import { PropsWithChildren } from 'react'
import Header from './header'
import Footer from './footer'

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      <section className="root-layout">{children}</section>
      <Footer />
    </>
  )
}
