import type { PageContent, PageMetadata } from "@sirel/page-builder";

export interface PageRecord {
  id: string;
  slug: string;
  content: PageContent;
  metadata?: PageMetadata;
}

const STORAGE_KEY = "pb-demo-pages";

function loadStore(): Record<string, PageRecord> {
  if (typeof window === "undefined") return {};
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return {};
  try {
    return JSON.parse(raw) as Record<string, PageRecord>;
  } catch {
    return {};
  }
}

function persistStore(store: Record<string, PageRecord>) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
}

function slugify(value?: string) {
  return (
    value
      ?.toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") || `page-${Date.now()}`
  );
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function createMockBackend() {
  return {
    async fetchPage(idOrSlug: string): Promise<PageRecord> {
      await delay(250);
      const store = loadStore();
      const direct = store[idOrSlug];
      if (direct) return direct;
      const bySlug = Object.values(store).find((page) => page.slug === idOrSlug);
      if (!bySlug) throw new Error("Not found");
      return bySlug;
    },
    async savePage(content: PageContent, id?: string): Promise<PageRecord> {
      await delay(350);
      const store = loadStore();
      const metadata = content.metadata ?? {};
      const pageId = id ?? `page-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
      const slug = metadata.slug ?? slugify(metadata.title);
      const record: PageRecord = {
        id: pageId,
        slug,
        content,
        metadata,
      };
      store[pageId] = record;
      persistStore(store);
      return record;
    },
    async uploadImage(file: File): Promise<string> {
      await delay(400);
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onerror = () => reject(new Error("Upload failed"));
        reader.onload = () => resolve(String(reader.result ?? ""));
        reader.readAsDataURL(file);
      });
    },
  };
}
