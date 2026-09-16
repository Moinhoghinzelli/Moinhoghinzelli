import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const rotas: { path: string; priority: number }[] = [
    { path: "", priority: 1 },
    { path: "/sobre", priority: 0.8 },
    { path: "/atracoes", priority: 0.8 },
    { path: "/ingressos", priority: 0.9 },
    { path: "/contato", priority: 0.6 },
  ];

  return rotas.map(({ path, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority,
  }));
}
