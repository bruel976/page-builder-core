export type BackgroundType = "solid" | "gradient" | "image";

export interface BaseBlock {
  id: string;
  type: BlockType;
  textColor?: string;
  backgroundType?: BackgroundType;
  backgroundColor?: string;
  backgroundGradient?: string;
  backgroundImage?: string;
  visible?: boolean;
}

export type HeroVariant = "simple" | "split" | "cover" | "video" | "stats" | "carousel";

export interface HeroStat {
  id: string;
  label: string;
  value: string;
}

export interface HeroSlide {
  id: string;
  title?: string;
  subtitle?: string;
  imageUrl?: string;
  ctaText?: string;
  ctaLink?: string;
}

export interface HeroBlock extends BaseBlock {
  type: "hero";
  variant?: HeroVariant;
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
  imageUrl?: string;
  imagePosition?: "left" | "right";
  textAlignment?: "start" | "center" | "end";
  contentAlign?: "start" | "center" | "end";
  minHeight?: number;
  titleSize?: number;
  subtitleSize?: number;
  videoUrl?: string;
  stats?: HeroStat[];
  slides?: HeroSlide[];
}

export interface TextBlock extends BaseBlock {
  type: "text";
  heading?: string;
  body?: string;
  alignment?: "start" | "center" | "end";
}

export interface StatsCard {
  id: string;
  label: string;
  value: string;
}

export interface StatsBlock extends BaseBlock {
  type: "stats";
  heading?: string;
  description?: string;
  columns?: number;
  cards?: StatsCard[];
}

export interface ImageBlock extends BaseBlock {
  type: "image";
  imageUrl?: string;
  altText?: string;
  caption?: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface FaqBlock extends BaseBlock {
  type: "faq";
  title?: string;
  items?: FaqItem[];
}

export interface SplitBlock extends BaseBlock {
  type: "split";
  imageUrl?: string;
  title?: string;
  text?: string;
  ctaText?: string;
  ctaLink?: string;
  imagePosition?: "left" | "right";
}

export interface GalleryImage {
  id: string;
  url: string;
  caption?: string;
}

export interface GalleryBlock extends BaseBlock {
  type: "gallery";
  title?: string;
  images?: GalleryImage[];
}

export interface TestimonialItem {
  id: string;
  name?: string;
  role?: string;
  quote?: string;
  photo?: string;
}

export interface TestimonialsBlock extends BaseBlock {
  type: "testimonials";
  title?: string;
  items?: TestimonialItem[];
}

export interface CtaBlock extends BaseBlock {
  type: "cta";
  title?: string;
  text?: string;
  buttonText?: string;
  buttonLink?: string;
  style?: "solid" | "gradient";
}

export interface IconListItem {
  id: string;
  icon?: string;
  label?: string;
  text?: string;
}

export interface IconListBlock extends BaseBlock {
  type: "iconList";
  title?: string;
  items?: IconListItem[];
}

export interface TimelineStep {
  id: string;
  title?: string;
  description?: string;
}

export interface TimelineBlock extends BaseBlock {
  type: "timeline";
  title?: string;
  steps?: TimelineStep[];
}

export interface VideoBlock extends BaseBlock {
  type: "video";
  title?: string;
  videoUrl?: string;
  caption?: string;
}

export interface DividerBlock extends BaseBlock {
  type: "divider";
  style?: "solid" | "dashed" | "dotted";
  thickness?: number;
}

export interface SpacerBlock extends BaseBlock {
  type: "spacer";
  height?: number;
}

export type ComposedPreset =
  | "introCards"
  | "imageTextCta"
  | "statsCta"
  | "faqCta"
  | "testimonialsRating"
  | "galleryText";

export type ComposedData =
  | {
      preset: "introCards";
      title?: string;
      intro?: string;
      cards?: Array<{ id: string; icon?: string; title?: string; text?: string }>;
    }
  | {
      preset: "imageTextCta";
      title?: string;
      text?: string;
      ctaText?: string;
      ctaLink?: string;
      imageUrl?: string;
      imagePosition?: "left" | "right";
    }
  | {
      preset: "statsCta";
      title?: string;
      text?: string;
      ctaText?: string;
      ctaLink?: string;
      stats?: Array<{ id: string; label: string; value: string }>;
    }
  | {
      preset: "faqCta";
      title?: string;
      ctaText?: string;
      ctaLink?: string;
      items?: Array<{ id: string; question: string; answer: string }>;
    }
  | {
      preset: "testimonialsRating";
      title?: string;
      ratingLabel?: string;
      ratingValue?: string;
      ratingText?: string;
      items?: Array<{ id: string; name?: string; role?: string; quote?: string; photo?: string }>;
    }
  | {
      preset: "galleryText";
      title?: string;
      text?: string;
      images?: Array<{ id: string; url: string; caption?: string }>;
    };

export interface ComposedBlock extends BaseBlock {
  type: "composed";
  preset?: ComposedPreset;
  data?: ComposedData;
}

export type BlockType =
  | "hero"
  | "text"
  | "stats"
  | "image"
  | "faq"
  | "split"
  | "gallery"
  | "testimonials"
  | "cta"
  | "iconList"
  | "timeline"
  | "video"
  | "divider"
  | "spacer"
  | "composed";

export type Block =
  | HeroBlock
  | TextBlock
  | StatsBlock
  | ImageBlock
  | FaqBlock
  | SplitBlock
  | GalleryBlock
  | TestimonialsBlock
  | CtaBlock
  | IconListBlock
  | TimelineBlock
  | VideoBlock
  | DividerBlock
  | SpacerBlock
  | ComposedBlock;

export interface PageMetadata {
  title?: string;
  slug?: string;
  status?: "draft" | "published";
  publicationDate?: string;
  metaTitle?: string;
  metaDescription?: string;
  featuredImage?: string;
}

export interface PageContent {
  blocks: Block[];
  metadata?: PageMetadata;
}
