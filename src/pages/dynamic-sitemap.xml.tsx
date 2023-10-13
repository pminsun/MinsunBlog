import axios from "axios";
import { DATABASE_ID_BLOG, DATABASE_ID_PROJECT, TOKEN } from "libs/config";
import { getServerSideSitemapLegacy } from "next-sitemap";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const lastmod = new Date().toISOString();

  const axiosConfig = {
    headers: {
      Accept: "application/json",
      "Notion-Version": "2022-02-22",
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
  };

  const data = {
    page_size: 100,
  };

  const blogsResponse = await axios.post(
    `https://api.notion.com/v1/databases/${DATABASE_ID_BLOG}/query`,
    data,
    axiosConfig
  );

  const projectsResponse = await axios.post(
    `https://api.notion.com/v1/databases/${DATABASE_ID_PROJECT}/query`,
    data,
    axiosConfig
  );

  const blogsList: any = [];
  const projectsList: any[] = [];
  blogsResponse.data.results.forEach((blog: { id: string }) =>
    blogsList.push({
      loc:
        `${baseUrl}/blog/${blog.id}` || `http://localhost:3000/blog/${blog.id}`,
      changefreq: "daily",
      priority: 1,
      lastmod,
    })
  );

  projectsResponse.data.results.forEach((project: { id: string }) =>
    projectsList.push({
      loc:
        `${baseUrl}/project/${project.id}` ||
        `http://localhost:3000/project/${project.id}`,
      changefreq: "daily",
      priority: 1,
      lastmod,
    })
  );

  const fields: any[] = [...blogsList, ...projectsList];

  return getServerSideSitemapLegacy(ctx, fields);
};

// Default export to prevent next.js errors
export default function Sitemap() {}
