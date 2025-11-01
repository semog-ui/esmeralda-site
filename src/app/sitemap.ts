// app/sitemap.ts
import { MetadataRoute } from 'next'
import { client } from '@/lib/client'

// Queries para dados dinâmicos do Sanity
const PROJECTS_QUERY = `*[_type == "project"]{
  "slug": slug.current,
  _updatedAt
}`

const BLOG_POSTS_QUERY = `*[_type == "post"]{
  "slug": slug.current,
  _updatedAt
}`

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://esmeraldacompany.com.br'
  
  // Buscar dados dinâmicos do Sanity
  const [projects, blogPosts] = await Promise.all([
    client.fetch(PROJECTS_QUERY),
    client.fetch(BLOG_POSTS_QUERY)
  ])

  // Entradas para projetos
  const projectEntries = projects.map((project: any) => ({
    url: `${baseUrl}/projetos/${project.slug}`,
    lastModified: new Date(project._updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  // Entradas para posts do blog
  const blogEntries = blogPosts.map((post: any) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post._updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  // Páginas estáticas
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/sobre`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/projetos`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contato`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/recursos`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/newsletter`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/termos-e-condicoes`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
  ]

  return [
    ...staticPages,
    ...projectEntries,
    ...blogEntries,
  ]
}