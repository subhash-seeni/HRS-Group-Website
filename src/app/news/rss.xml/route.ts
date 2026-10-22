import { news } from '@/content/news';

export const dynamic = 'force-static';

export async function GET() {
  const siteUrl = 'https://hrsgroup.in';

  const rssItems = news
    .map(
      (item) => `
    <item>
      <title><![CDATA[${item.title}]]></title>
      <link>${siteUrl}/news/${item.slug}</link>
      <guid isPermaLink="true">${siteUrl}/news/${item.slug}</guid>
      <description><![CDATA[${item.summary}]]></description>
      <category><![CDATA[${item.category}]]></category>
      <pubDate>${new Date(item.date).toUTCString()}</pubDate>
    </item>`
    )
    .join('');

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>HRS Group | Official Announcements &amp; News</title>
    <link>${siteUrl}/news</link>
    <description>Corporate records, infrastructure handovers, and technical trade announcements from HRS Group.</description>
    <language>en-IN</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/news/rss.xml" rel="self" type="application/rss+xml" />
    ${rssItems}
  </channel>
</rss>`;

  return new Response(rss.trim(), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate',
    },
  });
}
