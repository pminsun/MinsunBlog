import Head from "next/head";

interface SeoType {
  title: string;
  desc?: string;
  url?: string;
  image?: string;
}

export default function Seo({ title, desc, url, image }: SeoType) {
  return (
    <Head>
      <title>{`MinSun's Blog | ${title}`}</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta property="og:title" content={title ? title : "MinSun's Blog"} />
      <meta property="og:site_name" content="MinSun's Blog" />
      <meta
        property="og:description"
        content={desc || "탐구한 것들을 기록하는 장소입니다."}
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url || "https://min-sun.vercel.app/"} />
      <meta
        property="og:image"
        content={
          image ||
          "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
        }
      />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:article:author" content="MinSun" />
    </Head>
  );
}
