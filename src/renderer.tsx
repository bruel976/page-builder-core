import * as React from "react";
import type { Block, BlockType, PageContent } from "./types";
import {
  ComposedBlockView,
  CtaBlockView,
  DividerBlockView,
  FaqBlockView,
  GalleryBlockView,
  HeroBlockView,
  IconListBlockView,
  ImageBlockView,
  SplitBlockView,
  SpacerBlockView,
  StatsBlockView,
  TestimonialsBlockView,
  TextBlockView,
  TimelineBlockView,
  VideoBlockView,
} from "./blocks/defaultBlocks";

export type BlockComponent<T extends Block = Block> = React.ComponentType<{ block: T }>;

type BlockOfType<TType extends BlockType> = Extract<Block, { type: TType }>;

export type BlockComponentMap = {
  [Key in BlockType]: BlockComponent<BlockOfType<Key>>;
};

const defaultComponents: BlockComponentMap = {
  hero: HeroBlockView,
  text: TextBlockView,
  stats: StatsBlockView,
  image: ImageBlockView,
  faq: FaqBlockView,
  split: SplitBlockView,
  gallery: GalleryBlockView,
  testimonials: TestimonialsBlockView,
  cta: CtaBlockView,
  iconList: IconListBlockView,
  timeline: TimelineBlockView,
  video: VideoBlockView,
  divider: DividerBlockView,
  spacer: SpacerBlockView,
  composed: ComposedBlockView,
};

export interface PageRendererProps {
  content: PageContent | Block[];
  components?: Partial<BlockComponentMap>;
  filterHidden?: boolean;
  wrapper?: React.ElementType;
  renderUnknown?: (block: Block) => React.ReactNode;
}

function resolveBlocks(content: PageContent | Block[]): Block[] {
  return Array.isArray(content) ? content : content.blocks ?? [];
}

function resolveComponent<TType extends BlockType>(
  type: TType,
  overrides?: Partial<BlockComponentMap>,
): BlockComponent<BlockOfType<TType>> | null {
  return (overrides?.[type] ?? defaultComponents[type] ?? null) as BlockComponent<BlockOfType<TType>> | null;
}

export function PageBuilderRenderer({
  content,
  components,
  filterHidden = false,
  wrapper: Wrapper = React.Fragment,
  renderUnknown,
}: PageRendererProps) {
  const blocks = resolveBlocks(content);

  return (
    <Wrapper>
      {blocks.map((block) => {
        if (filterHidden && block.visible === false) {
          return null;
        }

        const Component = resolveComponent(block.type, components);
        if (!Component) {
          return renderUnknown ? <React.Fragment key={block.id}>{renderUnknown(block)}</React.Fragment> : null;
        }

        return <Component key={block.id} block={block} />;
      })}
    </Wrapper>
  );
}
