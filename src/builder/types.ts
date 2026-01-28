import type { CSSProperties } from "react";
import type { Block, BlockType, PageContent } from "../types";

export interface BuilderTheme {
  fontFamily?: string;
  primaryColor?: string;
  secondaryColor?: string;
  backgroundColor?: string;
}

export interface PageBuilderProps {
  value?: PageContent;
  onChange?: (content: PageContent) => void;
  theme?: BuilderTheme;
  availableBlocks?: BlockType[];
  className?: string;
  style?: CSSProperties;
  onImageUpload?: (file: File) => Promise<string>;
}

export interface BuilderState {
  blocks: Block[];
  selectedId: string | null;
}
