/** Docs pages, grouped as the sidebar shows them. Their order is also the Previous/Next order. */
export const groups = [
  {
    title: "Get started",
    pages: [
      { id: "introduction", title: "Introduction" },
      { id: "quickstart", title: "Quickstart" },
      { id: "before-you-start", title: "Before you start" },
    ],
  },
  {
    title: "Setup",
    pages: [
      { id: "provision", title: "Provision" },
      { id: "read-node", title: "Your read node" },
      { id: "client", title: "Your client" },
    ],
  },
  {
    title: "Run it",
    pages: [
      { id: "operating", title: "Operating your node" },
      { id: "clean-up", title: "Clean up" },
    ],
  },
  {
    title: "Reference",
    pages: [
      { id: "api", title: "API" },
      { id: "troubleshooting", title: "Troubleshooting" },
      { id: "what-went-wrong", title: "What went wrong" },
    ],
  },
];

export type DocPage = { id: string; title: string; group: string; href: string };

/** The introduction lives at /docs; every other page at /docs/<id>. */
export const pages: DocPage[] = groups.flatMap((g) =>
  g.pages.map((p) => ({ ...p, group: g.title, href: p.id === "introduction" ? "/docs" : `/docs/${p.id}` })),
);

export const pageById = (id: string) => pages.find((p) => p.id === id);

/** <title> for a docs page, from its sidebar title. */
export const docsMetadata = (id: string) => ({ title: `${pageById(id)?.title} · Castyard docs` });
