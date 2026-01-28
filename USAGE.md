# Guide d'utilisation de @sirel/page-builder

Ce guide explique comment utiliser votre package `@sirel/page-builder` dans un projet.

## 📦 Installation

### Option 1 : Package publié sur npm (recommandé pour la production)

```bash
npm install @sirel/page-builder react react-dom
# ou
yarn add @sirel/page-builder react react-dom
# ou
pnpm add @sirel/page-builder react react-dom
```

### Option 2 : Package local (pour le développement)

Si vous travaillez sur le package en local, vous pouvez le lier directement :

```bash
# Dans le dossier de votre projet
npm install file:../page_builder_core
# ou avec un chemin absolu
npm install file:/home/ghost/Projet/page_builder_core
```

**Important** : Assurez-vous d'avoir construit le package avant de l'utiliser :

```bash
# Dans le dossier page_builder_core
npm run build
```

### Option 3 : Lien symbolique (pour le développement actif)

```bash
# Dans le dossier page_builder_core
npm link

# Dans votre projet
npm link @sirel/page-builder
```

## 🚀 Utilisation de base

### 1. Utiliser le Page Builder (interface d'édition)

```tsx
import { PageBuilder, type PageContent } from "@sirel/page-builder";
import { useState } from "react";

function AdminPage() {
  const [content, setContent] = useState<PageContent>({
    blocks: []
  });

  return (
    <PageBuilder 
      value={content} 
      onChange={(newContent) => {
        setContent(newContent);
        // Sauvegarder dans votre backend
        console.log("Nouveau contenu:", newContent);
      }}
    />
  );
}
```

### 2. Utiliser le Renderer (affichage de la page)

```tsx
import { PageBuilderRenderer, type PageContent } from "@sirel/page-builder";

const content: PageContent = {
  blocks: [
    {
      id: "hero-1",
      type: "hero",
      title: "Titre principal",
      subtitle: "Sous-titre",
      ctaText: "Commencer",
      ctaLink: "/start",
      backgroundType: "gradient",
      backgroundGradient: "linear-gradient(120deg, #0f172a, #2563eb)",
      textColor: "#ffffff",
    },
    {
      id: "text-1",
      type: "text",
      heading: "Section de texte",
      body: "Contenu de la section...",
      alignment: "center",
    },
  ],
};

function PublicPage() {
  return <PageBuilderRenderer content={content} />;
}
```

## 🎨 Personnalisation du thème

```tsx
import { PageBuilder, type BuilderTheme } from "@sirel/page-builder";

const customTheme: BuilderTheme = {
  fontFamily: "Inter, system-ui, sans-serif",
  primaryColor: "#2563eb",
  secondaryColor: "#9333ea",
  backgroundColor: "#f8fafc",
};

function AdminPage() {
  return (
    <PageBuilder 
      value={content} 
      onChange={setContent}
      theme={customTheme}
    />
  );
}
```

## 🧩 Personnaliser les blocs disponibles

```tsx
import { PageBuilder, type BlockType } from "@sirel/page-builder";

// Limiter les blocs disponibles
const availableBlocks: BlockType[] = [
  "hero",
  "text",
  "image",
  "cta",
];

function AdminPage() {
  return (
    <PageBuilder 
      value={content} 
      onChange={setContent}
      availableBlocks={availableBlocks}
    />
  );
}
```

## 🎭 Personnaliser le rendu des blocs

```tsx
import { 
  PageBuilderRenderer, 
  type BlockComponentMap,
  type HeroBlock 
} from "@sirel/page-builder";

const customComponents: Partial<BlockComponentMap> = {
  hero: ({ block }) => {
    const hero = block as HeroBlock;
    return (
      <section className="custom-hero">
        <h1>{hero.title}</h1>
        <p>{hero.subtitle}</p>
        {hero.ctaText && (
          <a href={hero.ctaLink}>{hero.ctaText}</a>
        )}
      </section>
    );
  },
};

function PublicPage() {
  return (
    <PageBuilderRenderer 
      content={content} 
      components={customComponents}
    />
  );
}
```

## 📝 Exemple complet avec sauvegarde

```tsx
import { PageBuilder, type PageContent } from "@sirel/page-builder";
import { useState, useEffect } from "react";

function AdminPage() {
  const [content, setContent] = useState<PageContent>({ blocks: [] });
  const [saving, setSaving] = useState(false);

  // Charger le contenu depuis votre API
  useEffect(() => {
    fetch("/api/page-content")
      .then(res => res.json())
      .then(data => setContent(data));
  }, []);

  // Sauvegarder le contenu
  const handleSave = async () => {
    setSaving(true);
    try {
      await fetch("/api/page-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      alert("Page sauvegardée !");
    } catch (error) {
      alert("Erreur lors de la sauvegarde");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <PageBuilder 
        value={content} 
        onChange={setContent}
      />
      <button onClick={handleSave} disabled={saving}>
        {saving ? "Sauvegarde..." : "Sauvegarder"}
      </button>
    </div>
  );
}
```

## 🔧 Configuration TypeScript

Assurez-vous que votre `tsconfig.json` inclut les types React :

```json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "moduleResolution": "bundler"
  }
}
```

## 📚 Types disponibles

```tsx
import type {
  PageContent,
  Block,
  BlockType,
  HeroBlock,
  TextBlock,
  StatsBlock,
  // ... autres types de blocs
  BuilderTheme,
  PageBuilderProps,
} from "@sirel/page-builder";
```

## 🧠 Structure du contenu

Le `PageBuilder` produit un objet `PageContent` prêt à être sauvegardé tel quel dans votre backend :

```ts
{
  blocks: [
    { id: "hero-1", type: "hero", title: "Titre", subtitle: "Sous-titre" },
    { id: "text-1", type: "text", heading: "Section", body: "Contenu" }
  ],
  metadata: {
    title: "Ma page",
    status: "published",
    publicationDate: "2026-01-27T10:00:00.000Z"
  }
}
```

## 🙈 Masquer un bloc sans le supprimer

Si vous utilisez `filterHidden`, les blocs avec `visible: false` ne seront pas rendus :

```tsx
<PageBuilderRenderer content={content} filterHidden />
```

## 📤 Publication sur npm (public)

> Pour un package **scopé** (ex: `@sirel/page-builder`), npm exige `--access public`.

1. **Vérifier la connexion npm**
   ```bash
   npm login
   npm whoami
   ```
2. **Mettre à jour la version**
   ```bash
   npm version patch
   # ou: npm version minor / major
   ```
3. **Construire le package**
   ```bash
   npm run build
   ```
4. **Publier**
   ```bash
   npm publish --access public
   ```
5. **Vérifier la publication**
   ```bash
   npm view @sirel/page-builder version
   ```

## 🐛 Dépannage

### Le package n'est pas trouvé

1. Vérifiez que vous avez construit le package : `npm run build` dans `page_builder_core`
2. Vérifiez que le dossier `dist` existe et contient les fichiers compilés
3. Si vous utilisez un lien local, réinstallez : `npm install file:../page_builder_core`

### Erreurs TypeScript

Assurez-vous d'avoir installé les types React :
```bash
npm install --save-dev @types/react @types/react-dom
```

### Le builder ne s'affiche pas

Vérifiez que React 18+ est installé :
```bash
npm install react@^18.0.0 react-dom@^18.0.0
```
