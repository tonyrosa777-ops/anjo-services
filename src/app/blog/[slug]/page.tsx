/**
 * /blog/[slug] — Server component for individual blog post pages.
 *
 * Per Next.js 16 App Router (project uses next 16.x — see web/AGENTS.md
 * "this is NOT the Next.js you know"): `params` is a Promise.
 *
 * Pattern:
 *   - generateStaticParams from blogArticles in /data/blog.ts (9 routes)
 *   - generateMetadata per-article: unique title + description + OG image
 *   - notFound() for invalid slugs
 *   - Renders <BlogPostClient article={...} related={...} /> + JSON-LD
 *
 * Schemas emitted:
 *   - Article            — main content schema with author/publisher/date
 *   - BreadcrumbList     — Home > Blog > [Category] > [Article]
 */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getArticleBySlug,
  getRelatedArticles,
  blogArticles,
} from "@/data/blog";
import { BreadcrumbSchema, JsonLd, ANJO_ORG_ID } from "@/components/seo";
import BlogPostClient from "./BlogPostClient";

type RouteParams = { slug: string };

export function generateStaticParams(): RouteParams[] {
  return blogArticles.map((a) => ({ slug: a.slug }));
}

const BASE = "https://anjoservices.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};

  const url = `${BASE}/blog/${article.slug}`;
  const ogImage = `${BASE}${article.cardImage}`;

  return {
    title: article.title,
    description: article.metaDescription,
    alternates: { canonical: `/blog/${article.slug}` },
    openGraph: {
      type: "article",
      url,
      siteName: "Anjo Services, LLC",
      locale: "en_US",
      title: article.title,
      description: article.metaDescription,
      publishedTime: article.publishedAt,
      authors: [article.author.name],
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.metaDescription,
      images: [ogImage],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const related = getRelatedArticles(slug, 3);

  // Article schema. mainEntityOfPage links to canonical URL. Publisher links
  // back to homepage GeneralContractor schema via @id.
  const articleSchema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Article",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE}/blog/${article.slug}`,
    },
    headline: article.title,
    description: article.metaDescription,
    image: `${BASE}${article.headerImage}`,
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    author: {
      "@type": "Person",
      name: article.author.name,
      jobTitle: article.author.role,
    },
    publisher: {
      "@type": "Organization",
      "@id": ANJO_ORG_ID,
      name: "Anjo Services, LLC",
      logo: {
        "@type": "ImageObject",
        url: `${BASE}/Logo.webp`,
      },
    },
    articleSection: article.category,
    keywords: [article.category, article.title].join(", "),
  };

  return (
    <>
      <JsonLd schema={articleSchema} id={`article-${article.slug}-schema`} />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "/" },
          { name: "Blog", url: "/blog" },
          { name: article.category, url: `/blog?category=${encodeURIComponent(article.category)}` },
          { name: article.title, url: `/blog/${article.slug}` },
        ]}
      />
      <BlogPostClient article={article} related={related} />
    </>
  );
}
