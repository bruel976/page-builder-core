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

export type BlockComponentMap = {
  hero: BlockComponent;
  text: BlockComponent;
  stats: BlockComponent;
  image: BlockComponent;
  faq: BlockComponent;
  split: BlockComponent;
  gallery: BlockComponent;
  testimonials: BlockComponent;
  cta: BlockComponent;
  iconList: BlockComponent;
  timeline: BlockComponent;
  video: BlockComponent;
  divider: BlockComponent;
  spacer: BlockComponent;
  composed: BlockComponent;
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

function resolveComponent(type: BlockType, overrides?: Partial<BlockComponentMap>): BlockComponent | null {
  return overrides?.[type] ?? defaultComponents[type] ?? null;
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
