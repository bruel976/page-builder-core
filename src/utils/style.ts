import type { BaseBlock } from "../types";
import type { CSSProperties } from "react";

export function getBlockStyle(block: BaseBlock): CSSProperties {
  const style: CSSProperties = {};

  if (block.textColor) {
    style.color = block.textColor;
  }

  if (block.backgroundType === "solid" && block.backgroundColor) {
    style.background = block.backgroundColor;
  }

  if (block.backgroundType === "gradient" && block.backgroundGradient) {
    style.background = block.backgroundGradient;
  }

  if (block.backgroundType === "image" && block.backgroundImage) {
    style.backgroundImage = `url(${block.backgroundImage})`;
    style.backgroundSize = "cover";
    style.backgroundPosition = "center";
  }

  return style;
}
