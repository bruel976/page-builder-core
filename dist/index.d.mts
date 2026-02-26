import * as react_jsx_runtime from 'react/jsx-runtime';
import * as React from 'react';
import { CSSProperties } from 'react';

type BackgroundType = "solid" | "gradient" | "image";
interface BaseBlock {
    id: string;
    type: BlockType;
    textColor?: string;
    backgroundType?: BackgroundType;
    backgroundColor?: string;
    backgroundGradient?: string;
    backgroundImage?: string;
    visible?: boolean;
}
type HeroVariant = "simple" | "split" | "cover" | "video" | "stats" | "carousel";
interface HeroStat {
    id: string;
    label: string;
    value: string;
}
interface HeroSlide {
    id: string;
    title?: string;
    subtitle?: string;
    imageUrl?: string;
    ctaText?: string;
    ctaLink?: string;
}
interface HeroBlock extends BaseBlock {
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
interface TextBlock extends BaseBlock {
    type: "text";
    heading?: string;
    body?: string;
    alignment?: "start" | "center" | "end";
}
interface StatsCard {
    id: string;
    label: string;
    value: string;
}
interface StatsBlock extends BaseBlock {
    type: "stats";
    heading?: string;
    description?: string;
    columns?: number;
    cards?: StatsCard[];
}
interface ImageBlock extends BaseBlock {
    type: "image";
    imageUrl?: string;
    altText?: string;
    caption?: string;
}
interface FaqItem {
    id: string;
    question: string;
    answer: string;
}
interface FaqBlock extends BaseBlock {
    type: "faq";
    title?: string;
    items?: FaqItem[];
}
interface SplitBlock extends BaseBlock {
    type: "split";
    imageUrl?: string;
    title?: string;
    text?: string;
    ctaText?: string;
    ctaLink?: string;
    imagePosition?: "left" | "right";
}
interface GalleryImage {
    id: string;
    url: string;
    caption?: string;
}
interface GalleryBlock extends BaseBlock {
    type: "gallery";
    title?: string;
    images?: GalleryImage[];
}
interface TestimonialItem {
    id: string;
    name?: string;
    role?: string;
    quote?: string;
    photo?: string;
}
interface TestimonialsBlock extends BaseBlock {
    type: "testimonials";
    title?: string;
    items?: TestimonialItem[];
}
interface CtaBlock extends BaseBlock {
    type: "cta";
    title?: string;
    text?: string;
    buttonText?: string;
    buttonLink?: string;
    style?: "solid" | "gradient";
}
interface IconListItem {
    id: string;
    icon?: string;
    label?: string;
    text?: string;
}
interface IconListBlock extends BaseBlock {
    type: "iconList";
    title?: string;
    items?: IconListItem[];
}
interface TimelineStep {
    id: string;
    title?: string;
    description?: string;
}
interface TimelineBlock extends BaseBlock {
    type: "timeline";
    title?: string;
    steps?: TimelineStep[];
}
interface VideoBlock extends BaseBlock {
    type: "video";
    title?: string;
    videoUrl?: string;
    caption?: string;
}
interface DividerBlock extends BaseBlock {
    type: "divider";
    style?: "solid" | "dashed" | "dotted";
    thickness?: number;
}
interface SpacerBlock extends BaseBlock {
    type: "spacer";
    height?: number;
}
type ComposedPreset = "introCards" | "imageTextCta" | "statsCta" | "faqCta" | "testimonialsRating" | "galleryText";
type ComposedData = {
    preset: "introCards";
    title?: string;
    intro?: string;
    cards?: Array<{
        id: string;
        icon?: string;
        title?: string;
        text?: string;
    }>;
} | {
    preset: "imageTextCta";
    title?: string;
    text?: string;
    ctaText?: string;
    ctaLink?: string;
    imageUrl?: string;
    imagePosition?: "left" | "right";
} | {
    preset: "statsCta";
    title?: string;
    text?: string;
    ctaText?: string;
    ctaLink?: string;
    stats?: Array<{
        id: string;
        label: string;
        value: string;
    }>;
} | {
    preset: "faqCta";
    title?: string;
    ctaText?: string;
    ctaLink?: string;
    items?: Array<{
        id: string;
        question: string;
        answer: string;
    }>;
} | {
    preset: "testimonialsRating";
    title?: string;
    ratingLabel?: string;
    ratingValue?: string;
    ratingText?: string;
    items?: Array<{
        id: string;
        name?: string;
        role?: string;
        quote?: string;
        photo?: string;
    }>;
} | {
    preset: "galleryText";
    title?: string;
    text?: string;
    images?: Array<{
        id: string;
        url: string;
        caption?: string;
    }>;
};
interface ComposedBlock extends BaseBlock {
    type: "composed";
    preset?: ComposedPreset;
    data?: ComposedData;
}
type BlockType = "hero" | "text" | "stats" | "image" | "faq" | "split" | "gallery" | "testimonials" | "cta" | "iconList" | "timeline" | "video" | "divider" | "spacer" | "composed";
type Block = HeroBlock | TextBlock | StatsBlock | ImageBlock | FaqBlock | SplitBlock | GalleryBlock | TestimonialsBlock | CtaBlock | IconListBlock | TimelineBlock | VideoBlock | DividerBlock | SpacerBlock | ComposedBlock;
interface PageMetadata {
    title?: string;
    slug?: string;
    status?: "draft" | "published";
    publicationDate?: string;
    metaTitle?: string;
    metaDescription?: string;
    featuredImage?: string;
}
interface PageContent {
    blocks: Block[];
    metadata?: PageMetadata;
}

type BlockComponent<T extends Block = Block> = React.ComponentType<{
    block: T;
}>;
type BlockOfType<TType extends BlockType> = Extract<Block, {
    type: TType;
}>;
type BlockComponentMap = {
    [Key in BlockType]: BlockComponent<BlockOfType<Key>>;
};
interface PageRendererProps {
    content: PageContent | Block[];
    components?: Partial<BlockComponentMap>;
    filterHidden?: boolean;
    wrapper?: React.ElementType;
    renderUnknown?: (block: Block) => React.ReactNode;
}
declare function PageBuilderRenderer({ content, components, filterHidden, wrapper: Wrapper, renderUnknown, }: PageRendererProps): react_jsx_runtime.JSX.Element;

declare function HeroBlockView({ block }: {
    block: HeroBlock;
}): react_jsx_runtime.JSX.Element;
declare function TextBlockView({ block }: {
    block: TextBlock;
}): react_jsx_runtime.JSX.Element;
declare function StatsBlockView({ block }: {
    block: StatsBlock;
}): react_jsx_runtime.JSX.Element;
declare function ImageBlockView({ block }: {
    block: ImageBlock;
}): react_jsx_runtime.JSX.Element;
declare function FaqBlockView({ block }: {
    block: FaqBlock;
}): react_jsx_runtime.JSX.Element;
declare function SplitBlockView({ block }: {
    block: SplitBlock;
}): react_jsx_runtime.JSX.Element;
declare function GalleryBlockView({ block }: {
    block: GalleryBlock;
}): react_jsx_runtime.JSX.Element;
declare function TestimonialsBlockView({ block }: {
    block: TestimonialsBlock;
}): react_jsx_runtime.JSX.Element;
declare function CtaBlockView({ block }: {
    block: CtaBlock;
}): react_jsx_runtime.JSX.Element;
declare function IconListBlockView({ block }: {
    block: IconListBlock;
}): react_jsx_runtime.JSX.Element;
declare function TimelineBlockView({ block }: {
    block: TimelineBlock;
}): react_jsx_runtime.JSX.Element;
declare function VideoBlockView({ block }: {
    block: VideoBlock;
}): react_jsx_runtime.JSX.Element;
declare function DividerBlockView({ block }: {
    block: DividerBlock;
}): react_jsx_runtime.JSX.Element;
declare function SpacerBlockView({ block }: {
    block: SpacerBlock;
}): react_jsx_runtime.JSX.Element;
declare function ComposedBlockView({ block }: {
    block: ComposedBlock;
}): react_jsx_runtime.JSX.Element | null;

interface BuilderTheme {
    fontFamily?: string;
    primaryColor?: string;
    secondaryColor?: string;
    backgroundColor?: string;
    /** Card/panel backgrounds */
    cardColor?: string;
    /** Primary text color */
    textColor?: string;
    /** Muted/secondary text color */
    textMutedColor?: string;
    /** Border color for inputs & cards */
    borderColor?: string;
    /** Input background color */
    inputColor?: string;
}
interface PageBuilderProps {
    value?: PageContent;
    onChange?: (content: PageContent) => void;
    theme?: BuilderTheme;
    availableBlocks?: BlockType[];
    className?: string;
    style?: CSSProperties;
    onImageUpload?: (file: File) => Promise<string>;
    mode?: "edit" | "view";
    onSave?: (content: PageContent) => void | Promise<void>;
    onPublish?: (content: PageContent) => void | Promise<void>;
    saving?: boolean;
    publishing?: boolean;
}
interface BuilderState {
    blocks: Block[];
    selectedId: string | null;
}

declare function PageBuilder({ value, onChange, theme, availableBlocks, className, style, onImageUpload, mode, onSave, onPublish, saving, publishing, }: PageBuilderProps): react_jsx_runtime.JSX.Element;

export { type BackgroundType, type BaseBlock, type Block, type BlockComponent, type BlockComponentMap, type BlockType, type BuilderState, type BuilderTheme, type ComposedBlock, ComposedBlockView, type ComposedData, type ComposedPreset, type CtaBlock, CtaBlockView, type DividerBlock, DividerBlockView, type FaqBlock, FaqBlockView, type FaqItem, type GalleryBlock, GalleryBlockView, type GalleryImage, type HeroBlock, HeroBlockView, type HeroSlide, type HeroStat, type HeroVariant, type IconListBlock, IconListBlockView, type IconListItem, type ImageBlock, ImageBlockView, PageBuilder, type PageBuilderProps, PageBuilderRenderer, type PageContent, type PageMetadata, type PageRendererProps, type SpacerBlock, SpacerBlockView, type SplitBlock, SplitBlockView, type StatsBlock, StatsBlockView, type StatsCard, type TestimonialItem, type TestimonialsBlock, TestimonialsBlockView, type TextBlock, TextBlockView, type TimelineBlock, TimelineBlockView, type TimelineStep, type VideoBlock, VideoBlockView };
