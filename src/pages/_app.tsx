import "@/styles/globals.css";
import "@/styles/header.css";
import "@/styles/home.css";
import "@/styles/post.css";
import "@/styles/fonts.css";
import "@/styles/tagColors.css";
import "@/styles/codeHighlightColors.css";
import type { AppProps } from "next/app";
import Layout from "../components/layout";
import React from "react";
import { ThemeProvider } from "next-themes";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}
