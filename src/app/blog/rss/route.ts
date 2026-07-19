const BASE_URL = "https://shravandeb.com";

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const now = new Date().toUTCString();

  const items = [
    {
      title: "DevMon — Real-time System Monitoring",
      link: `${BASE_URL}/work/devmon`,
      description:
        "Real-time system monitoring and alerting platform built for modern infrastructure. Python, Go, Prometheus, Grafana, Kubernetes.",
      pubDate: now,
    },
    {
      title: "Kiran AI — Intelligent Virtual Assistant",
      link: `${BASE_URL}/work/kiran-ai`,
      description:
        "Intelligent virtual assistant powered by custom-trained language models. Python, PyTorch, FastAPI, React, PostgreSQL.",
      pubDate: now,
    },
    {
      title: "Prism — Collaborative Analytics",
      link: `${BASE_URL}/work/prism`,
      description:
        "Collaborative analytics platform that turns raw data into actionable insights. Next.js, TypeScript, DuckDB, Tailwind CSS.",
      pubDate: now,
    },
  ];

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Shravan Deb</title>
    <link>${BASE_URL}</link>
    <description>AI/ML engineer and product builder. Projects, writing, and things I'm working on.</description>
    <language>en-us</language>
    <lastBuildDate>${now}</lastBuildDate>
    <atom:link href="${BASE_URL}/blog/rss" rel="self" type="application/rss+xml"/>
    ${items
      .map(
        (item) => `    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${item.link}</link>
      <description>${escapeXml(item.description)}</description>
      <pubDate>${item.pubDate}</pubDate>
      <guid isPermaLink="true">${item.link}</guid>
    </item>`
      )
      .join("\n")}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
