import * as React from "react";
import type { BlockType } from "../types";

interface IconProps {
  size?: number;
  color?: string;
}

const iconStyle: React.CSSProperties = {
  display: "inline-block",
  flexShrink: 0,
};

export function BlockIcon({ type, size = 20, color = "#64748b" }: { type: BlockType } & IconProps) {
  switch (type) {
    case "hero":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={iconStyle}>
          <rect x="3" y="4" width="18" height="16" rx="2" stroke={color} strokeWidth="2" fill="none" />
          <rect x="6" y="7" width="12" height="10" rx="1" stroke={color} strokeWidth="1.5" fill="none" />
        </svg>
      );
    case "text":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={iconStyle}>
          <path
            d="M4 6h16M4 12h12M4 18h8"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "stats":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={iconStyle}>
          <rect x="3" y="17" width="4" height="4" rx="1" fill={color} />
          <rect x="10" y="13" width="4" height="8" rx="1" fill={color} />
          <rect x="17" y="9" width="4" height="12" rx="1" fill={color} />
        </svg>
      );
    case "image":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={iconStyle}>
          <rect x="3" y="3" width="18" height="18" rx="2" stroke={color} strokeWidth="2" fill="none" />
          <circle cx="8.5" cy="8.5" r="1.5" fill={color} />
          <path d="M21 15l-5-5L5 21" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "faq":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={iconStyle}>
          <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" fill="none" />
          <path
            d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "split":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={iconStyle}>
          <rect x="3" y="4" width="9" height="16" rx="1" stroke={color} strokeWidth="2" fill="none" />
          <rect x="12" y="4" width="9" height="16" rx="1" stroke={color} strokeWidth="2" fill="none" />
        </svg>
      );
    case "gallery":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={iconStyle}>
          <rect x="3" y="3" width="7" height="7" rx="1" stroke={color} strokeWidth="2" fill="none" />
          <rect x="14" y="3" width="7" height="7" rx="1" stroke={color} strokeWidth="2" fill="none" />
          <rect x="3" y="14" width="7" height="7" rx="1" stroke={color} strokeWidth="2" fill="none" />
          <rect x="14" y="14" width="7" height="7" rx="1" stroke={color} strokeWidth="2" fill="none" />
        </svg>
      );
    case "testimonials":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={iconStyle}>
          <path
            d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"
            stroke={color}
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"
            stroke={color}
            strokeWidth="2"
            fill="none"
          />
        </svg>
      );
    case "cta":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={iconStyle}>
          <path
            d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      );
    case "iconList":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={iconStyle}>
          <circle cx="12" cy="12" r="3" fill={color} />
          <circle cx="12" cy="5" r="2" fill={color} />
          <circle cx="12" cy="19" r="2" fill={color} />
        </svg>
      );
    case "timeline":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={iconStyle}>
          <circle cx="12" cy="5" r="2" fill={color} />
          <circle cx="12" cy="12" r="2" fill={color} />
          <circle cx="12" cy="19" r="2" fill={color} />
          <line x1="12" y1="7" x2="12" y2="10" stroke={color} strokeWidth="2" />
          <line x1="12" y1="14" x2="12" y2="17" stroke={color} strokeWidth="2" />
        </svg>
      );
    case "video":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={iconStyle}>
          <rect x="2" y="6" width="18" height="12" rx="2" stroke={color} strokeWidth="2" fill="none" />
          <path d="M10 10l4 2-4 2v-4z" fill={color} />
        </svg>
      );
    case "divider":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={iconStyle}>
          <line x1="3" y1="12" x2="21" y2="12" stroke={color} strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "spacer":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={iconStyle}>
          <line x1="12" y1="2" x2="12" y2="22" stroke={color} strokeWidth="2" strokeLinecap="round" />
          <path d="M8 6l4-4 4 4M8 18l4 4 4-4" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    default:
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={iconStyle}>
          <rect x="3" y="3" width="18" height="18" rx="2" stroke={color} strokeWidth="2" fill="none" />
        </svg>
      );
  }
}

