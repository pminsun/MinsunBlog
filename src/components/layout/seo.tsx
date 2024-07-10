import Head from 'next/head'

interface SeoType {
  title: string
  desc?: string
  url?: string
  image?: string
}

export default function Seo({ title, desc, url, image }: SeoType) {
  return (
    <Head>
      <title>{title ? title : "MinSun's Blog"}</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="author" content="Minsun" />
      <meta name="description" content="MinSun's Blog" />
      <meta property="og:title" content={title ? title : "MinSun's Blog"} />
      <meta property="og:site_name" content="MinSun's Blog" />
      <meta
        property="og:description"
        content={desc || '탐구한 것들을 기록하는 장소입니다.'}
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url || 'https://min-sun.vercel.app/'} />
      <meta
        property="og:image"
        content={
          image ||
          'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
        }
      />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:article:author" content="MinSun" />
      <link rel="shortcut icon" href="/faviconImages/favicon.ico" />
      <link
        rel="apple-touch-icon"
        sizes="57x57"
        href="/faviconImages/apple-icon-57x57.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="60x60"
        href="/faviconImages/apple-icon-60x60.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="72x72"
        href="/faviconImages/apple-icon-72x72.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="76x76"
        href="/faviconImages/apple-icon-76x76.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="114x114"
        href="/faviconImages/apple-icon-114x114.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="120x120"
        href="/faviconImages/apple-icon-120x120.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="144x144"
        href="/faviconImages/apple-icon-144x144.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="152x152"
        href="/faviconImages/apple-icon-152x152.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/faviconImages/apple-icon-180x180.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="192x192"
        href="/faviconImages/android-icon-192x192.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/faviconImages/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="96x96"
        href="/faviconImages/favicon-96x96.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/faviconImages/favicon-16x16.png"
      />
      <link rel="manifest" href="/faviconImages/manifest.json" />
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta
        name="msapplication-TileImage"
        content="/faviconImages/ms-icon-144x144.png"
      />
      <meta name="theme-color" content="#ffffff" />
    </Head>
  )
}
