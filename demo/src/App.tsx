import * as React from "react";
import {
  PageBuilder,
  type PageContent,
  type BuilderTheme,
} from "@sirel/page-builder";

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
  const theme: BuilderTheme = {
    fontFamily: "Manrope, system-ui, sans-serif",
    primaryColor: "#2563eb",
    secondaryColor: "#9333ea",
    backgroundColor: "#f8fafc",
  };

  return (
    <PageBuilder value={content} onChange={setContent} theme={theme} />
  );
}
