import * as React from "react";
import type {
  Block,
  BlockType,
  CtaBlock,
  DividerBlock,
  FaqBlock,
  GalleryBlock,
  HeroBlock,
  IconListBlock,
  ImageBlock,
  PageContent,
  PageMetadata,
  SplitBlock,
  SpacerBlock,
  StatsBlock,
  TestimonialsBlock,
  TextBlock,
  TimelineBlock,
  VideoBlock,
} from "../types";
import { PageBuilderRenderer } from "../renderer";
import { createBlock, createId } from "./defaults";
import type { BuilderTheme, PageBuilderProps } from "./types";
import { BlockIcon } from "./icons";

const DEFAULT_BLOCKS: BlockType[] = [
  "hero",
  "text",
  "stats",
  "image",
  "faq",
  "split",
  "gallery",
  "testimonials",
  "cta",
  "iconList",
  "timeline",
  "video",
  "divider",
  "spacer",
];

const BLOCK_LABELS: Record<BlockType, string> = {
  hero: "Hero",
  text: "Texte",
  stats: "Statistiques",
  image: "Image",
  faq: "FAQ",
  split: "Split",
  gallery: "Galerie",
  testimonials: "Témoignages",
  cta: "Appel à action",
  iconList: "Icônes",
  timeline: "Timeline",
  video: "Vidéo",
  divider: "Séparateur",
  spacer: "Espace",
  composed: "Composed",
};

function useBuilderState(value?: PageContent) {
  const [blocks, setBlocks] = React.useState<Block[]>(value?.blocks ?? []);
  const [selectedId, setSelectedId] = React.useState<string | null>(
    value?.blocks?.[0]?.id ?? null
  );

  React.useEffect(() => {
    if (value?.blocks) {
      setBlocks(value.blocks);
      if (value.blocks.length === 0) {
        setSelectedId(null);
      } else if (!value.blocks.find((block) => block.id === selectedId)) {
        setSelectedId(value.blocks[0]?.id ?? null);
      }
    }
  }, [value]);

  return { blocks, setBlocks, selectedId, setSelectedId };
}

function applyTheme(theme?: BuilderTheme): React.CSSProperties {
  const style: React.CSSProperties = {
    fontFamily: theme?.fontFamily ?? "Manrope, system-ui, sans-serif",
    backgroundColor: theme?.backgroundColor ?? "#f8fafc",
  };

  (style as Record<string, string | number>)['--pb-primary'] = theme?.primaryColor ?? "#2563eb";
  (style as Record<string, string | number>)['--pb-secondary'] = theme?.secondaryColor ?? "#9333ea";

  return style;
}

function arrayMove<T>(list: T[], from: number, to: number) {
  const copy = [...list];
  const [item] = copy.splice(from, 1);
  if (!item) return list;
  copy.splice(to, 0, item);
  return copy;
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <label style={{ fontSize: 13, fontWeight: 600, color: "#0f172a", fontFamily: "inherit" }}>{children}</label>;
}

function LanguageTabs({
  activeLang,
  onChange,
}: {
  activeLang: string;
  onChange: (lang: string) => void;
}) {
  const languages = [
    { code: "fr", label: "Français" },
    { code: "shi", label: "Shimaore" },
    { code: "buc", label: "Shibushi" },
  ];

  return (
    <div style={{ display: "flex", gap: 4, marginBottom: 8 }}>
      {languages.map((lang) => (
        <button
          key={lang.code}
          type="button"
          onClick={() => onChange(lang.code)}
          style={{
            padding: "0.25rem 0.5rem",
            borderRadius: 6,
            border: "none",
            background: activeLang === lang.code ? "#f1f5f9" : "transparent",
            color: activeLang === lang.code ? "#0f172a" : "#64748b",
            cursor: "pointer",
            fontSize: 12,
            fontWeight: activeLang === lang.code ? 600 : 400,
          }}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
}

function MultilingualTextField({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  const [activeLang, setActiveLang] = React.useState("fr");
  return (
    <div style={{ display: "grid", gap: 6 }}>
      <FieldLabel>{label}</FieldLabel>
      <LanguageTabs activeLang={activeLang} onChange={setActiveLang} />
      <input
        value={value ?? ""}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        style={inputStyle}
      />
    </div>
  );
}

function TextField({
  label,
  value,
  onChange,
  placeholder,
  multilingual,
}: {
  label: string;
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  multilingual?: boolean;
}) {
  const [focused, setFocused] = React.useState(false);
  
  if (multilingual) {
    return <MultilingualTextField label={label} value={value} onChange={onChange} placeholder={placeholder} />;
  }

  return (
    <div style={{ display: "grid", gap: 6, minWidth: 0 }}>
      <FieldLabel>{label}</FieldLabel>
      <input
        value={value ?? ""}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        style={focused ? inputStyleFocus : inputStyle}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </div>
  );
}

function TextAreaField({
  label,
  value,
  onChange,
  rows = 3,
  multilingual,
  placeholder,
}: {
  label: string;
  value?: string;
  onChange: (value: string) => void;
  rows?: number;
  multilingual?: boolean;
  placeholder?: string;
}) {
  const [focused, setFocused] = React.useState(false);
  const [activeLang, setActiveLang] = React.useState("fr");

  return (
    <div style={{ display: "grid", gap: 6, minWidth: 0 }}>
      <FieldLabel>{label}</FieldLabel>
      {multilingual && <LanguageTabs activeLang={activeLang} onChange={setActiveLang} />}
      <textarea
        value={value ?? ""}
        onChange={(event) => onChange(event.target.value)}
        rows={rows}
        placeholder={placeholder}
        style={{
          ...(focused ? inputStyleFocus : inputStyle),
          resize: "vertical",
          fontFamily: "inherit",
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </div>
  );
}

function NumberField({
  label,
  value,
  onChange,
  min,
  max,
}: {
  label: string;
  value?: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}) {
  return (
    <div style={{ display: "grid", gap: 6 }}>
      <FieldLabel>{label}</FieldLabel>
      <input
        type="number"
        value={value ?? 0}
        onChange={(event) => onChange(Number(event.target.value))}
        min={min}
        max={max}
        style={inputStyle}
      />
    </div>
  );
}

function SelectField({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value?: string;
  options: Array<{ value: string; label: string }>;
  onChange: (value: string) => void;
}) {
  const [focused, setFocused] = React.useState(false);
  return (
    <div style={{ display: "grid", gap: 6 }}>
      <FieldLabel>{label}</FieldLabel>
      <select
        value={value ?? ""}
        onChange={(event) => onChange(event.target.value)}
        style={focused ? inputStyleFocus : inputStyle}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function ColorField({
  label,
  value,
  onChange,
}: {
  label: string;
  value?: string;
  onChange: (value: string) => void;
}) {
  return (
    <div style={{ display: "grid", gap: 6 }}>
      <FieldLabel>{label}</FieldLabel>
      <input
        type="color"
        value={value ?? "#000000"}
        onChange={(event) => onChange(event.target.value)}
        style={{ height: 36, width: 64, borderRadius: 8, border: "1px solid #e2e8f0" }}
      />
    </div>
  );
}

function ImageUploadField({
  label,
  value,
  onChange,
  onUpload,
}: {
  label: string;
  value?: string;
  onChange: (value: string) => void;
  onUpload?: (file: File) => Promise<string>;
}) {
  const [preview, setPreview] = React.useState<string | null>(value ?? null);
  const [uploading, setUploading] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (value) {
      setPreview(value);
    }
  }, [value]);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Veuillez sélectionner un fichier image");
      return;
    }

    // Si une fonction d'upload est fournie, l'utiliser
    if (onUpload) {
      setUploading(true);
      try {
        const url = await onUpload(file);
        onChange(url);
        setPreview(url);
      } catch (error) {
        alert("Erreur lors de l'upload de l'image");
        console.error(error);
      } finally {
        setUploading(false);
      }
    } else {
      // Sinon, convertir en base64 pour le développement
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        onChange(base64);
        setPreview(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemove = () => {
    onChange("");
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div style={{ display: "grid", gap: 8 }}>
      <FieldLabel>{label}</FieldLabel>
      
      {preview && (
        <div style={{ position: "relative", width: "100%" }}>
          <img
            src={preview}
            alt="Aperçu"
            style={{
              width: "100%",
              maxHeight: 200,
              objectFit: "contain",
              borderRadius: 8,
              border: "1px solid #e2e8f0",
            }}
          />
          <button
            type="button"
            onClick={handleRemove}
            style={{
              position: "absolute",
              top: 8,
              right: 8,
              padding: "0.25rem 0.5rem",
              borderRadius: 6,
              border: "none",
              background: "rgba(0, 0, 0, 0.7)",
              color: "#fff",
              cursor: "pointer",
              fontSize: 12,
            }}
          >
            ✕ Supprimer
          </button>
        </div>
      )}

      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          disabled={uploading}
          style={{ display: "none" }}
          id={`image-upload-${label}`}
        />
        <label
          htmlFor={`image-upload-${label}`}
          style={{
            padding: "0.5rem 1rem",
            borderRadius: 8,
            border: "1px solid #e2e8f0",
            background: uploading ? "#f1f5f9" : "#fff",
            cursor: uploading ? "not-allowed" : "pointer",
            fontSize: 14,
            fontWeight: 500,
            display: "inline-block",
            color: uploading ? "#94a3b8" : "#0f172a",
          }}
        >
          {uploading ? "Upload en cours..." : preview ? "Changer l'image" : "Choisir une image"}
        </label>
      </div>

      <div style={{ display: "grid", gap: 6 }}>
        <label style={{ fontSize: 12, color: "#64748b" }}>Ou entrer une URL</label>
        <input
          type="text"
          value={value ?? ""}
          onChange={(e) => {
            onChange(e.target.value);
            setPreview(e.target.value || null);
          }}
          placeholder="https://images.example.com/hero.jpg"
          style={inputStyle}
        />
      </div>
    </div>
  );
}

function GradientField({
  label,
  value,
  onChange,
}: {
  label: string;
  value?: string;
  onChange: (value: string) => void;
}) {
  // Parser le gradient existant pour extraire les couleurs et la direction
  const parseGradient = (gradient?: string) => {
    if (!gradient) {
      return { color1: "#0f172a", color2: "#2563eb", direction: "120deg" };
    }
    
    // Pattern: linear-gradient(120deg, #0f172a, #2563eb)
    const match = gradient.match(/linear-gradient\((\d+)deg,\s*(#[0-9a-fA-F]{6}|#[0-9a-fA-F]{3}|rgb\([^)]+\)|rgba\([^)]+\)),\s*(#[0-9a-fA-F]{6}|#[0-9a-fA-F]{3}|rgb\([^)]+\)|rgba\([^)]+\))\)/);
    if (match) {
      return {
        direction: `${match[1]}deg`,
        color1: match[2],
        color2: match[3],
      };
    }
    
    return { color1: "#0f172a", color2: "#2563eb", direction: "120deg" };
  };

  const [gradientState, setGradientState] = React.useState(() => parseGradient(value));

  React.useEffect(() => {
    setGradientState(parseGradient(value));
  }, [value]);

  const updateGradient = (updates: Partial<typeof gradientState>) => {
    const newState = { ...gradientState, ...updates };
    setGradientState(newState);
    const direction = newState.direction.replace("deg", "");
    onChange(`linear-gradient(${direction}deg, ${newState.color1}, ${newState.color2})`);
  };

  return (
    <div style={{ display: "grid", gap: 8 }}>
      <FieldLabel>{label}</FieldLabel>
      <div style={{ display: "grid", gap: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ display: "grid", gap: 4 }}>
            <label style={{ fontSize: 12, color: "#64748b" }}>Couleur 1</label>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <input
                type="color"
                value={gradientState.color1}
                onChange={(e) => updateGradient({ color1: e.target.value })}
                style={{ height: 40, width: 60, borderRadius: 8, border: "1px solid #e2e8f0", cursor: "pointer" }}
              />
              <div
                style={{
                  flex: 1,
                  height: 40,
                  borderRadius: 8,
                  background: gradientState.color1,
                  border: "1px solid #e2e8f0",
                }}
              />
            </div>
          </div>
          <div style={{ display: "grid", gap: 4 }}>
            <label style={{ fontSize: 12, color: "#64748b" }}>Couleur 2</label>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <input
                type="color"
                value={gradientState.color2}
                onChange={(e) => updateGradient({ color2: e.target.value })}
                style={{ height: 40, width: 60, borderRadius: 8, border: "1px solid #e2e8f0", cursor: "pointer" }}
              />
              <div
                style={{
                  flex: 1,
                  height: 40,
                  borderRadius: 8,
                  background: gradientState.color2,
                  border: "1px solid #e2e8f0",
                }}
              />
            </div>
          </div>
        </div>
        <div style={{ display: "grid", gap: 6 }}>
          <label style={{ fontSize: 12, color: "#64748b" }}>Direction</label>
          <SelectField
            label=""
            value={gradientState.direction}
            options={[
              { value: "0deg", label: "→ Droite" },
              { value: "45deg", label: "↗ Diagonale (haut-droite)" },
              { value: "90deg", label: "↑ Haut" },
              { value: "135deg", label: "↖ Diagonale (haut-gauche)" },
              { value: "180deg", label: "← Gauche" },
              { value: "225deg", label: "↙ Diagonale (bas-gauche)" },
              { value: "270deg", label: "↓ Bas" },
              { value: "315deg", label: "↘ Diagonale (bas-droite)" },
              { value: "120deg", label: "↗ Diagonale (défaut)" },
            ]}
            onChange={(value) => updateGradient({ direction: value })}
          />
        </div>
        <div
          style={{
            height: 60,
            borderRadius: 8,
            background: `linear-gradient(${gradientState.direction}, ${gradientState.color1}, ${gradientState.color2})`,
            border: "1px solid #e2e8f0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 12,
            color: "#64748b",
          }}
        >
          Aperçu du gradient
        </div>
      </div>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  padding: "0.6rem 0.75rem",
  borderRadius: 8,
  border: "1px solid #e2e8f0",
  fontSize: 14,
  background: "#fff",
  color: "#0f172a",
  width: "100%",
  maxWidth: "100%",
  boxSizing: "border-box",
  transition: "border-color 0.2s",
  fontFamily: "inherit",
};

const inputStyleFocus: React.CSSProperties = {
  ...inputStyle,
  outline: "none",
  borderColor: "var(--pb-primary)",
  boxShadow: "0 0 0 3px color-mix(in srgb, var(--pb-primary) 10%, transparent)",
};

const panelStyle: React.CSSProperties = {
  background: "#ffffff",
  border: "1px solid #e2e8f0",
  borderRadius: 12,
  padding: "1rem",
  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
};

const actionButton: React.CSSProperties = {
  borderRadius: 8,
  border: "1px solid #e2e8f0",
  padding: "0.4rem 0.6rem",
  background: "#fff",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 14,
  transition: "all 0.2s",
  fontFamily: "inherit",
};

const iconButton: React.CSSProperties = {
  ...actionButton,
  padding: "0.35rem",
  width: 28,
  height: 28,
  border: "none",
  background: "transparent",
  color: "#64748b",
};

function blockCard(isActive: boolean): React.CSSProperties {
  return {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "0.75rem",
    borderRadius: 10,
    border: isActive ? "2px solid var(--pb-primary)" : "1px solid #e2e8f0",
    background: "#fff",
    cursor: "pointer",
    position: "relative",
    outline: isActive ? "none" : undefined,
    boxShadow: isActive ? "0 0 0 3px color-mix(in srgb, var(--pb-primary) 8%, transparent)" : "none",
    transition: "all 0.2s",
  };
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h3 style={{ margin: 0, fontSize: 14, fontWeight: 600, color: "#0f172a", fontFamily: "inherit" }}>{children}</h3>;
}

function DragHandle() {
  return (
    <div style={{ cursor: "grab", display: "flex", gap: 2, padding: "0.25rem" }}>
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <circle cx="2" cy="2" r="1" fill="#94a3b8" />
        <circle cx="6" cy="2" r="1" fill="#94a3b8" />
        <circle cx="10" cy="2" r="1" fill="#94a3b8" />
        <circle cx="2" cy="6" r="1" fill="#94a3b8" />
        <circle cx="6" cy="6" r="1" fill="#94a3b8" />
        <circle cx="10" cy="6" r="1" fill="#94a3b8" />
        <circle cx="2" cy="10" r="1" fill="#94a3b8" />
        <circle cx="6" cy="10" r="1" fill="#94a3b8" />
        <circle cx="10" cy="10" r="1" fill="#94a3b8" />
      </svg>
    </div>
  );
}

function EyeIcon({ visible }: { visible: boolean }) {
  if (visible) {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    );
  }
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

function BlockEditor({
  block,
  onChange,
  onImageUpload,
}: {
  block: Block;
  onChange: (updated: Block) => void;
  onImageUpload?: (file: File) => Promise<string>;
}) {
  const update = (patch: Partial<Block>) => onChange({ ...block, ...patch } as Block);

  const renderCommon = () => (
    <div style={{ display: "grid", gap: 12 }}>
      <SelectField
        label="Background"
        value={block.backgroundType ?? "solid"}
        options={[
          { value: "solid", label: "Couleur" },
          { value: "gradient", label: "Gradient" },
          { value: "image", label: "Image" },
        ]}
        onChange={(value) => update({ backgroundType: value as Block["backgroundType"] })}
      />
      {block.backgroundType === "solid" && (
        <ColorField
          label="Couleur"
          value={block.backgroundColor}
          onChange={(value) => update({ backgroundColor: value })}
        />
      )}
      {block.backgroundType === "gradient" && (
        <GradientField
          label="Gradient"
          value={block.backgroundGradient}
          onChange={(value) => update({ backgroundGradient: value })}
        />
      )}
      {block.backgroundType === "image" && (
        <ImageUploadField
          label="Image de fond"
          value={block.backgroundImage}
          onChange={(value) => update({ backgroundImage: value })}
          onUpload={onImageUpload}
        />
      )}
      <ColorField
        label="Couleur du texte"
        value={block.textColor}
        onChange={(value) => update({ textColor: value })}
      />
    </div>
  );

  switch (block.type) {
    case "hero": {
      const hero = block as HeroBlock;
      const moveSlide = (from: number, to: number) => {
        if (from < 0 || to < 0 || from >= (hero.slides?.length ?? 0) || to >= (hero.slides?.length ?? 0)) return;
        const next = arrayMove(hero.slides ?? [], from, to);
        update({ slides: next });
      };
      const removeSlide = (id: string) => {
        update({ slides: (hero.slides ?? []).filter((s) => s.id !== id) });
      };
      return (
        <div style={{ display: "grid", gap: 16 }}>
          <SelectField
            label="Variant"
            value={hero.variant ?? "simple"}
            options={[
              { value: "simple", label: "Simple" },
              { value: "split", label: "Split" },
              { value: "cover", label: "Cover" },
              { value: "video", label: "Video" },
              { value: "stats", label: "Stats" },
              { value: "carousel", label: "Carousel" },
            ]}
            onChange={(value) => update({ variant: value as HeroBlock["variant"] })}
          />
          <TextField
            label="Titre"
            value={hero.title}
            onChange={(value) => update({ title: value })}
            placeholder="Un titre clair et impactant"
          />
          <TextAreaField
            label="Sous-titre"
            value={hero.subtitle}
            onChange={(value) => update({ subtitle: value })}
            placeholder="Expliquez votre proposition de valeur en une ou deux phrases."
          />
          <SelectField
            label="Alignement du texte"
            value={hero.textAlignment ?? "start"}
            options={[
              { value: "start", label: "Début (gauche)" },
              { value: "center", label: "Centre" },
              { value: "end", label: "Fin (droite)" },
            ]}
            onChange={(value) => update({ textAlignment: value as HeroBlock["textAlignment"] })}
          />
          <SelectField
            label="Position du bloc texte"
            value={hero.contentAlign ?? "start"}
            options={[
              { value: "start", label: "Gauche" },
              { value: "center", label: "Centre" },
              { value: "end", label: "Droite" },
            ]}
            onChange={(value) => update({ contentAlign: value as HeroBlock["contentAlign"] })}
          />
          <NumberField
            label="Hauteur du hero (vh)"
            value={hero.minHeight ?? 55}
            onChange={(value) => update({ minHeight: value })}
            min={30}
            max={100}
          />
          <NumberField
            label="Taille du titre (px)"
            value={hero.titleSize ?? 42}
            onChange={(value) => update({ titleSize: value })}
            min={24}
            max={90}
          />
          <NumberField
            label="Taille du sous-titre (px)"
            value={hero.subtitleSize ?? 18}
            onChange={(value) => update({ subtitleSize: value })}
            min={12}
            max={40}
          />
          <TextField
            label="CTA"
            value={hero.ctaText}
            onChange={(value) => update({ ctaText: value })}
            placeholder="Découvrir"
          />
          <TextField
            label="Lien"
            value={hero.ctaLink}
            onChange={(value) => update({ ctaLink: value })}
            placeholder="/contact"
          />
          {(hero.variant === "split" || hero.variant === "cover" || hero.variant === "simple") && (
            <>
              <ImageUploadField
                label="Image"
                value={hero.imageUrl}
                onChange={(value) => update({ imageUrl: value })}
                onUpload={onImageUpload}
              />
              {hero.variant === "split" && (
                <SelectField
                  label="Position image"
                  value={hero.imagePosition ?? "left"}
                  options={[
                    { value: "left", label: "Gauche" },
                    { value: "right", label: "Droite" },
                  ]}
                  onChange={(value) => update({ imagePosition: value as HeroBlock["imagePosition"] })}
                />
              )}
            </>
          )}
          {(hero.variant === "video" || hero.variant === "cover") && (
            <TextField
              label="URL Vidéo"
              value={hero.videoUrl}
              onChange={(value) => update({ videoUrl: value })}
              placeholder="https://www.youtube.com/embed/..."
            />
          )}
          {hero.variant === "stats" && (
            <div style={{ display: "grid", gap: 8 }}>
              <SectionTitle>Stats</SectionTitle>
              {hero.stats && hero.stats.length > 0 && (
                <div style={{ display: "grid", gap: 8 }}>
                  {hero.stats.map((stat, index) => (
                <div key={stat.id} style={{ display: "grid", gap: 6 }}>
                  <TextField
                    label="Label"
                    value={stat.label}
                    onChange={(value) => {
                      const next = [...hero.stats!];
                      next[index] = { ...stat, label: value };
                      update({ stats: next });
                    }}
                    placeholder="Clients actifs"
                  />
                  <TextField
                    label="Valeur"
                    value={stat.value}
                    onChange={(value) => {
                      const next = [...hero.stats!];
                      next[index] = { ...stat, value };
                      update({ stats: next });
                    }}
                    placeholder="120"
                  />
                  </div>
                ))}
                </div>
              )}
              <button
                type="button"
                style={{
                  ...actionButton,
                  padding: "0.5rem 0.75rem",
                  fontSize: 13,
                  fontWeight: 500,
                  borderStyle: "dashed",
                  borderColor: "#cbd5e1",
                  background: "#f8fafc",
                  color: "#64748b",
                }}
                onClick={() =>
                  update({
                    stats: [...(hero.stats ?? []), { id: createId("stat"), label: "Label", value: "0" }],
                  })
                }
              >
                + Ajouter une stat
              </button>
            </div>
          )}
          {hero.variant === "carousel" && (
            <div style={{ display: "grid", gap: 8 }}>
              <SectionTitle>Slides</SectionTitle>
              {hero.slides && hero.slides.length > 0 && (
                <div style={{ display: "grid", gap: 8 }}>
                  {hero.slides.map((slide, index) => (
                    <div
                      key={slide.id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        padding: "0.75rem",
                        borderRadius: 8,
                        border: "1px solid #e2e8f0",
                        background: "#f8fafc",
                      }}
                    >
                      <DragHandle />
                      <div style={{ flex: 1, display: "grid", gap: 6 }}>
                        <TextField
                          label=""
                          value={slide.title ?? ""}
                          onChange={(value) => {
                            const next = [...(hero.slides ?? [])];
                            next[index] = { ...slide, title: value };
                            update({ slides: next });
                          }}
                          placeholder="Titre"
                        />
                        <TextField
                          label=""
                          value={slide.subtitle ?? ""}
                          onChange={(value) => {
                            const next = [...(hero.slides ?? [])];
                            next[index] = { ...slide, subtitle: value };
                            update({ slides: next });
                          }}
                          placeholder="Sous-titre"
                        />
                        <ImageUploadField
                          label=""
                          value={slide.imageUrl ?? ""}
                          onChange={(value) => {
                            const next = [...(hero.slides ?? [])];
                            next[index] = { ...slide, imageUrl: value };
                            update({ slides: next });
                          }}
                          onUpload={onImageUpload}
                        />
                        <TextField
                          label=""
                          value={slide.ctaText ?? ""}
                          onChange={(value) => {
                            const next = [...(hero.slides ?? [])];
                            next[index] = { ...slide, ctaText: value };
                            update({ slides: next });
                          }}
                          placeholder="Texte CTA"
                        />
                        <TextField
                          label=""
                          value={slide.ctaLink ?? ""}
                          onChange={(value) => {
                            const next = [...(hero.slides ?? [])];
                            next[index] = { ...slide, ctaLink: value };
                            update({ slides: next });
                          }}
                          placeholder="Lien CTA"
                        />
                      </div>
                      <div style={{ display: "flex", gap: 4, flexDirection: "column" }}>
                        <button
                          type="button"
                          style={iconButton}
                          onClick={() => moveSlide(index, index - 1)}
                          disabled={index === 0}
                          title="Déplacer vers le haut"
                        >
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 15l-6-6-6 6" />
                          </svg>
                        </button>
                        <button
                          type="button"
                          style={iconButton}
                          onClick={() => moveSlide(index, index + 1)}
                          disabled={index === (hero.slides?.length ?? 0) - 1}
                          title="Déplacer vers le bas"
                        >
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M6 9l6 6 6-6" />
                          </svg>
                        </button>
                        <button
                          type="button"
                          style={iconButton}
                          onClick={() => removeSlide(slide.id)}
                          title="Supprimer"
                        >
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <button
                type="button"
                style={{
                  ...actionButton,
                  padding: "0.5rem 0.75rem",
                  fontSize: 13,
                  fontWeight: 500,
                  borderStyle: "dashed",
                  borderColor: "#cbd5e1",
                  background: "#f8fafc",
                  color: "#64748b",
                }}
                onClick={() =>
                  update({
                    slides: [
                      ...(hero.slides ?? []),
                      { id: createId("slide"), title: "", subtitle: "", imageUrl: "", ctaText: "", ctaLink: "" },
                    ],
                  })
                }
              >
                + Ajouter un slide
              </button>
            </div>
          )}
          {renderCommon()}
        </div>
      );
    }
    case "text": {
      const text = block as TextBlock;
      return (
        <div style={{ display: "grid", gap: 16 }}>
          <TextField
            label="Titre"
            value={text.heading}
            onChange={(value) => update({ heading: value })}
            placeholder="Un titre pour cette section"
          />
          <TextAreaField
            label="Texte"
            value={text.body}
            onChange={(value) => update({ body: value })}
            placeholder="Présentez votre message en quelques lignes."
          />
          <SelectField
            label="Alignement"
            value={text.alignment ?? "start"}
            options={[
              { value: "start", label: "Gauche" },
              { value: "center", label: "Centre" },
              { value: "end", label: "Droite" },
            ]}
            onChange={(value) => update({ alignment: value as TextBlock["alignment"] })}
          />
          {renderCommon()}
        </div>
      );
    }
    case "stats": {
      const stats = block as StatsBlock;
      const moveCard = (from: number, to: number) => {
        if (from < 0 || to < 0 || from >= (stats.cards?.length ?? 0) || to >= (stats.cards?.length ?? 0)) return;
        const next = arrayMove(stats.cards ?? [], from, to);
        update({ cards: next });
      };
      const removeCard = (id: string) => {
        update({ cards: (stats.cards ?? []).filter((c) => c.id !== id) });
      };
      return (
        <div style={{ display: "grid", gap: 16 }}>
          <TextField
            label="Titre de la section"
            value={stats.heading}
            onChange={(value) => update({ heading: value })}
            multilingual
            placeholder="Chiffres clés"
          />
          <TextAreaField
            label="Sous-titre"
            value={stats.description}
            onChange={(value) => update({ description: value })}
            multilingual
            placeholder="Une courte phrase pour contextualiser les statistiques."
          />
          <SelectField
            label="Nombre de colonnes"
            value={String(stats.columns ?? 3)}
            options={[
              { value: "1", label: "1 colonne" },
              { value: "2", label: "2 colonnes" },
              { value: "3", label: "3 colonnes" },
              { value: "4", label: "4 colonnes" },
            ]}
            onChange={(value) => update({ columns: Number(value) })}
          />
          <div style={{ display: "grid", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <SectionTitle>Cartes ({stats.cards?.length ?? 0})</SectionTitle>
            </div>
            {stats.cards && stats.cards.length > 0 && (
              <div style={{ display: "grid", gap: 8 }}>
                {stats.cards.map((card, index) => (
                  <div
                    key={card.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "0.75rem",
                      borderRadius: 8,
                      border: "1px solid #e2e8f0",
                      background: "#f8fafc",
                    }}
                  >
                    <DragHandle />
                    <div style={{ flex: 1, display: "grid", gap: 6 }}>
                      <TextField
                        label=""
                        value={card.label}
                        onChange={(value) => {
                          const next = [...(stats.cards ?? [])];
                          next[index] = { ...card, label: value };
                          update({ cards: next });
                        }}
                        placeholder="Label (ex: Clients actifs)"
                      />
                      <TextField
                        label=""
                        value={card.value}
                        onChange={(value) => {
                          const next = [...(stats.cards ?? [])];
                          next[index] = { ...card, value };
                          update({ cards: next });
                        }}
                        placeholder="Valeur (ex: 120)"
                      />
                    </div>
                    <div style={{ display: "flex", gap: 4, flexDirection: "column" }}>
                      <button
                        type="button"
                        style={iconButton}
                        onClick={() => moveCard(index, index - 1)}
                        disabled={index === 0}
                        title="Déplacer vers le haut"
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M18 15l-6-6-6 6" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        style={iconButton}
                        onClick={() => moveCard(index, index + 1)}
                        disabled={index === (stats.cards?.length ?? 0) - 1}
                        title="Déplacer vers le bas"
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M6 9l6 6 6-6" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        style={iconButton}
                        onClick={() => removeCard(card.id)}
                        title="Supprimer"
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <button
              type="button"
              style={{
                ...actionButton,
                padding: "0.5rem 0.75rem",
                fontSize: 13,
                fontWeight: 500,
                borderStyle: "dashed",
                borderColor: "#cbd5e1",
                background: "#f8fafc",
                color: "#64748b",
              }}
              onClick={() =>
                update({
                  cards: [...(stats.cards ?? []), { id: createId("stat"), label: "Service", value: "Description" }],
                })
              }
            >
              + Ajouter une carte
            </button>
          </div>
          {renderCommon()}
        </div>
      );
    }
    case "image": {
      const image = block as ImageBlock;
      return (
        <div style={{ display: "grid", gap: 16 }}>
          <ImageUploadField
            label="Image"
            value={image.imageUrl}
            onChange={(value) => update({ imageUrl: value })}
            onUpload={onImageUpload}
          />
          <TextField
            label="Alt"
            value={image.altText}
            onChange={(value) => update({ altText: value })}
            placeholder="Décrivez l'image pour l'accessibilité"
          />
          <TextField
            label="Legende"
            value={image.caption}
            onChange={(value) => update({ caption: value })}
            placeholder="Une légende courte et informative"
          />
          {renderCommon()}
        </div>
      );
    }
    case "faq": {
      const faq = block as FaqBlock;
      return (
        <div style={{ display: "grid", gap: 16 }}>
          <TextField
            label="Titre"
            value={faq.title}
            onChange={(value) => update({ title: value })}
            placeholder="Questions fréquentes"
          />
          <div style={{ display: "grid", gap: 8 }}>
            <SectionTitle>Questions</SectionTitle>
            {faq.items?.map((item, index) => (
              <div key={item.id} style={{ display: "grid", gap: 6 }}>
                <TextField
                  label="Question"
                  value={item.question}
                  onChange={(value) => {
                    const next = [...(faq.items ?? [])];
                    next[index] = { ...item, question: value };
                    update({ items: next });
                  }}
                  placeholder="Ex: Puis-je personnaliser les blocs ?"
                />
                <TextAreaField
                  label="Reponse"
                  value={item.answer}
                  onChange={(value) => {
                    const next = [...(faq.items ?? [])];
                    next[index] = { ...item, answer: value };
                    update({ items: next });
                  }}
                  placeholder="Réponse claire et concise."
                />
              </div>
            ))}
            <button
              type="button"
              style={actionButton}
              onClick={() =>
                update({
                  items: [...(faq.items ?? []), { id: createId("faq"), question: "Question", answer: "" }],
                })
              }
            >
              Ajouter une question
            </button>
          </div>
          {renderCommon()}
        </div>
      );
    }
    case "split": {
      const split = block as SplitBlock;
      return (
        <div style={{ display: "grid", gap: 16 }}>
          <TextField
            label="Titre"
            value={split.title}
            onChange={(value) => update({ title: value })}
            placeholder="Mettez en avant un bénéfice clé"
          />
          <TextAreaField
            label="Texte"
            value={split.text}
            onChange={(value) => update({ text: value })}
            placeholder="Décrivez en quelques phrases."
          />
          <TextField
            label="CTA"
            value={split.ctaText}
            onChange={(value) => update({ ctaText: value })}
            placeholder="Voir l'offre"
          />
          <TextField
            label="Lien"
            value={split.ctaLink}
            onChange={(value) => update({ ctaLink: value })}
            placeholder="/offre"
          />
          <ImageUploadField
            label="Image"
            value={split.imageUrl}
            onChange={(value) => update({ imageUrl: value })}
            onUpload={onImageUpload}
          />
          <SelectField
            label="Position image"
            value={split.imagePosition ?? "left"}
            options={[
              { value: "left", label: "Gauche" },
              { value: "right", label: "Droite" },
            ]}
            onChange={(value) => update({ imagePosition: value as SplitBlock["imagePosition"] })}
          />
          {renderCommon()}
        </div>
      );
    }
    case "gallery": {
      const gallery = block as GalleryBlock;
      return (
        <div style={{ display: "grid", gap: 16 }}>
          <TextField
            label="Titre"
            value={gallery.title}
            onChange={(value) => update({ title: value })}
            placeholder="Galerie"
          />
          <div style={{ display: "grid", gap: 8 }}>
            <SectionTitle>Images</SectionTitle>
            {gallery.images?.map((item, index) => (
              <div key={item.id} style={{ display: "grid", gap: 6 }}>
                <ImageUploadField
                  label="Image"
                  value={item.url}
                  onChange={(value) => {
                    const next = [...(gallery.images ?? [])];
                    next[index] = { ...item, url: value };
                    update({ images: next });
                  }}
                  onUpload={onImageUpload}
                />
                <TextField
                  label="Legende"
                  value={item.caption}
                  onChange={(value) => {
                    const next = [...(gallery.images ?? [])];
                    next[index] = { ...item, caption: value };
                    update({ images: next });
                  }}
                  placeholder="Court descriptif"
                />
              </div>
            ))}
            <button
              type="button"
              style={actionButton}
              onClick={() =>
                update({
                  images: [...(gallery.images ?? []), { id: createId("img"), url: "", caption: "" }],
                })
              }
            >
              Ajouter une image
            </button>
          </div>
          {renderCommon()}
        </div>
      );
    }
    case "testimonials": {
      const testimonials = block as TestimonialsBlock;
      return (
        <div style={{ display: "grid", gap: 16 }}>
          <TextField
            label="Titre"
            value={testimonials.title}
            onChange={(value) => update({ title: value })}
            placeholder="Ce que disent nos clients"
          />
          <div style={{ display: "grid", gap: 8 }}>
            <SectionTitle>Temoignages</SectionTitle>
            {testimonials.items?.map((item, index) => (
              <div key={item.id} style={{ display: "grid", gap: 6 }}>
                <TextField
                  label="Nom"
                  value={item.name}
                  onChange={(value) => {
                    const next = [...(testimonials.items ?? [])];
                    next[index] = { ...item, name: value };
                    update({ items: next });
                  }}
                  placeholder="Prénom Nom"
                />
                <TextField
                  label="Role"
                  value={item.role}
                  onChange={(value) => {
                    const next = [...(testimonials.items ?? [])];
                    next[index] = { ...item, role: value };
                    update({ items: next });
                  }}
                  placeholder="Poste / entreprise"
                />
                <TextAreaField
                  label="Citation"
                  value={item.quote}
                  onChange={(value) => {
                    const next = [...(testimonials.items ?? [])];
                    next[index] = { ...item, quote: value };
                    update({ items: next });
                  }}
                  placeholder="Un retour client authentique."
                />
                <ImageUploadField
                  label="Photo"
                  value={item.photo ?? ""}
                  onChange={(value) => {
                    const next = [...(testimonials.items ?? [])];
                    next[index] = { ...item, photo: value };
                    update({ items: next });
                  }}
                  onUpload={onImageUpload}
                />
              </div>
            ))}
            <button
              type="button"
              style={actionButton}
              onClick={() =>
                update({
                  items: [...(testimonials.items ?? []), { id: createId("t"), name: "", quote: "" }],
                })
              }
            >
              Ajouter un temoignage
            </button>
          </div>
          {renderCommon()}
        </div>
      );
    }
    case "cta": {
      const cta = block as CtaBlock;
      return (
        <div style={{ display: "grid", gap: 16 }}>
          <TextField
            label="Titre"
            value={cta.title}
            onChange={(value) => update({ title: value })}
            placeholder="Un titre pour inciter à l'action"
          />
          <TextAreaField
            label="Texte"
            value={cta.text}
            onChange={(value) => update({ text: value })}
            placeholder="Décrivez en une phrase la valeur de votre offre."
          />
          <TextField
            label="Bouton"
            value={cta.buttonText}
            onChange={(value) => update({ buttonText: value })}
            placeholder="Parler à un expert"
          />
          <TextField
            label="Lien"
            value={cta.buttonLink}
            onChange={(value) => update({ buttonLink: value })}
            placeholder="/contact"
          />
          <SelectField
            label="Style"
            value={cta.style ?? "solid"}
            options={[
              { value: "solid", label: "Solide" },
              { value: "gradient", label: "Gradient" },
            ]}
            onChange={(value) => update({ style: value as CtaBlock["style"] })}
          />
          {renderCommon()}
        </div>
      );
    }
    case "iconList": {
      const iconList = block as IconListBlock;
      return (
        <div style={{ display: "grid", gap: 16 }}>
          <TextField
            label="Titre"
            value={iconList.title}
            onChange={(value) => update({ title: value })}
            placeholder="Points forts"
          />
          <div style={{ display: "grid", gap: 8 }}>
            <SectionTitle>Elements</SectionTitle>
            {iconList.items?.map((item, index) => (
              <div key={item.id} style={{ display: "grid", gap: 6 }}>
                <TextField
                  label="Icone"
                  value={item.icon}
                  onChange={(value) => {
                    const next = [...(iconList.items ?? [])];
                    next[index] = { ...item, icon: value };
                    update({ items: next });
                  }}
                  placeholder="★"
                />
                <TextField
                  label="Label"
                  value={item.label}
                  onChange={(value) => {
                    const next = [...(iconList.items ?? [])];
                    next[index] = { ...item, label: value };
                    update({ items: next });
                  }}
                  placeholder="Rapide"
                />
                <TextAreaField
                  label="Texte"
                  value={item.text}
                  onChange={(value) => {
                    const next = [...(iconList.items ?? [])];
                    next[index] = { ...item, text: value };
                    update({ items: next });
                  }}
                  placeholder="Décrivez le bénéfice principal."
                />
              </div>
            ))}
            <button
              type="button"
              style={actionButton}
              onClick={() =>
                update({
                  items: [...(iconList.items ?? []), { id: createId("icon"), icon: "*", label: "", text: "" }],
                })
              }
            >
              Ajouter un element
            </button>
          </div>
          {renderCommon()}
        </div>
      );
    }
    case "timeline": {
      const timeline = block as TimelineBlock;
      return (
        <div style={{ display: "grid", gap: 16 }}>
          <TextField
            label="Titre"
            value={timeline.title}
            onChange={(value) => update({ title: value })}
            placeholder="Étapes clés"
          />
          <div style={{ display: "grid", gap: 8 }}>
            <SectionTitle>Etapes</SectionTitle>
            {timeline.steps?.map((step, index) => (
              <div key={step.id} style={{ display: "grid", gap: 6 }}>
                <TextField
                  label="Titre"
                  value={step.title}
                  onChange={(value) => {
                    const next = [...(timeline.steps ?? [])];
                    next[index] = { ...step, title: value };
                    update({ steps: next });
                  }}
                  placeholder="Nom de l'étape"
                />
                <TextAreaField
                  label="Description"
                  value={step.description}
                  onChange={(value) => {
                    const next = [...(timeline.steps ?? [])];
                    next[index] = { ...step, description: value };
                    update({ steps: next });
                  }}
                  placeholder="Expliquez ce qui se passe à cette étape."
                />
              </div>
            ))}
            <button
              type="button"
              style={actionButton}
              onClick={() =>
                update({
                  steps: [...(timeline.steps ?? []), { id: createId("step"), title: "", description: "" }],
                })
              }
            >
              Ajouter une etape
            </button>
          </div>
          {renderCommon()}
        </div>
      );
    }
    case "video": {
      const video = block as VideoBlock;
      return (
        <div style={{ display: "grid", gap: 16 }}>
          <TextField
            label="Titre"
            value={video.title}
            onChange={(value) => update({ title: value })}
            placeholder="Titre de la vidéo"
          />
          <TextField
            label="URL vidéo"
            value={video.videoUrl}
            onChange={(value) => update({ videoUrl: value })}
            placeholder="https://www.youtube.com/embed/..."
          />
          <TextAreaField
            label="Legende"
            value={video.caption}
            onChange={(value) => update({ caption: value })}
            placeholder="Ajoutez un contexte ou une description courte."
          />
          {renderCommon()}
        </div>
      );
    }
    case "divider": {
      const divider = block as DividerBlock;
      return (
        <div style={{ display: "grid", gap: 16 }}>
          <SelectField
            label="Style"
            value={divider.style ?? "solid"}
            options={[
              { value: "solid", label: "Solid" },
              { value: "dashed", label: "Dashed" },
              { value: "dotted", label: "Dotted" },
            ]}
            onChange={(value) => update({ style: value as DividerBlock["style"] })}
          />
          <NumberField
            label="Epaisseur"
            value={divider.thickness}
            onChange={(value) => update({ thickness: value })}
            min={1}
            max={10}
          />
          {renderCommon()}
        </div>
      );
    }
    case "spacer": {
      const spacer = block as SpacerBlock;
      return (
        <div style={{ display: "grid", gap: 16 }}>
          <NumberField
            label="Hauteur"
            value={spacer.height}
            onChange={(value) => update({ height: value })}
            min={0}
            max={200}
          />
          {renderCommon()}
        </div>
      );
    }
    default:
      return renderCommon();
  }
}

export function PageBuilder({
  value,
  onChange,
  theme,
  availableBlocks = DEFAULT_BLOCKS,
  className,
  style,
  onImageUpload,
  mode = "edit",
  onSave,
  onPublish,
  saving = false,
  publishing = false,
}: PageBuilderProps) {
  const { blocks, setBlocks, selectedId, setSelectedId } = useBuilderState(value);
  const [activeTab, setActiveTab] = React.useState<"blocks" | "settings">("blocks");

  if (mode === "view") {
    return <PageBuilderRenderer content={value ?? { blocks }} filterHidden={true} />;
  }

  const selectedIndex = blocks.findIndex((block) => block.id === selectedId);
  const selectedBlock = selectedIndex >= 0 ? blocks[selectedIndex] : null;

  const emit = (next: Block[]) => {
    setBlocks(next);
    onChange?.({ blocks: next, metadata: value?.metadata });
  };

  const emitWithMetadata = (metadata: PageContent["metadata"]) => {
    onChange?.({ blocks, metadata });
  };

  const addBlock = (type: BlockType) => {
    const block = createBlock(type);
    const next = [...blocks, block];
    emit(next);
    setSelectedId(block.id);
    setActiveTab("settings");
  };

  const removeBlock = (id: string) => {
    const next = blocks.filter((block) => block.id !== id);
    emit(next);
    if (selectedId === id) {
      setSelectedId(next[0]?.id ?? null);
    }
  };

  const duplicateBlock = (block: Block) => {
    const clone = { ...block, id: createId(block.type) } as Block;
    const next = [...blocks, clone];
    emit(next);
    setSelectedId(clone.id);
  };

  const moveBlock = (from: number, to: number) => {
    if (from < 0 || to < 0 || from >= blocks.length || to >= blocks.length) return;
    emit(arrayMove(blocks, from, to));
  };

  const updateBlock = (updated: Block) => {
    const next = blocks.map((block) => (block.id === updated.id ? updated : block));
    emit(next);
  };

  const toggleBlockVisibility = (id: string) => {
    const next = blocks.map((block) =>
      block.id === id ? { ...block, visible: block.visible === false ? undefined : false } : block
    );
    emit(next);
  };

  const handleSave = () => {
    if (!onSave) return;
    return onSave({ blocks, metadata: value?.metadata });
  };

  const handlePublish = () => {
    if (!onPublish) return;
    return onPublish({ blocks, metadata: value?.metadata });
  };

  return (
    <div
      className={className}
      style={{
        ...applyTheme(theme),
        ...style,
        color: "#0f172a",
        display: "grid",
        gridTemplateColumns: "280px 1fr 360px",
        gap: "1.5rem",
        padding: "1.5rem",
        minHeight: "100vh",
        background: theme?.backgroundColor ?? "#f8fafc",
      }}
    >
      <aside style={{ display: "grid", gap: "1rem", alignContent: "start" }}>
        <div style={{ display: "flex", gap: 4, marginBottom: "0.5rem" }}>
          <button
            type="button"
            onClick={() => setActiveTab("blocks")}
            style={{
              flex: 1,
              padding: "0.5rem 0.75rem",
              borderRadius: 8,
              border: "none",
              background: activeTab === "blocks" ? "#fff" : "transparent",
              color: activeTab === "blocks" ? "var(--pb-primary)" : "#64748b",
              cursor: "pointer",
              fontSize: 14,
              fontWeight: activeTab === "blocks" ? 600 : 400,
              boxShadow: activeTab === "blocks" ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
              fontFamily: "inherit",
            }}
          >
            Blocs
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("settings")}
            style={{
              flex: 1,
              padding: "0.5rem 0.75rem",
              borderRadius: 8,
              border: "none",
              background: activeTab === "settings" ? "#fff" : "transparent",
              color: activeTab === "settings" ? "var(--pb-primary)" : "#64748b",
              cursor: "pointer",
              fontSize: 14,
              fontWeight: activeTab === "settings" ? 600 : 400,
              boxShadow: activeTab === "settings" ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
              fontFamily: "inherit",
            }}
          >
            Paramètres
          </button>
        </div>

        {activeTab === "settings" && (
          <div style={{ ...panelStyle, display: "grid", gap: 16 }}>
            <SectionTitle>Paramètres de la page</SectionTitle>
            <TextField
              label="Titre de la page"
              value={value?.metadata?.title ?? ""}
              onChange={(title) => emitWithMetadata({ ...value?.metadata, title })}
              placeholder="Ex: Accueil, À propos, Landing page"
            />
            <SelectField
              label="Statut"
              value={value?.metadata?.status ?? "draft"}
              options={[
                { value: "draft", label: "Brouillon" },
                { value: "published", label: "Publié" },
              ]}
              onChange={(status) =>
                emitWithMetadata({ ...value?.metadata, status: status as PageMetadata["status"] })
              }
            />
            <div style={{ display: "grid", gap: 6 }}>
              <FieldLabel>Date de publication</FieldLabel>
              <input
                type="datetime-local"
                value={value?.metadata?.publicationDate ? new Date(value.metadata.publicationDate).toISOString().slice(0, 16) : ""}
                onChange={(e) =>
                  emitWithMetadata({
                    ...value?.metadata,
                    publicationDate: e.target.value ? new Date(e.target.value).toISOString() : undefined,
                  })
                }
                style={inputStyle}
              />
            </div>
            <div style={{ display: "grid", gap: 12, paddingTop: 12, borderTop: "1px solid #e2e8f0" }}>
              <SectionTitle>SEO</SectionTitle>
              <TextField
                label="Meta titre"
                value={value?.metadata?.metaTitle ?? ""}
                onChange={(metaTitle) => emitWithMetadata({ ...value?.metadata, metaTitle })}
                placeholder="Titre pour les moteurs de recherche"
              />
              <TextAreaField
                label="Meta description"
                value={value?.metadata?.metaDescription ?? ""}
                onChange={(metaDescription) => emitWithMetadata({ ...value?.metadata, metaDescription })}
                placeholder="Description pour les moteurs de recherche"
                rows={3}
              />
            </div>
          </div>
        )}

        {activeTab === "blocks" && (
          <div style={{ ...panelStyle, display: "grid", gap: 12 }}>
            <SectionTitle>Ajouter un bloc</SectionTitle>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 8 }}>
              {availableBlocks.map((type) => (
                <button
                  key={type}
                  type="button"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 6,
                    borderRadius: 10,
                    border: "1px dashed #cbd5e1",
                    padding: "0.75rem 0.5rem",
                    background: "#f8fafc",
                    cursor: "pointer",
                    fontSize: 12,
                    transition: "all 0.2s",
                  }}
                  onClick={() => addBlock(type)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#f1f5f9";
                    e.currentTarget.style.borderColor = "#94a3b8";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "#f8fafc";
                    e.currentTarget.style.borderColor = "#cbd5e1";
                  }}
                >
                  <BlockIcon type={type} size={20} color="#64748b" />
                  <span>{BLOCK_LABELS[type]}</span>
                </button>
              ))}
            </div>
            {(availableBlocks.includes("divider") || availableBlocks.includes("spacer")) && (
              <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 8 }}>
                {availableBlocks.includes("divider") && (
                  <button
                    type="button"
                    onClick={() => addBlock("divider")}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "0.5rem",
                      borderRadius: 8,
                      border: "1px dashed #cbd5e1",
                      background: "#f8fafc",
                      cursor: "pointer",
                      fontSize: 13,
                    }}
                  >
                    <BlockIcon type="divider" size={16} color="#64748b" />
                    <span>Séparateur</span>
                  </button>
                )}
                {availableBlocks.includes("spacer") && (
                  <button
                    type="button"
                    onClick={() => addBlock("spacer")}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "0.5rem",
                      borderRadius: 8,
                      border: "1px dashed #cbd5e1",
                      background: "#f8fafc",
                      cursor: "pointer",
                      fontSize: 13,
                    }}
                  >
                    <BlockIcon type="spacer" size={16} color="#64748b" />
                    <span>Espace</span>
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        <div style={{ ...panelStyle, display: "grid", gap: 8 }}>
          <SectionTitle>Blocs</SectionTitle>
          {blocks.length === 0 && (
            <p style={{ margin: 0, fontSize: 13, color: "#64748b", textAlign: "center", padding: "1rem 0" }}>
              Ajoute un bloc pour commencer.
            </p>
          )}
          {blocks.map((block, index) => (
            <div
              key={block.id}
              style={blockCard(block.id === selectedId)}
              onClick={(e) => {
                if ((e.target as HTMLElement).closest("button")) return;
                setSelectedId(block.id);
                setActiveTab("settings");
              }}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setSelectedId(block.id);
                  setActiveTab("settings");
                }
              }}
            >
              <DragHandle />
              <BlockIcon type={block.type} size={18} color={block.id === selectedId ? "var(--pb-primary)" : "#64748b"} />
              <div style={{ flex: 1, display: "grid", gap: 2, minWidth: 0 }}>
                <strong style={{ fontSize: 13, fontWeight: 600, fontFamily: "inherit" }}>{BLOCK_LABELS[block.type]}</strong>
              </div>
              <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                <button
                  type="button"
                  style={iconButton}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleBlockVisibility(block.id);
                  }}
                  title={block.visible !== false ? "Masquer" : "Afficher"}
                >
                  <EyeIcon visible={block.visible !== false} />
                </button>
                <button
                  type="button"
                  style={iconButton}
                  onClick={(e) => {
                    e.stopPropagation();
                    moveBlock(index, index - 1);
                  }}
                  disabled={index === 0}
                  title="Déplacer vers le haut"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 15l-6-6-6 6" />
                  </svg>
                </button>
                <button
                  type="button"
                  style={iconButton}
                  onClick={(e) => {
                    e.stopPropagation();
                    moveBlock(index, index + 1);
                  }}
                  disabled={index === blocks.length - 1}
                  title="Déplacer vers le bas"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
                <button
                  type="button"
                  style={{
                    ...iconButton,
                    color: "var(--pb-primary)",
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (confirm(`Voulez-vous vraiment supprimer le bloc "${BLOCK_LABELS[block.type]}" ?`)) {
                      removeBlock(block.id);
                    }
                  }}
                  title="Supprimer"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </aside>

      <main style={{ display: "grid", gap: "1rem", alignContent: "start" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "1rem 1.25rem",
            borderRadius: 12,
            border: "1px solid #e2e8f0",
            background: "#fff",
            boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
          }}
        >
          <div>
            <strong style={{ fontSize: 16, fontWeight: 600, color: "#0f172a", fontFamily: "inherit" }}>Nouvelle page</strong>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <button
              type="button"
              style={{
                ...actionButton,
                padding: "0.5rem 1rem",
                fontSize: 14,
                fontWeight: 500,
                background: "var(--pb-primary)",
                color: "#fff",
                borderColor: "var(--pb-primary)",
              }}
              onClick={() => void handleSave()}
              disabled={saving || !onSave}
            >
              {saving ? "Enregistrement..." : "Enregistrer"}
            </button>
            <button
              type="button"
              style={{
                ...actionButton,
                padding: "0.5rem 1rem",
                fontSize: 14,
                fontWeight: 500,
                background: "var(--pb-primary)",
                color: "#fff",
                borderColor: "var(--pb-primary)",
              }}
              onClick={() => void handlePublish()}
              disabled={publishing || !onPublish}
            >
              {publishing ? "Publication..." : "Publier"}
            </button>
          </div>
        </div>

        <div
          style={{
            ...panelStyle,
            minHeight: 600,
            overflow: "hidden",
            background: "#fff",
            borderRadius: 12,
          }}
        >
          <div style={{ height: "100%", overflowY: "auto", padding: "1rem" }}>
            <PageBuilderRenderer content={{ blocks }} filterHidden={true} />
          </div>
        </div>
      </main>

      <aside style={{ display: "grid", gap: "1rem", alignContent: "start" }}>
        {selectedBlock && (
          <div style={{ ...panelStyle, display: "grid", gap: 16 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <BlockIcon type={selectedBlock.type} size={20} color="#0f172a" />
                <SectionTitle>{BLOCK_LABELS[selectedBlock.type]}</SectionTitle>
              </div>
              <div style={{ display: "flex", gap: 6 }}>
                <button
                  type="button"
                  style={iconButton}
                  onClick={() => duplicateBlock(selectedBlock)}
                  title="Dupliquer"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                </button>
                <button
                  type="button"
                  style={iconButton}
                  onClick={() => removeBlock(selectedBlock.id)}
                  title="Supprimer"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                  </svg>
                </button>
              </div>
            </div>
            <div style={{ borderTop: "1px solid #e2e8f0", paddingTop: 16 }}>
              <BlockEditor
                block={selectedBlock}
                onChange={(updated) => updateBlock(updated)}
                onImageUpload={onImageUpload}
              />
            </div>
          </div>
        )}
        {!selectedBlock && (
          <div style={{ ...panelStyle, display: "grid", gap: 12, textAlign: "center", padding: "2rem 1rem" }}>
            <p style={{ margin: 0, fontSize: 14, color: "#64748b" }}>Sélectionne un bloc pour modifier ses paramètres.</p>
          </div>
        )}
      </aside>
    </div>
  );
}
