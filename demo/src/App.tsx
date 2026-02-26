import * as React from "react";
import {
  PageBuilder,
  type PageContent,
  type BuilderTheme,
} from "@sirel/page-builder";
import { createMockBackend } from "./services/mockBackend";

const initialContent: PageContent = {
  blocks: [
    {
      id: "hero-1",
      type: "hero",
      title: "Page Builder",
      subtitle: "Cree et edite ta page directement",
      ctaText: "Commencer",
      ctaLink: "/start",
      backgroundType: "gradient",
      backgroundGradient: "linear-gradient(120deg, #0f172a, #2563eb)",
      textColor: "#ffffff",
      stats: [
        { id: "stat-1", label: "Blocks", value: "15" },
        { id: "stat-2", label: "Temps", value: "< 1h" },
      ],
    },
    {
      id: "text-1",
      type: "text",
      heading: "Interface builder",
      body: "Selectionne un bloc, modifie les champs, visualise en direct.",
      alignment: "center",
    },
  ],
};

export function App() {
  const [content, setContent] = React.useState<PageContent>(initialContent);
  const [mode, setMode] = React.useState<"edit" | "view">("edit");
  const [pageId, setPageId] = React.useState<string | number | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [saving, setSaving] = React.useState(false);
  const [publishing, setPublishing] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const theme: BuilderTheme = {
    fontFamily: "Manrope, system-ui, sans-serif",
    primaryColor: "#2563eb",
    secondaryColor: "#9333ea",
    backgroundColor: "#0f172a",
    cardColor: "#1e293b",
    textColor: "#f1f5f9",
    textMutedColor: "#94a3b8",
    borderColor: "#334155",
    inputColor: "#1e293b",
  };

  const backend = React.useMemo(() => createMockBackend(), []);

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const idOrSlug = params.get("id") ?? params.get("slug");
    if (!idOrSlug) return;

    let isMounted = true;
    setLoading(true);
    setError(null);

    backend
      .fetchPage(idOrSlug)
      .then((record) => {
        if (!isMounted) return;
        setContent({ ...record.content, metadata: record.metadata });
        setPageId(record.id ?? idOrSlug);
      })
      .catch(() => {
        if (!isMounted) return;
        setError("Impossible de charger la page depuis l'API.");
      })
      .finally(() => {
        if (!isMounted) return;
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [backend]);

  const handleSave = async (nextContent: PageContent) => {
    setSaving(true);
    setError(null);
    try {
      const saved = await backend.savePage(nextContent, pageId ? String(pageId) : undefined);
      setPageId(saved.id ?? pageId);
      if (saved.metadata) {
        setContent({ ...nextContent, metadata: saved.metadata });
      }
    } catch {
      setError("Enregistrement echoue.");
    } finally {
      setSaving(false);
    }
  };

  const handlePublish = async (nextContent: PageContent) => {
    const publishContent: PageContent = {
      ...nextContent,
      metadata: { ...nextContent.metadata, status: "published" },
    };

    setPublishing(true);
    setError(null);
    setContent(publishContent);

    try {
      const saved = await backend.savePage(publishContent, pageId ? String(pageId) : undefined);
      setPageId(saved.id ?? pageId);
      if (saved.metadata) {
        setContent({ ...publishContent, metadata: saved.metadata });
      }
    } catch {
      setError("Publication echouee.");
    } finally {
      setPublishing(false);
    }
  };

  return (
    <div style={{ display: "grid", gap: "1rem", background: "#0f172a", minHeight: "100vh" }}>
      <div
        className="demo-header"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0.75rem 1rem",
          borderRadius: 12,
          border: "1px solid #334155",
          background: "#1e293b",
        }}
      >
        <strong style={{ fontFamily: "inherit", color: "#f1f5f9" }}>Demo Page Builder</strong>
        <div style={{ display: "flex", gap: 8 }}>
          <button
            type="button"
            onClick={() => setMode("view")}
            style={{
              borderRadius: 8,
              border: "1px solid #334155",
              background: mode === "view" ? "#2563eb" : "#1e293b",
              color: mode === "view" ? "#fff" : "#f1f5f9",
              padding: "0.4rem 0.75rem",
              cursor: "pointer",
            }}
          >
            Apercu
          </button>
          <button
            type="button"
            onClick={() => setMode("edit")}
            style={{
              borderRadius: 8,
              border: "1px solid #334155",
              background: mode === "edit" ? "#2563eb" : "#1e293b",
              color: mode === "edit" ? "#fff" : "#f1f5f9",
              padding: "0.4rem 0.75rem",
              cursor: "pointer",
            }}
          >
            Edition
          </button>
        </div>
      </div>

      {error && (
        <div style={{ padding: "0.75rem 1rem", borderRadius: 10, background: "#fee2e2", color: "#991b1b" }}>
          {error}
        </div>
      )}

      {loading ? (
        <div style={{ padding: "2rem", textAlign: "center", color: "#f1f5f9" }}>Chargement...</div>
      ) : (
        <PageBuilder
          value={content}
          onChange={setContent}
          theme={theme}
          mode={mode}
          onSave={handleSave}
          onPublish={handlePublish}
          saving={saving}
          publishing={publishing}
          onImageUpload={backend.uploadImage}
        />
      )}
    </div>
  );
}
