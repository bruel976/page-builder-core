# Page Builder - Pages dynamiques

Ce document decrit la fonctionnalite **Page Builder** pour les pages dynamiques. Il sert de reference pour les prochaines implementations (front, back, API, schema JSON, rendu public).

## 1) Perimetre
- Les **pages dynamiques** sont creees et editees depuis le backoffice.
- Le contenu est **stocke en JSON** (content_type = `json`) avec une liste de blocs.
- Le rendu public se fait sur l'URL `/pages/:slug`.

## 2) Acces backoffice et routes
- Liste des pages dynamiques: `/dashboard/pages?group=dynamic`.
- Creation: `/dashboard/pages/create?group=dynamic`.
- Edition: `/dashboard/pages/:id/edit?group=dynamic`.
- Mode Page Builder: le layout admin masque la sidebar quand `group=dynamic` est present.

## 3) Modele de donnees (API + DB)
### Champs principaux (table `pages`)
- `title` (string) : titre de la page.
- `slug` (string unique) : genere automatiquement lors de la creation.
- `content` (longText) : JSON string du contenu.
- `content_type` (enum `json|html`) : **json** pour les pages dynamiques.
- `status` (draft|published) : controle la publication.
- `publication_date` (date, optionnel) : si non logue, seules les pages publiees et date <= now sont visibles.
- `meta_title`, `meta_description` : SEO.
- `featured_image` : image associee.
- `is_system` : pages systemes (non dynamiques).
- `system_key` : clef interne pour pages systemes.
- `is_template` : pages modele (optionnel).

### Endpoints (Laravel)
- Public:
  - `GET /api/pages` (liste filtrable).
  - `GET /api/pages/{slug}` (detail par slug ou id).
- Admin:
  - `POST /api/admin/pages` (create).
  - `PUT /api/admin/pages/{id}` (update).
  - `DELETE /api/admin/pages/{id}` (delete).

**Note**: en mode public, une page `draft` ou une page `is_template` est masquee.

## 4) Format JSON du contenu
Le champ `content` stocke **une string JSON** avec la structure suivante:

```json
{
  "blocks": [
    {
      "id": "uuid",
      "type": "hero",
      "textColor": "#0f172a",
      "backgroundType": "solid",
      "backgroundColor": "#ffffff",
      "backgroundGradient": "linear-gradient(120deg, #0f172a, #2563eb)",
      "backgroundImage": "",
      "visible": true,
      "...": "champs specifiques du bloc"
    }
  ]
}
```

### Champs communs (BaseBlock)
- `id` (string) : identifiant unique.
- `type` (enum) : type du bloc.
- `textColor` : couleur du texte.
- `backgroundType` : `solid | gradient | image`.
- `backgroundColor` : couleur si `solid`.
- `backgroundGradient` : CSS gradient si `gradient`.
- `backgroundImage` : URL si `image`.
- `visible` (bool, optionnel) : toggle visibilite dans le builder.

## 5) Catalogue des blocs
### 5.1 Hero
- `variant`: `simple | split | cover | video | stats | carousel`
- `title`, `subtitle`
- `ctaText`, `ctaLink`
- `imageUrl`, `imagePosition` (`left|right`)
- `videoUrl`
- `stats`: [{ `id`, `label`, `value` }]
- `slides`: [{ `id`, `title`, `subtitle`, `imageUrl`, `ctaText`, `ctaLink` }]

### 5.2 Text
- `heading`
- `body`
- `alignment`: `start | center | end`

### 5.3 Stats
- `heading`, `description`
- `columns` (number)
- `cards`: [{ `id`, `label`, `value` }]

### 5.4 Image
- `imageUrl`
- `altText`
- `caption`

### 5.5 FAQ
- `title`
- `items`: [{ `id`, `question`, `answer` }]

### 5.6 Split (image + texte)
- `imageUrl`
- `title`, `text`
- `ctaText`, `ctaLink`
- `imagePosition`

### 5.7 Gallery
- `title`
- `images`: [{ `id`, `url`, `caption` }]

### 5.8 Testimonials
- `title`
- `items`: [{ `id`, `name`, `role`, `quote`, `photo` }]

### 5.9 CTA
- `title`, `text`
- `buttonText`, `buttonLink`
- `style`: `solid | gradient`

### 5.10 Icon list
- `title`
- `items`: [{ `id`, `icon`, `label`, `text` }]

### 5.11 Timeline
- `title`
- `steps`: [{ `id`, `title`, `description` }]

### 5.12 Video
- `title`
- `videoUrl`
- `caption`

### 5.13 Divider
- `style`: `solid | dashed | dotted`
- `thickness` (number)

### 5.14 Spacer
- `height` (number)

### 5.15 Composed (presets)
- `preset`: `introCards | imageTextCta | statsCta | faqCta | testimonialsRating | galleryText`
- `data`: structure dependante du preset

Presets disponibles:
- `introCards`: `title`, `intro`, `cards`[{id, icon, title, text}]
- `imageTextCta`: `title`, `text`, `ctaText`, `ctaLink`, `imageUrl`, `imagePosition`
- `statsCta`: `title`, `text`, `ctaText`, `ctaLink`, `stats`[{id, label, value}]
- `faqCta`: `title`, `ctaText`, `ctaLink`, `items`[{id, question, answer}]
- `testimonialsRating`: `title`, `ratingLabel`, `ratingValue`, `ratingText`, `items`[{id, name, role, quote, photo}]
- `galleryText`: `title`, `text`, `images`[{id, url, caption}]

## 6) Theme du builder (BuilderTheme)

Le builder supporte un theme personnalisable, incluant le mode sombre.

### Proprietes du theme

| Propriete | Description | Defaut (clair) |
|-----------|-------------|----------------|
| `fontFamily` | Police de caracteres | `"Manrope, system-ui, sans-serif"` |
| `primaryColor` | Couleur principale | `"#2563eb"` |
| `secondaryColor` | Couleur secondaire | `"#9333ea"` |
| `backgroundColor` | Fond du builder | `"#f8fafc"` |
| `cardColor` | Fond des panneaux | `"#ffffff"` |
| `textColor` | Texte principal | `"#0f172a"` |
| `textMutedColor` | Texte secondaire | `"#64748b"` |
| `borderColor` | Bordures | `"#e2e8f0"` |
| `inputColor` | Fond des inputs | `"#ffffff"` |

### Exemple mode sombre

```tsx
const darkTheme: BuilderTheme = {
  backgroundColor: "#0f172a",
  cardColor: "#1e293b",
  textColor: "#f1f5f9",
  textMutedColor: "#94a3b8",
  borderColor: "#334155",
  inputColor: "#1e293b",
};
```

## 7) Workflow backoffice (creation / edition)
1. L'utilisateur choisit **Pages dynamiques**.
2. Creation ou edition d'une page: le builder est force en **content_type = json**.
3. Ajout de blocs via la palette.
4. Edition d'un bloc dans le panneau de configuration.
5. Reorganisation: montee/descente, duplication, suppression.
6. Sauvegarde: le contenu est serialise dans `content` sous forme `{ blocks: [...] }`.

## 8) Rendu public
- Route publique: `/pages/:slug`.
- Si `content_type !== json`, la page est rendue en HTML (`dangerouslySetInnerHTML`).
- Si `content_type === json`, les blocs sont lus depuis `content` et rendus dans `DynamicPage`.

## 9) Images et media
- Les images uploadees depuis le builder passent par `MediaService` (assign_to = `page_content`).
- Les URLs sont ensuite stockees dans les champs `imageUrl`, `backgroundImage`, etc.

## 10) Points d'attention / limitations connues
- `visible` est utilise dans l'UI du builder mais **n'est pas filtre** dans le rendu public. Pour masquer un bloc, il faut actuellement le supprimer.
- Des champs de style (ex: couleurs de bouton dans le hero) existent dans l'UI mais ne sont pas utilises par le rendu public. Si besoin, mettre a jour le renderer.
- Le JSON est stocke sous forme de string; toute modification manuelle doit rester valide.

## 11) Ajouter un nouveau bloc (guide rapide)
1. **Types/Schema**: ajouter le type et ses champs dans:
   - `sidevam976/src/components/admin/pages/PageBuilder.tsx`
   - `sidevam976/src/components/admin/pages/PageForm.tsx`
   - `sidevam976/src/pages/DynamicPage.tsx`
2. **Creation par defaut**: implementer dans `createBlock` (PageBuilder + PageForm).
3. **Edition UI**: ajouter les champs de config dans `PageBuilder`.
4. **Rendu public**: ajouter la section dans `DynamicPage`.
5. **Migration/compat**: prevoir des valeurs par defaut pour les pages existantes.

## 12) Fichiers de reference
- Admin builder: `sidevam976/src/components/admin/pages/PageBuilder.tsx`
- Form dynamic/system: `sidevam976/src/components/admin/pages/PageForm.tsx`
- Rendu public: `sidevam976/src/pages/DynamicPage.tsx`
- API pages: `api-sidevam976/app/Http/Controllers/API/PageController.php`
- Table pages: `api-sidevam976/database/migrations/2025_11_04_175423_create_pages_table.php` + migrations associees
- Routes API: `api-sidevam976/routes/api.php`
