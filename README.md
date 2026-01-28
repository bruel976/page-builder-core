# @sirel/page-builder

React page builder renderer + builder UI + TypeScript types.

## Documentation

Consultez `USAGE.md` pour un guide complet (builder, rendu, types, publication npm).

## Install

```bash
npm install @sirel/page-builder react react-dom
```

## Usage (builder UI)

```tsx
import { PageBuilder, type PageContent } from "@sirel/page-builder";

const content: PageContent = { blocks: [] };

export function AdminPage() {
  return <PageBuilder value={content} onChange={(next) => console.log(next)} />;
}
```

## Usage (renderer)

```tsx
import { PageBuilderRenderer, type PageContent } from "@sirel/page-builder";

const content: PageContent = {
  blocks: [
    {
      id: "1",
      type: "hero",
      title: "Hello",
      subtitle: "From the builder",
      ctaText: "Get started",
      ctaLink: "/start",
    },
  ],
};

export function Page() {
  return <PageBuilderRenderer content={content} />;
}
```

## Custom blocks

```tsx
import { PageBuilderRenderer, type BlockComponentMap } from "@sirel/page-builder";

const components: Partial<BlockComponentMap> = {
  hero: ({ block }) => <section>Custom hero: {block.title}</section>,
};

<PageBuilderRenderer content={content} components={components} />;
```

## Publish (npm public)

```bash
npm version patch
npm run build
npm publish --access public
```
