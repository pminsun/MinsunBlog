import '@/styles/globals.css'
import '@/styles/home.css'
import '@/styles/post.css'
import '@/styles/fonts.css'
import '@/styles/codeHighlightColors.css'
import type { AppProps } from 'next/app'
import Layout from '../components/layout'
import React from 'react'
import { ThemeProvider } from 'next-themes'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  )
}
