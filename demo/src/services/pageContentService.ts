import type { PageContent, PageMetadata } from "@sirel/page-builder";

export interface PageRecord {
  id?: string | number;
  slug?: string;
  content: PageContent;
  metadata?: PageMetadata;
}

export interface SavePageInput {
  id?: string | number;
  slug?: string;
  content: PageContent;
}

export interface PageServiceOptions {
  baseUrl?: string;
  headers?: Record<string, string>;
}

function getBaseUrl(options?: PageServiceOptions) {
  return options?.baseUrl ? options.baseUrl.replace(/\/$/, "") : "";
}

function unwrapResponse(data: unknown): Record<string, unknown> {
  if (typeof data !== "object" || data === null) return {};
  const obj = data as Record<string, unknown>;
  if (obj.data && typeof obj.data === "object" && obj.data !== null) return obj.data as Record<string, unknown>;
  if (obj.page && typeof obj.page === "object" && obj.page !== null) return obj.page as Record<string, unknown>;
  return obj;
}

function parseContent(raw: unknown): PageContent {
  if (!raw) return { blocks: [] };
  if (typeof raw === "object") return raw as PageContent;
  if (typeof raw === "string") {
    try {
      const parsed = JSON.parse(raw) as PageContent;
      return parsed?.blocks ? parsed : { blocks: [] };
    } catch {
      return { blocks: [] };
    }
  }
  return { blocks: [] };
}

function mapMetadata(record: Record<string, unknown>): PageMetadata {
  return {
    title: typeof record.title === "string" ? record.title : undefined,
    slug: typeof record.slug === "string" ? record.slug : undefined,
    status: record.status === "published" ? "published" : "draft",
    publicationDate: typeof record.publication_date === "string" ? record.publication_date : undefined,
    metaTitle: typeof record.meta_title === "string" ? record.meta_title : undefined,
    metaDescription: typeof record.meta_description === "string" ? record.meta_description : undefined,
    featuredImage: typeof record.featured_image === "string" ? record.featured_image : undefined,
  };
}

function buildPayload(input: SavePageInput) {
  const metadata = input.content.metadata ?? {};
  return {
    title: metadata.title,
    slug: input.slug ?? metadata.slug,
    status: metadata.status ?? "draft",
    publication_date: metadata.publicationDate,
    meta_title: metadata.metaTitle,
    meta_description: metadata.metaDescription,
    featured_image: metadata.featuredImage,
    content_type: "json",
    content: JSON.stringify({ blocks: input.content.blocks }),
  };
}

export function createPageContentService(options?: PageServiceOptions) {
  const baseUrl = getBaseUrl(options);
  const headers = {
    "Content-Type": "application/json",
    ...(options?.headers ?? {}),
  };

  return {
    async fetchPage(idOrSlug: string | number): Promise<PageRecord> {
      const response = await fetch(`${baseUrl}/api/admin/pages/${idOrSlug}`, { headers });
      if (!response.ok) {
        throw new Error(`Fetch page failed: ${response.status}`);
      }
      const data = unwrapResponse(await response.json());
      return {
        id: data.id as string | number | undefined,
        slug: typeof data.slug === "string" ? data.slug : undefined,
        content: parseContent(data.content),
        metadata: mapMetadata(data),
      };
    },
    async savePage(input: SavePageInput): Promise<PageRecord> {
      const payload = buildPayload(input);
      const hasId = typeof input.id === "string" || typeof input.id === "number";
      const url = hasId ? `${baseUrl}/api/admin/pages/${input.id}` : `${baseUrl}/api/admin/pages`;
      const method = hasId ? "PUT" : "POST";
      const response = await fetch(url, {
        method,
        headers,
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error(`Save page failed: ${response.status}`);
      }
      const data = unwrapResponse(await response.json());
      return {
        id: data.id as string | number | undefined,
        slug: typeof data.slug === "string" ? data.slug : undefined,
        content: parseContent(data.content ?? payload.content),
        metadata: mapMetadata(data),
      };
    },
  };
}
