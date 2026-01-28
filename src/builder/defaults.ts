import type {
  Block,
  BlockType,
  ComposedBlock,
  CtaBlock,
  DividerBlock,
  FaqBlock,
  GalleryBlock,
  HeroBlock,
  IconListBlock,
  ImageBlock,
  SplitBlock,
  SpacerBlock,
  StatsBlock,
  TestimonialsBlock,
  TextBlock,
  TimelineBlock,
  VideoBlock,
} from "../types";

export function createId(prefix: string) {
  return `${prefix}_${Math.random().toString(36).slice(2, 8)}_${Date.now().toString(36)}`;
}

export function createBlock(type: BlockType): Block {
  switch (type) {
    case "hero":
      return {
        id: createId("hero"),
        type: "hero",
        variant: "split",
        title: "Faites de vos pages un vrai levier",
        subtitle: "Créez des pages dynamiques, rapides à publier et faciles à faire évoluer, sans toucher au code.",
        ctaText: "Découvrir l'éditeur",
        ctaLink: "/contact",
        imageUrl: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1200&q=80",
        imagePosition: "right",
        textAlignment: "start",
        contentAlign: "start",
        minHeight: 55,
        titleSize: 40,
        subtitleSize: 18,
        textColor: "#ffffff",
        backgroundType: "gradient",
        backgroundGradient: "linear-gradient(120deg, #0f172a, #2563eb)",
      } satisfies HeroBlock;
    case "text":
      return {
        id: createId("text"),
        type: "text",
        heading: "Un contenu clair et flexible",
        body: "Ajoutez, réorganisez et enrichissez vos sections sans friction, tout en gardant un rendu propre côté public.",
        alignment: "start",
      } satisfies TextBlock;
    case "stats":
      return {
        id: createId("stats"),
        type: "stats",
        heading: "Chiffres clés",
        description: "Une vue d'ensemble en un coup d'œil",
        columns: 3,
        cards: [
          { id: createId("stat"), label: "Équipes actives", value: "120" },
          { id: createId("stat"), label: "Projets livrés", value: "24" },
        ],
      } satisfies StatsBlock;
    case "image":
      return {
        id: createId("image"),
        type: "image",
        imageUrl: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=60",
        altText: "Bureau moderne avec écran",
        caption: "Un rendu propre et cohérent sur toutes les pages.",
      } satisfies ImageBlock;
    case "faq":
      return {
        id: createId("faq"),
        type: "faq",
        title: "FAQ",
        items: [
          { id: createId("faq"), question: "Comment fonctionne le Page Builder ?", answer: "Chaque page est assemblée à partir de blocs configurables." },
        ],
      } satisfies FaqBlock;
    case "split":
      return {
        id: createId("split"),
        type: "split",
        title: "Un visuel qui appuie votre message",
        text: "Associez une image à un texte impactant pour structurer vos sections clés.",
        ctaText: "Voir un exemple",
        ctaLink: "/exemple",
        imageUrl: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=900&q=60",
        imagePosition: "right",
      } satisfies SplitBlock;
    case "gallery":
      return {
        id: createId("gallery"),
        type: "gallery",
        title: "Galerie",
        images: [
          {
            id: createId("image"),
            url: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=600&q=60",
            caption: "Mise en avant produit",
          },
        ],
      } satisfies GalleryBlock;
    case "testimonials":
      return {
        id: createId("testimonials"),
        type: "testimonials",
        title: "Ils nous font confiance",
        items: [
          {
            id: createId("t"),
            name: "Alex Martin",
            role: "CEO",
            quote: "Le builder nous a permis de livrer plus vite, sans compromis sur le design.",
            photo: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=300&q=60",
          },
        ],
      } satisfies TestimonialsBlock;
    case "cta":
      return {
        id: createId("cta"),
        type: "cta",
        title: "Prêt à lancer votre prochaine page ?",
        text: "Créez, publiez et optimisez vos contenus en quelques minutes.",
        buttonText: "Parler à un expert",
        buttonLink: "/contact",
        style: "solid",
      } satisfies CtaBlock;
    case "iconList":
      return {
        id: createId("icon"),
        type: "iconList",
        title: "Points forts",
        items: [
          { id: createId("icon"), icon: "★", label: "Rapide", text: "Un rendu fluide et optimisé." },
          { id: createId("icon"), icon: "✓", label: "Flexible", text: "Des blocs configurables selon vos besoins." },
        ],
      } satisfies IconListBlock;
    case "timeline":
      return {
        id: createId("timeline"),
        type: "timeline",
        title: "Timeline",
        steps: [
          { id: createId("step"), title: "Brief & contenu", description: "Définir les objectifs et la structure." },
          { id: createId("step"), title: "Construction", description: "Assembler les blocs dans l'éditeur." },
          { id: createId("step"), title: "Publication", description: "Mettre en ligne et itérer." },
        ],
      } satisfies TimelineBlock;
    case "video":
      return {
        id: createId("video"),
        type: "video",
        title: "Vidéo de présentation",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        caption: "Découvrez le flux de création en moins d'une minute.",
      } satisfies VideoBlock;
    case "divider":
      return {
        id: createId("divider"),
        type: "divider",
        style: "solid",
        thickness: 1,
      } satisfies DividerBlock;
    case "spacer":
      return {
        id: createId("spacer"),
        type: "spacer",
        height: 32,
      } satisfies SpacerBlock;
    case "composed":
      return {
        id: createId("composed"),
        type: "composed",
        preset: "introCards",
        data: {
          preset: "introCards",
          title: "Une intro en cartes",
          intro: "Structurez l'information pour une lecture rapide.",
          cards: [
            { id: createId("card"), title: "Carte 1", text: "Un bénéfice clair et actionnable." },
            { id: createId("card"), title: "Carte 2", text: "Un détail différenciant qui rassure." },
          ],
        },
      } satisfies ComposedBlock;
    default:
      return {
        id: createId("block"),
        type: "text",
        heading: "Section title",
        body: "Write your content here.",
        alignment: "start",
      } satisfies TextBlock;
  }
}
