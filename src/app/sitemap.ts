import { MetadataRoute } from 'next';
import { entities } from '@/content/entities';
import { projects } from '@/content/projects';
import { brands } from '@/content/brands';
import { jobOpenings } from '@/content/jobs';
import { news } from '@/content/news';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://hrsgroup.in';
  const currentDate = new Date().toISOString();

  // Core static pages
  const staticRoutes: MetadataRoute.Sitemap = [
    '',
    '/about',
    '/businesses',
    '/contact',
    '/careers',
    '/news',
    '/privacy',
    '/terms',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: route === '' || route === '/news' ? 'daily' : 'weekly',
    priority: route === '' ? 1.0 : 0.8,
  }));

  // Entity pages (11)
  const entityRoutes: MetadataRoute.Sitemap = entities.map((entity) => ({
    url: `${baseUrl}/businesses/${entity.slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  // Project pages (16)
  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  // Brand pages (17)
  const brandRoutes: MetadataRoute.Sitemap = brands.map((brand) => ({
    url: `${baseUrl}/brands/${brand.slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  // Career opening pages (11)
  const careerRoutes: MetadataRoute.Sitemap = jobOpenings.map((job) => ({
    url: `${baseUrl}/careers/${job.slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  // News story pages (12)
  const newsRoutes: MetadataRoute.Sitemap = news.map((item) => ({
    url: `${baseUrl}/news/${item.slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [
    ...staticRoutes,
    ...entityRoutes,
    ...projectRoutes,
    ...brandRoutes,
    ...careerRoutes,
    ...newsRoutes,
  ];
}
