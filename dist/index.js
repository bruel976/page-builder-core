"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.tsx
var index_exports = {};
__export(index_exports, {
  ComposedBlockView: () => ComposedBlockView,
  CtaBlockView: () => CtaBlockView,
  DividerBlockView: () => DividerBlockView,
  FaqBlockView: () => FaqBlockView,
  GalleryBlockView: () => GalleryBlockView,
  HeroBlockView: () => HeroBlockView,
  IconListBlockView: () => IconListBlockView,
  ImageBlockView: () => ImageBlockView,
  PageBuilder: () => PageBuilder,
  PageBuilderRenderer: () => PageBuilderRenderer,
  SpacerBlockView: () => SpacerBlockView,
  SplitBlockView: () => SplitBlockView,
  StatsBlockView: () => StatsBlockView,
  TestimonialsBlockView: () => TestimonialsBlockView,
  TextBlockView: () => TextBlockView,
  TimelineBlockView: () => TimelineBlockView,
  VideoBlockView: () => VideoBlockView
});
module.exports = __toCommonJS(index_exports);

// src/renderer.tsx
var React = __toESM(require("react"));

// src/utils/style.ts
function getBlockStyle(block) {
  const style = {};
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

// src/blocks/defaultBlocks.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var sectionBaseStyle = {
  padding: "2.5rem 1rem"
};
function getHeroSectionStyle(minHeight) {
  return {
    padding: "4.5rem 1rem 5rem",
    minHeight: `${minHeight ?? 55}vh`,
    display: "flex",
    alignItems: "center"
  };
}
var contentMaxWidth = {
  maxWidth: 1200,
  margin: "0 auto"
};
var buttonStyle = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "0.35rem",
  padding: "0.85rem 1.5rem",
  borderRadius: 999,
  textDecoration: "none",
  color: "inherit",
  border: "1px solid currentColor",
  fontWeight: 600,
  fontSize: 14
};
var headingStyle = {
  margin: "0 0 0.75rem",
  fontSize: 28,
  lineHeight: 1.2
};
var subheadingStyle = {
  margin: 0,
  fontSize: 16,
  lineHeight: 1.7,
  opacity: 0.85
};
var cardStyle = {
  borderRadius: 14,
  border: "1px solid rgba(15, 23, 42, 0.08)",
  padding: "1rem",
  background: "rgba(15, 23, 42, 0.04)",
  boxShadow: "0 10px 25px rgba(15, 23, 42, 0.08)"
};
var imageStyle = {
  width: "100%",
  borderRadius: 18,
  objectFit: "cover",
  boxShadow: "0 15px 35px rgba(15, 23, 42, 0.12)"
};
function BlockSection({
  block,
  children,
  style
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", { style: { ...sectionBaseStyle, ...getBlockStyle(block), ...style }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: contentMaxWidth, children }) });
}
function HeroBlockView({ block }) {
  const layout = block.variant === "split" ? {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "2rem",
    alignItems: "center"
  } : {
    display: "grid",
    gap: "1.75rem"
  };
  const textAlign = block.textAlignment ?? "start";
  const contentAlign = block.contentAlign ?? "start";
  const textMaxWidth = 680;
  const titleSize = block.titleSize ?? 42;
  const subtitleSize = block.subtitleSize ?? 18;
  const contentPlacement = contentAlign === "center" ? { marginLeft: "auto", marginRight: "auto", justifySelf: "center" } : contentAlign === "end" ? { marginLeft: "auto", justifySelf: "end" } : { justifySelf: "start" };
  const textAlignStyle = {
    textAlign
  };
  const showImageFirst = block.variant === "split" && block.imagePosition === "left";
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BlockSection, { block, style: getHeroSectionStyle(block.minHeight), children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: layout, children: [
      showImageFirst && block.imageUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", { src: block.imageUrl, alt: block.title ?? "", style: imageStyle }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
        "div",
        {
          style: {
            ...textAlignStyle,
            display: "grid",
            gap: "1rem",
            width: "100%",
            maxWidth: textMaxWidth,
            ...contentPlacement
          },
          children: [
            block.title && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { style: { margin: 0, fontSize: titleSize, lineHeight: 1.1, fontWeight: 700 }, children: block.title }),
            block.subtitle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { style: { margin: 0, fontSize: subtitleSize, lineHeight: 1.7, opacity: 0.85 }, children: block.subtitle }),
            block.ctaText && block.ctaLink && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { display: "flex", flexWrap: "wrap", gap: "0.75rem" }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", { href: block.ctaLink, style: buttonStyle, children: block.ctaText }) }),
            block.variant === "stats" && block.stats && block.stats.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              "ul",
              {
                style: {
                  listStyle: "none",
                  margin: "0.5rem 0 0",
                  padding: 0,
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                  gap: "0.75rem"
                },
                children: block.stats.map((stat) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                  "li",
                  {
                    style: {
                      borderRadius: 12,
                      border: "1px solid rgba(255, 255, 255, 0.25)",
                      padding: "0.75rem 1rem",
                      background: "rgba(255, 255, 255, 0.12)",
                      backdropFilter: "blur(4px)"
                    },
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontSize: 22, fontWeight: 700 }, children: stat.value }),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontSize: 12, letterSpacing: 0.3, textTransform: "uppercase", opacity: 0.8 }, children: stat.label })
                    ]
                  },
                  stat.id
                ))
              }
            )
          ]
        }
      ),
      !showImageFirst && block.imageUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", { src: block.imageUrl, alt: block.title ?? "", style: imageStyle }) })
    ] }),
    block.variant === "carousel" && block.slides && block.slides.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { marginTop: "2rem", display: "grid", gap: "0.75rem" }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { style: { margin: 0, fontSize: 18 }, children: "Slides" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { style: { margin: 0, paddingLeft: "1.25rem" }, children: block.slides.map((slide) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
        slide.title && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: slide.title }),
        slide.subtitle && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
          " ",
          slide.subtitle
        ] })
      ] }, slide.id)) })
    ] })
  ] });
}
function TextBlockView({ block }) {
  const align = block.alignment ?? "start";
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BlockSection, { block, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { textAlign: align, maxWidth: 760, margin: "0 auto" }, children: [
    block.heading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { style: headingStyle, children: block.heading }),
    block.body && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { style: subheadingStyle, children: block.body })
  ] }) });
}
function StatsBlockView({ block }) {
  const columns = Math.max(1, block.columns ?? 3);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BlockSection, { block, children: [
    block.heading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { style: headingStyle, children: block.heading }),
    block.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { style: subheadingStyle, children: block.description }),
    block.cards && block.cards.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "div",
      {
        style: {
          display: "grid",
          gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
          gap: "1rem"
        },
        children: block.cards.map((card) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: cardStyle, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontSize: 24, fontWeight: 700 }, children: card.value }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { fontSize: 13, textTransform: "uppercase", letterSpacing: 0.4, opacity: 0.7 }, children: card.label })
        ] }, card.id))
      }
    )
  ] });
}
function ImageBlockView({ block }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BlockSection, { block, children: block.imageUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", { src: block.imageUrl, alt: block.altText ?? "", style: imageStyle }),
    block.caption && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("figcaption", { style: { marginTop: "0.75rem", fontSize: 13, opacity: 0.75 }, children: block.caption })
  ] }) });
}
function FaqBlockView({ block }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BlockSection, { block, children: [
    block.title && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { style: headingStyle, children: block.title }),
    block.items && block.items.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { display: "grid", gap: "0.75rem" }, children: block.items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", { style: { ...cardStyle, padding: "0.75rem 1rem" }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", { style: { cursor: "pointer", fontWeight: 600 }, children: item.question }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { style: { marginTop: "0.5rem", marginBottom: 0 }, children: item.answer })
    ] }, item.id)) })
  ] });
}
function SplitBlockView({ block }) {
  const imageFirst = block.imagePosition !== "right";
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BlockSection, { block, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "div",
    {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        gap: "2.5rem",
        alignItems: "center"
      },
      children: [
        imageFirst && block.imageUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", { src: block.imageUrl, alt: block.title ?? "", style: imageStyle }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
          block.title && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { style: headingStyle, children: block.title }),
          block.text && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { style: subheadingStyle, children: block.text }),
          block.ctaText && block.ctaLink && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", { href: block.ctaLink, style: buttonStyle, children: block.ctaText })
        ] }),
        !imageFirst && block.imageUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", { src: block.imageUrl, alt: block.title ?? "", style: imageStyle })
      ]
    }
  ) });
}
function GalleryBlockView({ block }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BlockSection, { block, children: [
    block.title && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { style: headingStyle, children: block.title }),
    block.images && block.images.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "div",
      {
        style: {
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "1rem"
        },
        children: block.images.map((image) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", { src: image.url, alt: image.caption ?? "", style: { ...imageStyle, height: 180 } }),
          image.caption && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("figcaption", { style: { marginTop: "0.5rem", fontSize: 13, opacity: 0.75 }, children: image.caption })
        ] }, image.id))
      }
    )
  ] });
}
function TestimonialCard({ item }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", { style: cardStyle, children: [
    item.quote && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("blockquote", { style: { margin: 0, fontSize: 16, lineHeight: 1.6 }, children: item.quote }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figcaption", { style: { display: "flex", alignItems: "center", gap: "0.75rem", marginTop: "1rem" }, children: [
      item.photo && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "img",
        {
          src: item.photo,
          alt: item.name ?? "",
          style: { width: 44, height: 44, borderRadius: "50%", objectFit: "cover" }
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
        item.name && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { style: { display: "block" }, children: item.name }),
        item.role && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { fontSize: 13, opacity: 0.7 }, children: item.role })
      ] })
    ] })
  ] });
}
function TestimonialsBlockView({ block }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BlockSection, { block, children: [
    block.title && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { style: headingStyle, children: block.title }),
    block.items && block.items.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "div",
      {
        style: {
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "1rem"
        },
        children: block.items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TestimonialCard, { item }, item.id))
      }
    )
  ] });
}
function CtaBlockView({ block }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BlockSection, { block, children: [
    block.title && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { style: headingStyle, children: block.title }),
    block.text && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { style: subheadingStyle, children: block.text }),
    block.buttonText && block.buttonLink && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", { href: block.buttonLink, style: buttonStyle, children: block.buttonText })
  ] });
}
function IconListBlockView({ block }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BlockSection, { block, children: [
    block.title && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { style: headingStyle, children: block.title }),
    block.items && block.items.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { style: { listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "0.75rem" }, children: block.items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { style: { display: "flex", alignItems: "flex-start", gap: "0.75rem" }, children: [
      item.icon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "span",
        {
          style: {
            width: 32,
            height: 32,
            borderRadius: 10,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(15, 23, 42, 0.08)",
            fontSize: 16
          },
          children: item.icon
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
        item.label && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { style: { display: "block" }, children: item.label }),
        item.text && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { fontSize: 14, opacity: 0.8 }, children: item.text })
      ] })
    ] }, item.id)) })
  ] });
}
function TimelineBlockView({ block }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BlockSection, { block, children: [
    block.title && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { style: headingStyle, children: block.title }),
    block.steps && block.steps.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", { style: { margin: 0, paddingLeft: "1.25rem", display: "grid", gap: "0.75rem" }, children: block.steps.map((step) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
      step.title && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: step.title }),
      step.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { style: { marginTop: "0.35rem", marginBottom: 0 }, children: step.description })
    ] }, step.id)) })
  ] });
}
function VideoBlockView({ block }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BlockSection, { block, children: [
    block.title && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { style: headingStyle, children: block.title }),
    block.videoUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { position: "relative", paddingBottom: "56.25%", height: 0 }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "iframe",
      {
        src: block.videoUrl,
        title: block.title ?? "video",
        style: { position: "absolute", top: 0, left: 0, width: "100%", height: "100%" },
        allowFullScreen: true
      }
    ) }),
    block.caption && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: block.caption })
  ] });
}
function DividerBlockView({ block }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { ...sectionBaseStyle, ...getBlockStyle(block) }, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "hr",
    {
      style: {
        borderStyle: block.style ?? "solid",
        borderWidth: block.thickness ?? 1,
        margin: 0
      }
    }
  ) });
}
function SpacerBlockView({ block }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { height: block.height ?? 24 } });
}
function renderComposedData(data) {
  switch (data.preset) {
    case "introCards":
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
        data.title && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: data.title }),
        data.intro && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: data.intro }),
        data.cards && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }, children: data.cards.map((card) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
          card.icon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: card.icon }),
          card.title && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: card.title }),
          card.text && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: card.text })
        ] }, card.id)) })
      ] });
    case "imageTextCta":
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
        "div",
        {
          style: {
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "2rem",
            alignItems: "center"
          },
          children: [
            data.imagePosition !== "right" && data.imageUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", { src: data.imageUrl, alt: data.title ?? "", style: { width: "100%" } }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
              data.title && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: data.title }),
              data.text && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: data.text }),
              data.ctaText && data.ctaLink && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", { href: data.ctaLink, style: buttonStyle, children: data.ctaText })
            ] }),
            data.imagePosition === "right" && data.imageUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", { src: data.imageUrl, alt: data.title ?? "", style: { width: "100%" } })
          ]
        }
      );
    case "statsCta":
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
        data.title && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: data.title }),
        data.text && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: data.text }),
        data.stats && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: data.stats.map((stat) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: stat.value }),
          " ",
          stat.label
        ] }, stat.id)) }),
        data.ctaText && data.ctaLink && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", { href: data.ctaLink, style: buttonStyle, children: data.ctaText })
      ] });
    case "faqCta":
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
        data.title && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: data.title }),
        data.items && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: data.items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", { children: item.question }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: item.answer })
        ] }, item.id)) }),
        data.ctaText && data.ctaLink && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", { href: data.ctaLink, style: buttonStyle, children: data.ctaText })
      ] });
    case "testimonialsRating":
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
        data.title && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: data.title }),
        data.ratingLabel && data.ratingValue && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
          data.ratingLabel,
          ": ",
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: data.ratingValue })
        ] }),
        data.ratingText && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: data.ratingText }),
        data.items && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem" }, children: data.items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TestimonialCard, { item }, item.id)) })
      ] });
    case "galleryText":
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
        data.title && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: data.title }),
        data.text && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: data.text }),
        data.images && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1rem" }, children: data.images.map((image) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", { src: image.url, alt: image.caption ?? "", style: { width: "100%" } }),
          image.caption && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("figcaption", { children: image.caption })
        ] }, image.id)) })
      ] });
    default:
      return null;
  }
}
function ComposedBlockView({ block }) {
  if (!block.data) {
    return null;
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BlockSection, { block, children: renderComposedData(block.data) });
}

// src/renderer.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
var defaultComponents = {
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
  composed: ComposedBlockView
};
function resolveBlocks(content) {
  return Array.isArray(content) ? content : content.blocks ?? [];
}
function resolveComponent(type, overrides) {
  return overrides?.[type] ?? defaultComponents[type] ?? null;
}
function PageBuilderRenderer({
  content,
  components,
  filterHidden = false,
  wrapper: Wrapper = React.Fragment,
  renderUnknown
}) {
  const blocks = resolveBlocks(content);
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Wrapper, { children: blocks.map((block) => {
    if (filterHidden && block.visible === false) {
      return null;
    }
    const Component = resolveComponent(block.type, components);
    if (!Component) {
      return renderUnknown ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(React.Fragment, { children: renderUnknown(block) }, block.id) : null;
    }
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Component, { block }, block.id);
  }) });
}

// src/builder/PageBuilder.tsx
var React2 = __toESM(require("react"));

// src/builder/defaults.ts
function createId(prefix) {
  return `${prefix}_${Math.random().toString(36).slice(2, 8)}_${Date.now().toString(36)}`;
}
function createBlock(type) {
  switch (type) {
    case "hero":
      return {
        id: createId("hero"),
        type: "hero",
        variant: "split",
        title: "Faites de vos pages un vrai levier",
        subtitle: "Cr\xE9ez des pages dynamiques, rapides \xE0 publier et faciles \xE0 faire \xE9voluer, sans toucher au code.",
        ctaText: "D\xE9couvrir l'\xE9diteur",
        ctaLink: "/contact",
        imageUrl: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1200&q=80",
        imagePosition: "right",
        textAlignment: "start",
        contentAlign: "start",
        minHeight: 55,
        titleSize: 40,
        subtitleSize: 18,
        textColor: "#ffffff",
        backgroundType: "gradient",
        backgroundGradient: "linear-gradient(120deg, #0f172a, #2563eb)"
      };
    case "text":
      return {
        id: createId("text"),
        type: "text",
        heading: "Un contenu clair et flexible",
        body: "Ajoutez, r\xE9organisez et enrichissez vos sections sans friction, tout en gardant un rendu propre c\xF4t\xE9 public.",
        alignment: "start"
      };
    case "stats":
      return {
        id: createId("stats"),
        type: "stats",
        heading: "Chiffres cl\xE9s",
        description: "Une vue d'ensemble en un coup d'\u0153il",
        columns: 3,
        cards: [
          { id: createId("stat"), label: "\xC9quipes actives", value: "120" },
          { id: createId("stat"), label: "Projets livr\xE9s", value: "24" }
        ]
      };
    case "image":
      return {
        id: createId("image"),
        type: "image",
        imageUrl: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=60",
        altText: "Bureau moderne avec \xE9cran",
        caption: "Un rendu propre et coh\xE9rent sur toutes les pages."
      };
    case "faq":
      return {
        id: createId("faq"),
        type: "faq",
        title: "FAQ",
        items: [
          { id: createId("faq"), question: "Comment fonctionne le Page Builder ?", answer: "Chaque page est assembl\xE9e \xE0 partir de blocs configurables." }
        ]
      };
    case "split":
      return {
        id: createId("split"),
        type: "split",
        title: "Un visuel qui appuie votre message",
        text: "Associez une image \xE0 un texte impactant pour structurer vos sections cl\xE9s.",
        ctaText: "Voir un exemple",
        ctaLink: "/exemple",
        imageUrl: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=900&q=60",
        imagePosition: "right"
      };
    case "gallery":
      return {
        id: createId("gallery"),
        type: "gallery",
        title: "Galerie",
        images: [
          {
            id: createId("image"),
            url: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=600&q=60",
            caption: "Mise en avant produit"
          }
        ]
      };
    case "testimonials":
      return {
        id: createId("testimonials"),
        type: "testimonials",
        title: "Ils nous font confiance",
        items: [
          {
            id: createId("t"),
            name: "Alex Martin",
            role: "CEO",
            quote: "Le builder nous a permis de livrer plus vite, sans compromis sur le design.",
            photo: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=300&q=60"
          }
        ]
      };
    case "cta":
      return {
        id: createId("cta"),
        type: "cta",
        title: "Pr\xEAt \xE0 lancer votre prochaine page ?",
        text: "Cr\xE9ez, publiez et optimisez vos contenus en quelques minutes.",
        buttonText: "Parler \xE0 un expert",
        buttonLink: "/contact",
        style: "solid"
      };
    case "iconList":
      return {
        id: createId("icon"),
        type: "iconList",
        title: "Points forts",
        items: [
          { id: createId("icon"), icon: "\u2605", label: "Rapide", text: "Un rendu fluide et optimis\xE9." },
          { id: createId("icon"), icon: "\u2713", label: "Flexible", text: "Des blocs configurables selon vos besoins." }
        ]
      };
    case "timeline":
      return {
        id: createId("timeline"),
        type: "timeline",
        title: "Timeline",
        steps: [
          { id: createId("step"), title: "Brief & contenu", description: "D\xE9finir les objectifs et la structure." },
          { id: createId("step"), title: "Construction", description: "Assembler les blocs dans l'\xE9diteur." },
          { id: createId("step"), title: "Publication", description: "Mettre en ligne et it\xE9rer." }
        ]
      };
    case "video":
      return {
        id: createId("video"),
        type: "video",
        title: "Vid\xE9o de pr\xE9sentation",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        caption: "D\xE9couvrez le flux de cr\xE9ation en moins d'une minute."
      };
    case "divider":
      return {
        id: createId("divider"),
        type: "divider",
        style: "solid",
        thickness: 1
      };
    case "spacer":
      return {
        id: createId("spacer"),
        type: "spacer",
        height: 32
      };
    case "composed":
      return {
        id: createId("composed"),
        type: "composed",
        preset: "introCards",
        data: {
          preset: "introCards",
          title: "Une intro en cartes",
          intro: "Structurez l'information pour une lecture rapide.",
          cards: [
            { id: createId("card"), title: "Carte 1", text: "Un b\xE9n\xE9fice clair et actionnable." },
            { id: createId("card"), title: "Carte 2", text: "Un d\xE9tail diff\xE9renciant qui rassure." }
          ]
        }
      };
    default:
      return {
        id: createId("block"),
        type: "text",
        heading: "Section title",
        body: "Write your content here.",
        alignment: "start"
      };
  }
}

// src/builder/icons.tsx
var import_jsx_runtime3 = require("react/jsx-runtime");
var iconStyle = {
  display: "inline-block",
  flexShrink: 0
};
function BlockIcon({ type, size = 20, color = "#64748b" }) {
  switch (type) {
    case "hero":
      return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "none", style: iconStyle, children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("rect", { x: "3", y: "4", width: "18", height: "16", rx: "2", stroke: color, strokeWidth: "2", fill: "none" }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("rect", { x: "6", y: "7", width: "12", height: "10", rx: "1", stroke: color, strokeWidth: "1.5", fill: "none" })
      ] });
    case "text":
      return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "none", style: iconStyle, children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
        "path",
        {
          d: "M4 6h16M4 12h12M4 18h8",
          stroke: color,
          strokeWidth: "2",
          strokeLinecap: "round",
          strokeLinejoin: "round"
        }
      ) });
    case "stats":
      return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "none", style: iconStyle, children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("rect", { x: "3", y: "17", width: "4", height: "4", rx: "1", fill: color }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("rect", { x: "10", y: "13", width: "4", height: "8", rx: "1", fill: color }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("rect", { x: "17", y: "9", width: "4", height: "12", rx: "1", fill: color })
      ] });
    case "image":
      return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "none", style: iconStyle, children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("rect", { x: "3", y: "3", width: "18", height: "18", rx: "2", stroke: color, strokeWidth: "2", fill: "none" }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("circle", { cx: "8.5", cy: "8.5", r: "1.5", fill: color }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("path", { d: "M21 15l-5-5L5 21", stroke: color, strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" })
      ] });
    case "faq":
      return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "none", style: iconStyle, children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("circle", { cx: "12", cy: "12", r: "10", stroke: color, strokeWidth: "2", fill: "none" }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
          "path",
          {
            d: "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01",
            stroke: color,
            strokeWidth: "2",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }
        )
      ] });
    case "split":
      return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "none", style: iconStyle, children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("rect", { x: "3", y: "4", width: "9", height: "16", rx: "1", stroke: color, strokeWidth: "2", fill: "none" }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("rect", { x: "12", y: "4", width: "9", height: "16", rx: "1", stroke: color, strokeWidth: "2", fill: "none" })
      ] });
    case "gallery":
      return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "none", style: iconStyle, children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("rect", { x: "3", y: "3", width: "7", height: "7", rx: "1", stroke: color, strokeWidth: "2", fill: "none" }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("rect", { x: "14", y: "3", width: "7", height: "7", rx: "1", stroke: color, strokeWidth: "2", fill: "none" }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("rect", { x: "3", y: "14", width: "7", height: "7", rx: "1", stroke: color, strokeWidth: "2", fill: "none" }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("rect", { x: "14", y: "14", width: "7", height: "7", rx: "1", stroke: color, strokeWidth: "2", fill: "none" })
      ] });
    case "testimonials":
      return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "none", style: iconStyle, children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
          "path",
          {
            d: "M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z",
            stroke: color,
            strokeWidth: "2",
            fill: "none"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
          "path",
          {
            d: "M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z",
            stroke: color,
            strokeWidth: "2",
            fill: "none"
          }
        )
      ] });
    case "cta":
      return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "none", style: iconStyle, children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
        "path",
        {
          d: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
          stroke: color,
          strokeWidth: "2",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          fill: "none"
        }
      ) });
    case "iconList":
      return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "none", style: iconStyle, children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("circle", { cx: "12", cy: "12", r: "3", fill: color }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("circle", { cx: "12", cy: "5", r: "2", fill: color }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("circle", { cx: "12", cy: "19", r: "2", fill: color })
      ] });
    case "timeline":
      return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "none", style: iconStyle, children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("circle", { cx: "12", cy: "5", r: "2", fill: color }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("circle", { cx: "12", cy: "12", r: "2", fill: color }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("circle", { cx: "12", cy: "19", r: "2", fill: color }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("line", { x1: "12", y1: "7", x2: "12", y2: "10", stroke: color, strokeWidth: "2" }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("line", { x1: "12", y1: "14", x2: "12", y2: "17", stroke: color, strokeWidth: "2" })
      ] });
    case "video":
      return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "none", style: iconStyle, children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("rect", { x: "2", y: "6", width: "18", height: "12", rx: "2", stroke: color, strokeWidth: "2", fill: "none" }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("path", { d: "M10 10l4 2-4 2v-4z", fill: color })
      ] });
    case "divider":
      return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "none", style: iconStyle, children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("line", { x1: "3", y1: "12", x2: "21", y2: "12", stroke: color, strokeWidth: "2", strokeLinecap: "round" }) });
    case "spacer":
      return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "none", style: iconStyle, children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("line", { x1: "12", y1: "2", x2: "12", y2: "22", stroke: color, strokeWidth: "2", strokeLinecap: "round" }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("path", { d: "M8 6l4-4 4 4M8 18l4 4 4-4", stroke: color, strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" })
      ] });
    default:
      return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "none", style: iconStyle, children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("rect", { x: "3", y: "3", width: "18", height: "18", rx: "2", stroke: color, strokeWidth: "2", fill: "none" }) });
  }
}

// src/builder/PageBuilder.tsx
var import_jsx_runtime4 = require("react/jsx-runtime");
var DEFAULT_BLOCKS = [
  "hero",
  "text",
  "stats",
  "image",
  "faq",
  "split",
  "gallery",
  "testimonials",
  "cta",
  "iconList",
  "timeline",
  "video",
  "divider",
  "spacer"
];
var BLOCK_LABELS = {
  hero: "Hero",
  text: "Texte",
  stats: "Statistiques",
  image: "Image",
  faq: "FAQ",
  split: "Split",
  gallery: "Galerie",
  testimonials: "T\xE9moignages",
  cta: "Appel \xE0 action",
  iconList: "Ic\xF4nes",
  timeline: "Timeline",
  video: "Vid\xE9o",
  divider: "S\xE9parateur",
  spacer: "Espace",
  composed: "Composed"
};
function useBuilderState(value) {
  const [blocks, setBlocks] = React2.useState(value?.blocks ?? []);
  const [selectedId, setSelectedId] = React2.useState(
    value?.blocks?.[0]?.id ?? null
  );
  React2.useEffect(() => {
    if (value?.blocks) {
      setBlocks(value.blocks);
      if (value.blocks.length === 0) {
        setSelectedId(null);
      } else if (!value.blocks.find((block) => block.id === selectedId)) {
        setSelectedId(value.blocks[0]?.id ?? null);
      }
    }
  }, [value]);
  return { blocks, setBlocks, selectedId, setSelectedId };
}
function applyTheme(theme) {
  const style = {
    fontFamily: theme?.fontFamily ?? "Manrope, system-ui, sans-serif",
    backgroundColor: theme?.backgroundColor ?? "#f8fafc"
  };
  style["--pb-primary"] = theme?.primaryColor ?? "#2563eb";
  style["--pb-secondary"] = theme?.secondaryColor ?? "#9333ea";
  return style;
}
function arrayMove(list, from, to) {
  const copy = [...list];
  const [item] = copy.splice(from, 1);
  if (!item) return list;
  copy.splice(to, 0, item);
  return copy;
}
function FieldLabel({ children }) {
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("label", { style: { fontSize: 13, fontWeight: 600, color: "#0f172a", fontFamily: "inherit" }, children });
}
function LanguageTabs({
  activeLang,
  onChange
}) {
  const languages = [
    { code: "fr", label: "Fran\xE7ais" },
    { code: "shi", label: "Shimaore" },
    { code: "buc", label: "Shibushi" }
  ];
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { style: { display: "flex", gap: 4, marginBottom: 8 }, children: languages.map((lang) => /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
    "button",
    {
      type: "button",
      onClick: () => onChange(lang.code),
      style: {
        padding: "0.25rem 0.5rem",
        borderRadius: 6,
        border: "none",
        background: activeLang === lang.code ? "#f1f5f9" : "transparent",
        color: activeLang === lang.code ? "#0f172a" : "#64748b",
        cursor: "pointer",
        fontSize: 12,
        fontWeight: activeLang === lang.code ? 600 : 400
      },
      children: lang.label
    },
    lang.code
  )) });
}
function MultilingualTextField({
  label,
  value,
  onChange,
  placeholder
}) {
  const [activeLang, setActiveLang] = React2.useState("fr");
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { style: { display: "grid", gap: 6 }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(FieldLabel, { children: label }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(LanguageTabs, { activeLang, onChange: setActiveLang }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
      "input",
      {
        value: value ?? "",
        onChange: (event) => onChange(event.target.value),
        placeholder,
        style: inputStyle
      }
    )
  ] });
}
function TextField({
  label,
  value,
  onChange,
  placeholder,
  multilingual
}) {
  const [focused, setFocused] = React2.useState(false);
  if (multilingual) {
    return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(MultilingualTextField, { label, value, onChange, placeholder });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { style: { display: "grid", gap: 6, minWidth: 0 }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(FieldLabel, { children: label }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
      "input",
      {
        value: value ?? "",
        onChange: (event) => onChange(event.target.value),
        placeholder,
        style: focused ? inputStyleFocus : inputStyle,
        onFocus: () => setFocused(true),
        onBlur: () => setFocused(false)
      }
    )
  ] });
}
function TextAreaField({
  label,
  value,
  onChange,
  rows = 3,
  multilingual,
  placeholder
}) {
  const [focused, setFocused] = React2.useState(false);
  const [activeLang, setActiveLang] = React2.useState("fr");
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { style: { display: "grid", gap: 6, minWidth: 0 }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(FieldLabel, { children: label }),
    multilingual && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(LanguageTabs, { activeLang, onChange: setActiveLang }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
      "textarea",
      {
        value: value ?? "",
        onChange: (event) => onChange(event.target.value),
        rows,
        placeholder,
        style: {
          ...focused ? inputStyleFocus : inputStyle,
          resize: "vertical",
          fontFamily: "inherit"
        },
        onFocus: () => setFocused(true),
        onBlur: () => setFocused(false)
      }
    )
  ] });
}
function NumberField({
  label,
  value,
  onChange,
  min,
  max
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { style: { display: "grid", gap: 6 }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(FieldLabel, { children: label }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
      "input",
      {
        type: "number",
        value: value ?? 0,
        onChange: (event) => onChange(Number(event.target.value)),
        min,
        max,
        style: inputStyle
      }
    )
  ] });
}
function SelectField({
  label,
  value,
  options,
  onChange
}) {
  const [focused, setFocused] = React2.useState(false);
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { style: { display: "grid", gap: 6 }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(FieldLabel, { children: label }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
      "select",
      {
        value: value ?? "",
        onChange: (event) => onChange(event.target.value),
        style: focused ? inputStyleFocus : inputStyle,
        onFocus: () => setFocused(true),
        onBlur: () => setFocused(false),
        children: options.map((option) => /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("option", { value: option.value, children: option.label }, option.value))
      }
    )
  ] });
}
function ColorField({
  label,
  value,
  onChange
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { style: { display: "grid", gap: 6 }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(FieldLabel, { children: label }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
      "input",
      {
        type: "color",
        value: value ?? "#000000",
        onChange: (event) => onChange(event.target.value),
        style: { height: 36, width: 64, borderRadius: 8, border: "1px solid #e2e8f0" }
      }
    )
  ] });
}
function ImageUploadField({
  label,
  value,
  onChange,
  onUpload
}) {
  const [preview, setPreview] = React2.useState(value ?? null);
  const [uploading, setUploading] = React2.useState(false);
  const fileInputRef = React2.useRef(null);
  React2.useEffect(() => {
    if (value) {
      setPreview(value);
    }
  }, [value]);
  const handleFileSelect = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Veuillez s\xE9lectionner un fichier image");
      return;
    }
    if (onUpload) {
      setUploading(true);
      try {
        const url = await onUpload(file);
        onChange(url);
        setPreview(url);
      } catch (error) {
        alert("Erreur lors de l'upload de l'image");
        console.error(error);
      } finally {
        setUploading(false);
      }
    } else {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result;
        onChange(base64);
        setPreview(base64);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleRemove = () => {
    onChange("");
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { style: { display: "grid", gap: 8 }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(FieldLabel, { children: label }),
    preview && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { style: { position: "relative", width: "100%" }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
        "img",
        {
          src: preview,
          alt: "Aper\xE7u",
          style: {
            width: "100%",
            maxHeight: 200,
            objectFit: "contain",
            borderRadius: 8,
            border: "1px solid #e2e8f0"
          }
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
        "button",
        {
          type: "button",
          onClick: handleRemove,
          style: {
            position: "absolute",
            top: 8,
            right: 8,
            padding: "0.25rem 0.5rem",
            borderRadius: 6,
            border: "none",
            background: "rgba(0, 0, 0, 0.7)",
            color: "#fff",
            cursor: "pointer",
            fontSize: 12
          },
          children: "\u2715 Supprimer"
        }
      )
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { style: { display: "flex", gap: 8, alignItems: "center" }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
        "input",
        {
          ref: fileInputRef,
          type: "file",
          accept: "image/*",
          onChange: handleFileSelect,
          disabled: uploading,
          style: { display: "none" },
          id: `image-upload-${label}`
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
        "label",
        {
          htmlFor: `image-upload-${label}`,
          style: {
            padding: "0.5rem 1rem",
            borderRadius: 8,
            border: "1px solid #e2e8f0",
            background: uploading ? "#f1f5f9" : "#fff",
            cursor: uploading ? "not-allowed" : "pointer",
            fontSize: 14,
            fontWeight: 500,
            display: "inline-block",
            color: uploading ? "#94a3b8" : "#0f172a"
          },
          children: uploading ? "Upload en cours..." : preview ? "Changer l'image" : "Choisir une image"
        }
      )
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { style: { display: "grid", gap: 6 }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("label", { style: { fontSize: 12, color: "#64748b" }, children: "Ou entrer une URL" }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
        "input",
        {
          type: "text",
          value: value ?? "",
          onChange: (e) => {
            onChange(e.target.value);
            setPreview(e.target.value || null);
          },
          placeholder: "https://images.example.com/hero.jpg",
          style: inputStyle
        }
      )
    ] })
  ] });
}
function GradientField({
  label,
  value,
  onChange
}) {
  const parseGradient = (gradient) => {
    if (!gradient) {
      return { color1: "#0f172a", color2: "#2563eb", direction: "120deg" };
    }
    const match = gradient.match(/linear-gradient\((\d+)deg,\s*(#[0-9a-fA-F]{6}|#[0-9a-fA-F]{3}|rgb\([^)]+\)|rgba\([^)]+\)),\s*(#[0-9a-fA-F]{6}|#[0-9a-fA-F]{3}|rgb\([^)]+\)|rgba\([^)]+\))\)/);
    if (match) {
      return {
        direction: `${match[1]}deg`,
        color1: match[2],
        color2: match[3]
      };
    }
    return { color1: "#0f172a", color2: "#2563eb", direction: "120deg" };
  };
  const [gradientState, setGradientState] = React2.useState(() => parseGradient(value));
  React2.useEffect(() => {
    setGradientState(parseGradient(value));
  }, [value]);
  const updateGradient = (updates) => {
    const newState = { ...gradientState, ...updates };
    setGradientState(newState);
    const direction = newState.direction.replace("deg", "");
    onChange(`linear-gradient(${direction}deg, ${newState.color1}, ${newState.color2})`);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { style: { display: "grid", gap: 8 }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(FieldLabel, { children: label }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { style: { display: "grid", gap: 8 }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { style: { display: "flex", alignItems: "center", gap: 12 }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { style: { display: "grid", gap: 4 }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("label", { style: { fontSize: 12, color: "#64748b" }, children: "Couleur 1" }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { style: { display: "flex", alignItems: "center", gap: 8 }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
              "input",
              {
                type: "color",
                value: gradientState.color1,
                onChange: (e) => updateGradient({ color1: e.target.value }),
                style: { height: 40, width: 60, borderRadius: 8, border: "1px solid #e2e8f0", cursor: "pointer" }
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
              "div",
              {
                style: {
                  flex: 1,
                  height: 40,
                  borderRadius: 8,
                  background: gradientState.color1,
                  border: "1px solid #e2e8f0"
                }
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { style: { display: "grid", gap: 4 }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("label", { style: { fontSize: 12, color: "#64748b" }, children: "Couleur 2" }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { style: { display: "flex", alignItems: "center", gap: 8 }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
              "input",
              {
                type: "color",
                value: gradientState.color2,
                onChange: (e) => updateGradient({ color2: e.target.value }),
                style: { height: 40, width: 60, borderRadius: 8, border: "1px solid #e2e8f0", cursor: "pointer" }
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
              "div",
              {
                style: {
                  flex: 1,
                  height: 40,
                  borderRadius: 8,
                  background: gradientState.color2,
                  border: "1px solid #e2e8f0"
                }
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { style: { display: "grid", gap: 6 }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("label", { style: { fontSize: 12, color: "#64748b" }, children: "Direction" }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
          SelectField,
          {
            label: "",
            value: gradientState.direction,
            options: [
              { value: "0deg", label: "\u2192 Droite" },
              { value: "45deg", label: "\u2197 Diagonale (haut-droite)" },
              { value: "90deg", label: "\u2191 Haut" },
              { value: "135deg", label: "\u2196 Diagonale (haut-gauche)" },
              { value: "180deg", label: "\u2190 Gauche" },
              { value: "225deg", label: "\u2199 Diagonale (bas-gauche)" },
              { value: "270deg", label: "\u2193 Bas" },
              { value: "315deg", label: "\u2198 Diagonale (bas-droite)" },
              { value: "120deg", label: "\u2197 Diagonale (d\xE9faut)" }
            ],
            onChange: (value2) => updateGradient({ direction: value2 })
          }
        )
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
        "div",
        {
          style: {
            height: 60,
            borderRadius: 8,
            background: `linear-gradient(${gradientState.direction}, ${gradientState.color1}, ${gradientState.color2})`,
            border: "1px solid #e2e8f0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 12,
            color: "#64748b"
          },
          children: "Aper\xE7u du gradient"
        }
      )
    ] })
  ] });
}
var inputStyle = {
  padding: "0.6rem 0.75rem",
  borderRadius: 8,
  border: "1px solid #e2e8f0",
  fontSize: 14,
  background: "#fff",
  color: "#0f172a",
  width: "100%",
  maxWidth: "100%",
  boxSizing: "border-box",
  transition: "border-color 0.2s",
  fontFamily: "inherit"
};
var inputStyleFocus = {
  ...inputStyle,
  outline: "none",
  borderColor: "var(--pb-primary)",
  boxShadow: "0 0 0 3px color-mix(in srgb, var(--pb-primary) 10%, transparent)"
};
var panelStyle = {
  background: "#ffffff",
  border: "1px solid #e2e8f0",
  borderRadius: 12,
  padding: "1rem",
  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)"
};
var actionButton = {
  borderRadius: 8,
  border: "1px solid #e2e8f0",
  padding: "0.4rem 0.6rem",
  background: "#fff",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 14,
  transition: "all 0.2s",
  fontFamily: "inherit"
};
var iconButton = {
  ...actionButton,
  padding: "0.35rem",
  width: 28,
  height: 28,
  border: "none",
  background: "transparent",
  color: "#64748b"
};
function blockCard(isActive) {
  return {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "0.75rem",
    borderRadius: 10,
    border: isActive ? "2px solid var(--pb-primary)" : "1px solid #e2e8f0",
    background: "#fff",
    cursor: "pointer",
    position: "relative",
    outline: isActive ? "none" : void 0,
    boxShadow: isActive ? "0 0 0 3px color-mix(in srgb, var(--pb-primary) 8%, transparent)" : "none",
    transition: "all 0.2s"
  };
}
function SectionTitle({ children }) {
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("h3", { style: { margin: 0, fontSize: 14, fontWeight: 600, color: "#0f172a", fontFamily: "inherit" }, children });
}
function DragHandle() {
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { style: { cursor: "grab", display: "flex", gap: 2, padding: "0.25rem" }, children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("svg", { width: "12", height: "12", viewBox: "0 0 12 12", fill: "none", children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("circle", { cx: "2", cy: "2", r: "1", fill: "#94a3b8" }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("circle", { cx: "6", cy: "2", r: "1", fill: "#94a3b8" }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("circle", { cx: "10", cy: "2", r: "1", fill: "#94a3b8" }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("circle", { cx: "2", cy: "6", r: "1", fill: "#94a3b8" }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("circle", { cx: "6", cy: "6", r: "1", fill: "#94a3b8" }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("circle", { cx: "10", cy: "6", r: "1", fill: "#94a3b8" }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("circle", { cx: "2", cy: "10", r: "1", fill: "#94a3b8" }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("circle", { cx: "6", cy: "10", r: "1", fill: "#94a3b8" }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("circle", { cx: "10", cy: "10", r: "1", fill: "#94a3b8" })
  ] }) });
}
function EyeIcon({ visible }) {
  if (visible) {
    return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { d: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("circle", { cx: "12", cy: "12", r: "3" })
    ] });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { d: "M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("line", { x1: "1", y1: "1", x2: "23", y2: "23" })
  ] });
}
function BlockEditor({
  block,
  onChange,
  onImageUpload
}) {
  const update = (patch) => onChange({ ...block, ...patch });
  const renderCommon = () => /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { style: { display: "grid", gap: 12 }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
      SelectField,
      {
        label: "Background",
        value: block.backgroundType ?? "solid",
        options: [
          { value: "solid", label: "Couleur" },
          { value: "gradient", label: "Gradient" },
          { value: "image", label: "Image" }
        ],
        onChange: (value) => update({ backgroundType: value })
      }
    ),
    block.backgroundType === "solid" && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
      ColorField,
      {
        label: "Couleur",
        value: block.backgroundColor,
        onChange: (value) => update({ backgroundColor: value })
      }
    ),
    block.backgroundType === "gradient" && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
      GradientField,
      {
        label: "Gradient",
        value: block.backgroundGradient,
        onChange: (value) => update({ backgroundGradient: value })
      }
    ),
    block.backgroundType === "image" && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
      ImageUploadField,
      {
        label: "Image de fond",
        value: block.backgroundImage,
        onChange: (value) => update({ backgroundImage: value }),
        onUpload: onImageUpload
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
      ColorField,
      {
        label: "Couleur du texte",
        value: block.textColor,
        onChange: (value) => update({ textColor: value })
      }
    )
  ] });
  switch (block.type) {
    case "hero": {
      const hero = block;
      const moveSlide = (from, to) => {
        if (from < 0 || to < 0 || from >= (hero.slides?.length ?? 0) || to >= (hero.slides?.length ?? 0)) return;
        const next = arrayMove(hero.slides ?? [], from, to);
        update({ slides: next });
      };
      const removeSlide = (id) => {
        update({ slides: (hero.slides ?? []).filter((s) => s.id !== id) });
      };
      return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { style: { display: "grid", gap: 16 }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
          SelectField,
          {
            label: "Variant",
            value: hero.variant ?? "simple",
            options: [
              { value: "simple", label: "Simple" },
              { value: "split", label: "Split" },
              { value: "cover", label: "Cover" },
              { value: "video", label: "Video" },
              { value: "stats", label: "Stats" },
              { value: "carousel", label: "Carousel" }
            ],
            onChange: (value) => update({ variant: value })
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
          TextField,
          {
            label: "Titre",
            value: hero.title,
            onChange: (value) => update({ title: value }),
            placeholder: "Un titre clair et impactant"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
          TextAreaField,
          {
            label: "Sous-titre",
            value: hero.subtitle,
            onChange: (value) => update({ subtitle: value }),
            placeholder: "Expliquez votre proposition de valeur en une ou deux phrases."
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
          SelectField,
          {
            label: "Alignement du texte",
            value: hero.textAlignment ?? "start",
            options: [
              { value: "start", label: "D\xE9but (gauche)" },
              { value: "center", label: "Centre" },
              { value: "end", label: "Fin (droite)" }
            ],
            onChange: (value) => update({ textAlignment: value })
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
          SelectField,
          {
            label: "Position du bloc texte",
            value: hero.contentAlign ?? "start",
            options: [
              { value: "start", label: "Gauche" },
              { value: "center", label: "Centre" },
              { value: "end", label: "Droite" }
            ],
            onChange: (value) => update({ contentAlign: value })
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
          NumberField,
          {
            label: "Hauteur du hero (vh)",
            value: hero.minHeight ?? 55,
            onChange: (value) => update({ minHeight: value }),
            min: 30,
            max: 100
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
          NumberField,
          {
            label: "Taille du titre (px)",
            value: hero.titleSize ?? 42,
            onChange: (value) => update({ titleSize: value }),
            min: 24,
            max: 90
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
          NumberField,
          {
            label: "Taille du sous-titre (px)",
            value: hero.subtitleSize ?? 18,
            onChange: (value) => update({ subtitleSize: value }),
            min: 12,
            max: 40
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
          TextField,
          {
            label: "CTA",
            value: hero.ctaText,
            onChange: (value) => update({ ctaText: value }),
            placeholder: "D\xE9couvrir"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
          TextField,
          {
            label: "Lien",
            value: hero.ctaLink,
            onChange: (value) => update({ ctaLink: value }),
            placeholder: "/contact"
          }
        ),
        (hero.variant === "split" || hero.variant === "cover" || hero.variant === "simple") && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(import_jsx_runtime4.Fragment, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
            ImageUploadField,
            {
              label: "Image",
              value: hero.imageUrl,
              onChange: (value) => update({ imageUrl: value }),
              onUpload: onImageUpload
            }
          ),
          hero.variant === "split" && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
            SelectField,
            {
              label: "Position image",
              value: hero.imagePosition ?? "left",
              options: [
                { value: "left", label: "Gauche" },
                { value: "right", label: "Droite" }
              ],
              onChange: (value) => update({ imagePosition: value })
            }
          )
        ] }),
        (hero.variant === "video" || hero.variant === "cover") && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
          TextField,
          {
            label: "URL Vid\xE9o",
            value: hero.videoUrl,
            onChange: (value) => update({ videoUrl: value }),
            placeholder: "https://www.youtube.com/embed/..."
          }
        ),
        hero.variant === "stats" && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { style: { display: "grid", gap: 8 }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(SectionTitle, { children: "Stats" }),
          hero.stats && hero.stats.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { style: { display: "grid", gap: 8 }, children: hero.stats.map((stat, index) => /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { style: { display: "grid", gap: 6 }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
              TextField,
              {
                label: "Label",
                value: stat.label,
                onChange: (value) => {
                  const next = [...hero.stats];
                  next[index] = { ...stat, label: value };
                  update({ stats: next });
                },
                placeholder: "Clients actifs"
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
              TextField,
              {
                label: "Valeur",
                value: stat.value,
                onChange: (value) => {
                  const next = [...hero.stats];
                  next[index] = { ...stat, value };
                  update({ stats: next });
                },
                placeholder: "120"
              }
            )
          ] }, stat.id)) }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
            "button",
            {
              type: "button",
              style: {
                ...actionButton,
                padding: "0.5rem 0.75rem",
                fontSize: 13,
                fontWeight: 500,
                borderStyle: "dashed",
                borderColor: "#cbd5e1",
                background: "#f8fafc",
                color: "#64748b"
              },
              onClick: () => update({
                stats: [...hero.stats ?? [], { id: createId("stat"), label: "Label", value: "0" }]
              }),
              children: "+ Ajouter une stat"
            }
          )
        ] }),
        hero.variant === "carousel" && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { style: { display: "grid", gap: 8 }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(SectionTitle, { children: "Slides" }),
          hero.slides && hero.slides.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { style: { display: "grid", gap: 8 }, children: hero.slides.map((slide, index) => /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
            "div",
            {
              style: {
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "0.75rem",
                borderRadius: 8,
                border: "1px solid #e2e8f0",
                background: "#f8fafc"
              },
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(DragHandle, {}),
                /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { style: { flex: 1, display: "grid", gap: 6 }, children: [
                  /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                    TextField,
                    {
                      label: "",
                      value: slide.title ?? "",
                      onChange: (value) => {
                        const next = [...hero.slides ?? []];
                        next[index] = { ...slide, title: value };
                        update({ slides: next });
                      },
                      placeholder: "Titre"
                    }
                  ),
                  /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                    TextField,
                    {
                      label: "",
                      value: slide.subtitle ?? "",
                      onChange: (value) => {
                        const next = [...hero.slides ?? []];
                        next[index] = { ...slide, subtitle: value };
                        update({ slides: next });
                      },
                      placeholder: "Sous-titre"
                    }
                  ),
                  /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                    ImageUploadField,
                    {
                      label: "",
                      value: slide.imageUrl ?? "",
                      onChange: (value) => {
                        const next = [...hero.slides ?? []];
                        next[index] = { ...slide, imageUrl: value };
                        update({ slides: next });
                      },
                      onUpload: onImageUpload
                    }
                  ),
                  /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                    TextField,
                    {
                      label: "",
                      value: slide.ctaText ?? "",
                      onChange: (value) => {
                        const next = [...hero.slides ?? []];
                        next[index] = { ...slide, ctaText: value };
                        update({ slides: next });
                      },
                      placeholder: "Texte CTA"
                    }
                  ),
                  /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                    TextField,
                    {
                      label: "",
                      value: slide.ctaLink ?? "",
                      onChange: (value) => {
                        const next = [...hero.slides ?? []];
                        next[index] = { ...slide, ctaLink: value };
                        update({ slides: next });
                      },
                      placeholder: "Lien CTA"
                    }
                  )
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { style: { display: "flex", gap: 4, flexDirection: "column" }, children: [
                  /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                    "button",
                    {
                      type: "button",
                      style: iconButton,
                      onClick: () => moveSlide(index, index - 1),
                      disabled: index === 0,
                      title: "D\xE9placer vers le haut",
                      children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { d: "M18 15l-6-6-6 6" }) })
                    }
                  ),
                  /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                    "button",
                    {
                      type: "button",
                      style: iconButton,
                      onClick: () => moveSlide(index, index + 1),
                      disabled: index === (hero.slides?.length ?? 0) - 1,
                      title: "D\xE9placer vers le bas",
                      children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { d: "M6 9l6 6 6-6" }) })
                    }
                  ),
                  /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                    "button",
                    {
                      type: "button",
                      style: iconButton,
                      onClick: () => removeSlide(slide.id),
                      title: "Supprimer",
                      children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { d: "M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" }) })
                    }
                  )
                ] })
              ]
            },
            slide.id
          )) }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
            "button",
            {
              type: "button",
              style: {
                ...actionButton,
                padding: "0.5rem 0.75rem",
                fontSize: 13,
                fontWeight: 500,
                borderStyle: "dashed",
                borderColor: "#cbd5e1",
                background: "#f8fafc",
                color: "#64748b"
              },
              onClick: () => update({
                slides: [
                  ...hero.slides ?? [],
                  { id: createId("slide"), title: "", subtitle: "", imageUrl: "", ctaText: "", ctaLink: "" }
                ]
              }),
              children: "+ Ajouter un slide"
            }
          )
        ] }),
        renderCommon()
      ] });
    }
    case "text": {
      const text = block;
      return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { style: { display: "grid", gap: 16 }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
          TextField,
          {
            label: "Titre",
            value: text.heading,
            onChange: (value) => update({ heading: value }),
            placeholder: "Un titre pour cette section"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
          TextAreaField,
          {
            label: "Texte",
            value: text.body,
            onChange: (value) => update({ body: value }),
            placeholder: "Pr\xE9sentez votre message en quelques lignes."
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
          SelectField,
          {
            label: "Alignement",
            value: text.alignment ?? "start",
            options: [
              { value: "start", label: "Gauche" },
              { value: "center", label: "Centre" },
              { value: "end", label: "Droite" }
            ],
            onChange: (value) => update({ alignment: value })
          }
        ),
        renderCommon()
      ] });
    }
    case "stats": {
      const stats = block;
      const moveCard = (from, to) => {
        if (from < 0 || to < 0 || from >= (stats.cards?.length ?? 0) || to >= (stats.cards?.length ?? 0)) return;
        const next = arrayMove(stats.cards ?? [], from, to);
        update({ cards: next });
      };
      const removeCard = (id) => {
        update({ cards: (stats.cards ?? []).filter((c) => c.id !== id) });
      };
      return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { style: { display: "grid", gap: 16 }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
          TextField,
          {
            label: "Titre de la section",
            value: stats.heading,
            onChange: (value) => update({ heading: value }),
            multilingual: true,
            placeholder: "Chiffres cl\xE9s"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
          TextAreaField,
          {
            label: "Sous-titre",
            value: stats.description,
            onChange: (value) => update({ description: value }),
            multilingual: true,
            placeholder: "Une courte phrase pour contextualiser les statistiques."
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
          SelectField,
          {
            label: "Nombre de colonnes",
            value: String(stats.columns ?? 3),
            options: [
              { value: "1", label: "1 colonne" },
              { value: "2", label: "2 colonnes" },
              { value: "3", label: "3 colonnes" },
              { value: "4", label: "4 colonnes" }
            ],
            onChange: (value) => update({ columns: Number(value) })
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { style: { display: "grid", gap: 12 }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between" }, children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(SectionTitle, { children: [
            "Cartes (",
            stats.cards?.length ?? 0,
            ")"
          ] }) }),
          stats.cards && stats.cards.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { style: { display: "grid", gap: 8 }, children: stats.cards.map((card, index) => /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
            "div",
            {
              style: {
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "0.75rem",
                borderRadius: 8,
                border: "1px solid #e2e8f0",
                background: "#f8fafc"
              },
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(DragHandle, {}),
                /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { style: { flex: 1, display: "grid", gap: 6 }, children: [
                  /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                    TextField,
                    {
                      label: "",
                      value: card.label,
                      onChange: (value) => {
                        const next = [...stats.cards ?? []];
                        next[index] = { ...card, label: value };
                        update({ cards: next });
                      },
                      placeholder: "Label (ex: Clients actifs)"
                    }
                  ),
                  /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                    TextField,
                    {
                      label: "",
                      value: card.value,
                      onChange: (value) => {
                        const next = [...stats.cards ?? []];
                        next[index] = { ...card, value };
                        update({ cards: next });
                      },
                      placeholder: "Valeur (ex: 120)"
                    }
                  )
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { style: { display: "flex", gap: 4, flexDirection: "column" }, children: [
                  /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                    "button",
                    {
                      type: "button",
                      style: iconButton,
                      onClick: () => moveCard(index, index - 1),
                      disabled: index === 0,
                      title: "D\xE9placer vers le haut",
                      children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { d: "M18 15l-6-6-6 6" }) })
                    }
                  ),
                  /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                    "button",
                    {
                      type: "button",
                      style: iconButton,
                      onClick: () => moveCard(index, index + 1),
                      disabled: index === (stats.cards?.length ?? 0) - 1,
                      title: "D\xE9placer vers le bas",
                      children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { d: "M6 9l6 6 6-6" }) })
                    }
                  ),
                  /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                    "button",
                    {
                      type: "button",
                      style: iconButton,
                      onClick: () => removeCard(card.id),
                      title: "Supprimer",
                      children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { d: "M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" }) })
                    }
                  )
                ] })
              ]
            },
            card.id
          )) }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
            "button",
            {
              type: "button",
              style: {
                ...actionButton,
                padding: "0.5rem 0.75rem",
                fontSize: 13,
                fontWeight: 500,
                borderStyle: "dashed",
                borderColor: "#cbd5e1",
                background: "#f8fafc",
                color: "#64748b"
              },
              onClick: () => update({
                cards: [...stats.cards ?? [], { id: createId("stat"), label: "Service", value: "Description" }]
              }),
              children: "+ Ajouter une carte"
            }
          )
        ] }),
        renderCommon()
      ] });
    }
    case "image": {
      const image = block;
      return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { style: { display: "grid", gap: 16 }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
          ImageUploadField,
          {
            label: "Image",
            value: image.imageUrl,
            onChange: (value) => update({ imageUrl: value }),
            onUpload: onImageUpload
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
          TextField,
          {
            label: "Alt",
            value: image.altText,
            onChange: (value) => update({ altText: value }),
            placeholder: "D\xE9crivez l'image pour l'accessibilit\xE9"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
          TextField,
          {
            label: "Legende",
            value: image.caption,
            onChange: (value) => update({ caption: value }),
            placeholder: "Une l\xE9gende courte et informative"
          }
        ),
        renderCommon()
      ] });
    }
    case "faq": {
      const faq = block;
      return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { style: { display: "grid", gap: 16 }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
          TextField,
          {
            label: "Titre",
            value: faq.title,
            onChange: (value) => update({ title: value }),
            placeholder: "Questions fr\xE9quentes"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { style: { display: "grid", gap: 8 }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(SectionTitle, { children: "Questions" }),
          faq.items?.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { style: { display: "grid", gap: 6 }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
              TextField,
              {
                label: "Question",
                value: item.question,
                onChange: (value) => {
                  const next = [...faq.items ?? []];
                  next[index] = { ...item, question: value };
                  update({ items: next });
                },
                placeholder: "Ex: Puis-je personnaliser les blocs ?"
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
              TextAreaField,
              {
                label: "Reponse",
                value: item.answer,
                onChange: (value) => {
                  const next = [...faq.items ?? []];
                  next[index] = { ...item, answer: value };
                  update({ items: next });
                },
                placeholder: "R\xE9ponse claire et concise."
              }
            )
          ] }, item.id)),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
            "button",
            {
              type: "button",
              style: actionButton,
              onClick: () => update({
                items: [...faq.items ?? [], { id: createId("faq"), question: "Question", answer: "" }]
              }),
              children: "Ajouter une question"
            }
          )
        ] }),
        renderCommon()
      ] });
    }
    case "split": {
      const split = block;
      return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { style: { display: "grid", gap: 16 }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
          TextField,
          {
            label: "Titre",
            value: split.title,
            onChange: (value) => update({ title: value }),
            placeholder: "Mettez en avant un b\xE9n\xE9fice cl\xE9"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
          TextAreaField,
          {
            label: "Texte",
            value: split.text,
            onChange: (value) => update({ text: value }),
            placeholder: "D\xE9crivez en quelques phrases."
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
          TextField,
          {
            label: "CTA",
            value: split.ctaText,
            onChange: (value) => update({ ctaText: value }),
            placeholder: "Voir l'offre"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
          TextField,
          {
            label: "Lien",
            value: split.ctaLink,
            onChange: (value) => update({ ctaLink: value }),
            placeholder: "/offre"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
          ImageUploadField,
          {
            label: "Image",
            value: split.imageUrl,
            onChange: (value) => update({ imageUrl: value }),
            onUpload: onImageUpload
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
          SelectField,
          {
            label: "Position image",
            value: split.imagePosition ?? "left",
            options: [
              { value: "left", label: "Gauche" },
              { value: "right", label: "Droite" }
            ],
            onChange: (value) => update({ imagePosition: value })
          }
        ),
        renderCommon()
      ] });
    }
    case "gallery": {
      const gallery = block;
      return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { style: { display: "grid", gap: 16 }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
          TextField,
          {
            label: "Titre",
            value: gallery.title,
            onChange: (value) => update({ title: value }),
            placeholder: "Galerie"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { style: { display: "grid", gap: 8 }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(SectionTitle, { children: "Images" }),
          gallery.images?.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { style: { display: "grid", gap: 6 }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
              ImageUploadField,
              {
                label: "Image",
                value: item.url,
                onChange: (value) => {
                  const next = [...gallery.images ?? []];
                  next[index] = { ...item, url: value };
                  update({ images: next });
                },
                onUpload: onImageUpload
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
              TextField,
              {
                label: "Legende",
                value: item.caption,
                onChange: (value) => {
                  const next = [...gallery.images ?? []];
                  next[index] = { ...item, caption: value };
                  update({ images: next });
                },
                placeholder: "Court descriptif"
              }
            )
          ] }, item.id)),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
            "button",
            {
              type: "button",
              style: actionButton,
              onClick: () => update({
                images: [...gallery.images ?? [], { id: createId("img"), url: "", caption: "" }]
              }),
              children: "Ajouter une image"
            }
          )
        ] }),
        renderCommon()
      ] });
    }
    case "testimonials": {
      const testimonials = block;
      return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { style: { display: "grid", gap: 16 }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
          TextField,
          {
            label: "Titre",
            value: testimonials.title,
            onChange: (value) => update({ title: value }),
            placeholder: "Ce que disent nos clients"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { style: { display: "grid", gap: 8 }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(SectionTitle, { children: "Temoignages" }),
          testimonials.items?.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { style: { display: "grid", gap: 6 }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
              TextField,
              {
                label: "Nom",
                value: item.name,
                onChange: (value) => {
                  const next = [...testimonials.items ?? []];
                  next[index] = { ...item, name: value };
                  update({ items: next });
                },
                placeholder: "Pr\xE9nom Nom"
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
              TextField,
              {
                label: "Role",
                value: item.role,
                onChange: (value) => {
                  const next = [...testimonials.items ?? []];
                  next[index] = { ...item, role: value };
                  update({ items: next });
                },
                placeholder: "Poste / entreprise"
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
              TextAreaField,
              {
                label: "Citation",
                value: item.quote,
                onChange: (value) => {
                  const next = [...testimonials.items ?? []];
                  next[index] = { ...item, quote: value };
                  update({ items: next });
                },
                placeholder: "Un retour client authentique."
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
              ImageUploadField,
              {
                label: "Photo",
                value: item.photo ?? "",
                onChange: (value) => {
                  const next = [...testimonials.items ?? []];
                  next[index] = { ...item, photo: value };
                  update({ items: next });
                },
                onUpload: onImageUpload
              }
            )
          ] }, item.id)),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
            "button",
            {
              type: "button",
              style: actionButton,
              onClick: () => update({
                items: [...testimonials.items ?? [], { id: createId("t"), name: "", quote: "" }]
              }),
              children: "Ajouter un temoignage"
            }
          )
        ] }),
        renderCommon()
      ] });
    }
    case "cta": {
      const cta = block;
      return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { style: { display: "grid", gap: 16 }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
          TextField,
          {
            label: "Titre",
            value: cta.title,
            onChange: (value) => update({ title: value }),
            placeholder: "Un titre pour inciter \xE0 l'action"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
          TextAreaField,
          {
            label: "Texte",
            value: cta.text,
            onChange: (value) => update({ text: value }),
            placeholder: "D\xE9crivez en une phrase la valeur de votre offre."
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
          TextField,
          {
            label: "Bouton",
            value: cta.buttonText,
            onChange: (value) => update({ buttonText: value }),
            placeholder: "Parler \xE0 un expert"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
          TextField,
          {
            label: "Lien",
            value: cta.buttonLink,
            onChange: (value) => update({ buttonLink: value }),
            placeholder: "/contact"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
          SelectField,
          {
            label: "Style",
            value: cta.style ?? "solid",
            options: [
              { value: "solid", label: "Solide" },
              { value: "gradient", label: "Gradient" }
            ],
            onChange: (value) => update({ style: value })
          }
        ),
        renderCommon()
      ] });
    }
    case "iconList": {
      const iconList = block;
      return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { style: { display: "grid", gap: 16 }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
          TextField,
          {
            label: "Titre",
            value: iconList.title,
            onChange: (value) => update({ title: value }),
            placeholder: "Points forts"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { style: { display: "grid", gap: 8 }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(SectionTitle, { children: "Elements" }),
          iconList.items?.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { style: { display: "grid", gap: 6 }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
              TextField,
              {
                label: "Icone",
                value: item.icon,
                onChange: (value) => {
                  const next = [...iconList.items ?? []];
                  next[index] = { ...item, icon: value };
                  update({ items: next });
                },
                placeholder: "\u2605"
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
              TextField,
              {
                label: "Label",
                value: item.label,
                onChange: (value) => {
                  const next = [...iconList.items ?? []];
                  next[index] = { ...item, label: value };
                  update({ items: next });
                },
                placeholder: "Rapide"
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
              TextAreaField,
              {
                label: "Texte",
                value: item.text,
                onChange: (value) => {
                  const next = [...iconList.items ?? []];
                  next[index] = { ...item, text: value };
                  update({ items: next });
                },
                placeholder: "D\xE9crivez le b\xE9n\xE9fice principal."
              }
            )
          ] }, item.id)),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
            "button",
            {
              type: "button",
              style: actionButton,
              onClick: () => update({
                items: [...iconList.items ?? [], { id: createId("icon"), icon: "*", label: "", text: "" }]
              }),
              children: "Ajouter un element"
            }
          )
        ] }),
        renderCommon()
      ] });
    }
    case "timeline": {
      const timeline = block;
      return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { style: { display: "grid", gap: 16 }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
          TextField,
          {
            label: "Titre",
            value: timeline.title,
            onChange: (value) => update({ title: value }),
            placeholder: "\xC9tapes cl\xE9s"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { style: { display: "grid", gap: 8 }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(SectionTitle, { children: "Etapes" }),
          timeline.steps?.map((step, index) => /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { style: { display: "grid", gap: 6 }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
              TextField,
              {
                label: "Titre",
                value: step.title,
                onChange: (value) => {
                  const next = [...timeline.steps ?? []];
                  next[index] = { ...step, title: value };
                  update({ steps: next });
                },
                placeholder: "Nom de l'\xE9tape"
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
              TextAreaField,
              {
                label: "Description",
                value: step.description,
                onChange: (value) => {
                  const next = [...timeline.steps ?? []];
                  next[index] = { ...step, description: value };
                  update({ steps: next });
                },
                placeholder: "Expliquez ce qui se passe \xE0 cette \xE9tape."
              }
            )
          ] }, step.id)),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
            "button",
            {
              type: "button",
              style: actionButton,
              onClick: () => update({
                steps: [...timeline.steps ?? [], { id: createId("step"), title: "", description: "" }]
              }),
              children: "Ajouter une etape"
            }
          )
        ] }),
        renderCommon()
      ] });
    }
    case "video": {
      const video = block;
      return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { style: { display: "grid", gap: 16 }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
          TextField,
          {
            label: "Titre",
            value: video.title,
            onChange: (value) => update({ title: value }),
            placeholder: "Titre de la vid\xE9o"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
          TextField,
          {
            label: "URL vid\xE9o",
            value: video.videoUrl,
            onChange: (value) => update({ videoUrl: value }),
            placeholder: "https://www.youtube.com/embed/..."
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
          TextAreaField,
          {
            label: "Legende",
            value: video.caption,
            onChange: (value) => update({ caption: value }),
            placeholder: "Ajoutez un contexte ou une description courte."
          }
        ),
        renderCommon()
      ] });
    }
    case "divider": {
      const divider = block;
      return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { style: { display: "grid", gap: 16 }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
          SelectField,
          {
            label: "Style",
            value: divider.style ?? "solid",
            options: [
              { value: "solid", label: "Solid" },
              { value: "dashed", label: "Dashed" },
              { value: "dotted", label: "Dotted" }
            ],
            onChange: (value) => update({ style: value })
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
          NumberField,
          {
            label: "Epaisseur",
            value: divider.thickness,
            onChange: (value) => update({ thickness: value }),
            min: 1,
            max: 10
          }
        ),
        renderCommon()
      ] });
    }
    case "spacer": {
      const spacer = block;
      return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { style: { display: "grid", gap: 16 }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
          NumberField,
          {
            label: "Hauteur",
            value: spacer.height,
            onChange: (value) => update({ height: value }),
            min: 0,
            max: 200
          }
        ),
        renderCommon()
      ] });
    }
    default:
      return renderCommon();
  }
}
function PageBuilder({
  value,
  onChange,
  theme,
  availableBlocks = DEFAULT_BLOCKS,
  className,
  style,
  onImageUpload,
  mode = "edit",
  onSave,
  onPublish,
  saving = false,
  publishing = false
}) {
  const { blocks, setBlocks, selectedId, setSelectedId } = useBuilderState(value);
  const [activeTab, setActiveTab] = React2.useState("blocks");
  if (mode === "view") {
    return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(PageBuilderRenderer, { content: value ?? { blocks }, filterHidden: true });
  }
  const selectedIndex = blocks.findIndex((block) => block.id === selectedId);
  const selectedBlock = selectedIndex >= 0 ? blocks[selectedIndex] : null;
  const emit = (next) => {
    setBlocks(next);
    onChange?.({ blocks: next, metadata: value?.metadata });
  };
  const emitWithMetadata = (metadata) => {
    onChange?.({ blocks, metadata });
  };
  const addBlock = (type) => {
    const block = createBlock(type);
    const next = [...blocks, block];
    emit(next);
    setSelectedId(block.id);
    setActiveTab("settings");
  };
  const removeBlock = (id) => {
    const next = blocks.filter((block) => block.id !== id);
    emit(next);
    if (selectedId === id) {
      setSelectedId(next[0]?.id ?? null);
    }
  };
  const duplicateBlock = (block) => {
    const clone = { ...block, id: createId(block.type) };
    const next = [...blocks, clone];
    emit(next);
    setSelectedId(clone.id);
  };
  const moveBlock = (from, to) => {
    if (from < 0 || to < 0 || from >= blocks.length || to >= blocks.length) return;
    emit(arrayMove(blocks, from, to));
  };
  const updateBlock = (updated) => {
    const next = blocks.map((block) => block.id === updated.id ? updated : block);
    emit(next);
  };
  const toggleBlockVisibility = (id) => {
    const next = blocks.map(
      (block) => block.id === id ? { ...block, visible: block.visible === false ? void 0 : false } : block
    );
    emit(next);
  };
  const handleSave = () => {
    if (!onSave) return;
    return onSave({ blocks, metadata: value?.metadata });
  };
  const handlePublish = () => {
    if (!onPublish) return;
    return onPublish({ blocks, metadata: value?.metadata });
  };
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
    "div",
    {
      className,
      style: {
        ...applyTheme(theme),
        ...style,
        color: "#0f172a",
        display: "grid",
        gridTemplateColumns: "280px 1fr 360px",
        gap: "1.5rem",
        padding: "1.5rem",
        minHeight: "100vh",
        background: theme?.backgroundColor ?? "#f8fafc"
      },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("aside", { style: { display: "grid", gap: "1rem", alignContent: "start" }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { style: { display: "flex", gap: 4, marginBottom: "0.5rem" }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
              "button",
              {
                type: "button",
                onClick: () => setActiveTab("blocks"),
                style: {
                  flex: 1,
                  padding: "0.5rem 0.75rem",
                  borderRadius: 8,
                  border: "none",
                  background: activeTab === "blocks" ? "#fff" : "transparent",
                  color: activeTab === "blocks" ? "var(--pb-primary)" : "#64748b",
                  cursor: "pointer",
                  fontSize: 14,
                  fontWeight: activeTab === "blocks" ? 600 : 400,
                  boxShadow: activeTab === "blocks" ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
                  fontFamily: "inherit"
                },
                children: "Blocs"
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
              "button",
              {
                type: "button",
                onClick: () => setActiveTab("settings"),
                style: {
                  flex: 1,
                  padding: "0.5rem 0.75rem",
                  borderRadius: 8,
                  border: "none",
                  background: activeTab === "settings" ? "#fff" : "transparent",
                  color: activeTab === "settings" ? "var(--pb-primary)" : "#64748b",
                  cursor: "pointer",
                  fontSize: 14,
                  fontWeight: activeTab === "settings" ? 600 : 400,
                  boxShadow: activeTab === "settings" ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
                  fontFamily: "inherit"
                },
                children: "Param\xE8tres"
              }
            )
          ] }),
          activeTab === "settings" && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { style: { ...panelStyle, display: "grid", gap: 16 }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(SectionTitle, { children: "Param\xE8tres de la page" }),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
              TextField,
              {
                label: "Titre de la page",
                value: value?.metadata?.title ?? "",
                onChange: (title) => emitWithMetadata({ ...value?.metadata, title }),
                placeholder: "Ex: Accueil, \xC0 propos, Landing page"
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
              SelectField,
              {
                label: "Statut",
                value: value?.metadata?.status ?? "draft",
                options: [
                  { value: "draft", label: "Brouillon" },
                  { value: "published", label: "Publi\xE9" }
                ],
                onChange: (status) => emitWithMetadata({ ...value?.metadata, status })
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { style: { display: "grid", gap: 6 }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(FieldLabel, { children: "Date de publication" }),
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                "input",
                {
                  type: "datetime-local",
                  value: value?.metadata?.publicationDate ? new Date(value.metadata.publicationDate).toISOString().slice(0, 16) : "",
                  onChange: (e) => emitWithMetadata({
                    ...value?.metadata,
                    publicationDate: e.target.value ? new Date(e.target.value).toISOString() : void 0
                  }),
                  style: inputStyle
                }
              )
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { style: { display: "grid", gap: 12, paddingTop: 12, borderTop: "1px solid #e2e8f0" }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(SectionTitle, { children: "SEO" }),
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                TextField,
                {
                  label: "Meta titre",
                  value: value?.metadata?.metaTitle ?? "",
                  onChange: (metaTitle) => emitWithMetadata({ ...value?.metadata, metaTitle }),
                  placeholder: "Titre pour les moteurs de recherche"
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                TextAreaField,
                {
                  label: "Meta description",
                  value: value?.metadata?.metaDescription ?? "",
                  onChange: (metaDescription) => emitWithMetadata({ ...value?.metadata, metaDescription }),
                  placeholder: "Description pour les moteurs de recherche",
                  rows: 3
                }
              )
            ] })
          ] }),
          activeTab === "blocks" && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { style: { ...panelStyle, display: "grid", gap: 12 }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(SectionTitle, { children: "Ajouter un bloc" }),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { style: { display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 8 }, children: availableBlocks.map((type) => /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
              "button",
              {
                type: "button",
                style: {
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 6,
                  borderRadius: 10,
                  border: "1px dashed #cbd5e1",
                  padding: "0.75rem 0.5rem",
                  background: "#f8fafc",
                  cursor: "pointer",
                  fontSize: 12,
                  transition: "all 0.2s"
                },
                onClick: () => addBlock(type),
                onMouseEnter: (e) => {
                  e.currentTarget.style.background = "#f1f5f9";
                  e.currentTarget.style.borderColor = "#94a3b8";
                },
                onMouseLeave: (e) => {
                  e.currentTarget.style.background = "#f8fafc";
                  e.currentTarget.style.borderColor = "#cbd5e1";
                },
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(BlockIcon, { type, size: 20, color: "#64748b" }),
                  /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { children: BLOCK_LABELS[type] })
                ]
              },
              type
            )) }),
            (availableBlocks.includes("divider") || availableBlocks.includes("spacer")) && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { style: { display: "flex", flexDirection: "column", gap: 6, marginTop: 8 }, children: [
              availableBlocks.includes("divider") && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
                "button",
                {
                  type: "button",
                  onClick: () => addBlock("divider"),
                  style: {
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "0.5rem",
                    borderRadius: 8,
                    border: "1px dashed #cbd5e1",
                    background: "#f8fafc",
                    cursor: "pointer",
                    fontSize: 13
                  },
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(BlockIcon, { type: "divider", size: 16, color: "#64748b" }),
                    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { children: "S\xE9parateur" })
                  ]
                }
              ),
              availableBlocks.includes("spacer") && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
                "button",
                {
                  type: "button",
                  onClick: () => addBlock("spacer"),
                  style: {
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "0.5rem",
                    borderRadius: 8,
                    border: "1px dashed #cbd5e1",
                    background: "#f8fafc",
                    cursor: "pointer",
                    fontSize: 13
                  },
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(BlockIcon, { type: "spacer", size: 16, color: "#64748b" }),
                    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { children: "Espace" })
                  ]
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { style: { ...panelStyle, display: "grid", gap: 8 }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(SectionTitle, { children: "Blocs" }),
            blocks.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("p", { style: { margin: 0, fontSize: 13, color: "#64748b", textAlign: "center", padding: "1rem 0" }, children: "Ajoute un bloc pour commencer." }),
            blocks.map((block, index) => /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
              "div",
              {
                style: blockCard(block.id === selectedId),
                onClick: (e) => {
                  if (e.target.closest("button")) return;
                  setSelectedId(block.id);
                  setActiveTab("settings");
                },
                role: "button",
                tabIndex: 0,
                onKeyDown: (e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    setSelectedId(block.id);
                    setActiveTab("settings");
                  }
                },
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(DragHandle, {}),
                  /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(BlockIcon, { type: block.type, size: 18, color: block.id === selectedId ? "var(--pb-primary)" : "#64748b" }),
                  /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { style: { flex: 1, display: "grid", gap: 2, minWidth: 0 }, children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("strong", { style: { fontSize: 13, fontWeight: 600, fontFamily: "inherit" }, children: BLOCK_LABELS[block.type] }) }),
                  /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { style: { display: "flex", gap: 4, alignItems: "center" }, children: [
                    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                      "button",
                      {
                        type: "button",
                        style: iconButton,
                        onClick: (e) => {
                          e.stopPropagation();
                          toggleBlockVisibility(block.id);
                        },
                        title: block.visible !== false ? "Masquer" : "Afficher",
                        children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(EyeIcon, { visible: block.visible !== false })
                      }
                    ),
                    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                      "button",
                      {
                        type: "button",
                        style: iconButton,
                        onClick: (e) => {
                          e.stopPropagation();
                          moveBlock(index, index - 1);
                        },
                        disabled: index === 0,
                        title: "D\xE9placer vers le haut",
                        children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { d: "M18 15l-6-6-6 6" }) })
                      }
                    ),
                    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                      "button",
                      {
                        type: "button",
                        style: iconButton,
                        onClick: (e) => {
                          e.stopPropagation();
                          moveBlock(index, index + 1);
                        },
                        disabled: index === blocks.length - 1,
                        title: "D\xE9placer vers le bas",
                        children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { d: "M6 9l6 6 6-6" }) })
                      }
                    ),
                    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                      "button",
                      {
                        type: "button",
                        style: {
                          ...iconButton,
                          color: "var(--pb-primary)"
                        },
                        onClick: (e) => {
                          e.stopPropagation();
                          if (confirm(`Voulez-vous vraiment supprimer le bloc "${BLOCK_LABELS[block.type]}" ?`)) {
                            removeBlock(block.id);
                          }
                        },
                        title: "Supprimer",
                        children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { d: "M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" }) })
                      }
                    )
                  ] })
                ]
              },
              block.id
            ))
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("main", { style: { display: "grid", gap: "1rem", alignContent: "start" }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
            "div",
            {
              style: {
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "1rem 1.25rem",
                borderRadius: 12,
                border: "1px solid #e2e8f0",
                background: "#fff",
                boxShadow: "0 1px 3px rgba(0,0,0,0.05)"
              },
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("strong", { style: { fontSize: 16, fontWeight: 600, color: "#0f172a", fontFamily: "inherit" }, children: "Nouvelle page" }) }),
                /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { style: { display: "flex", gap: 8, alignItems: "center" }, children: [
                  /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                    "button",
                    {
                      type: "button",
                      style: {
                        ...actionButton,
                        padding: "0.5rem 1rem",
                        fontSize: 14,
                        fontWeight: 500,
                        background: "var(--pb-primary)",
                        color: "#fff",
                        borderColor: "var(--pb-primary)"
                      },
                      onClick: () => void handleSave(),
                      disabled: saving || !onSave,
                      children: saving ? "Enregistrement..." : "Enregistrer"
                    }
                  ),
                  /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                    "button",
                    {
                      type: "button",
                      style: {
                        ...actionButton,
                        padding: "0.5rem 1rem",
                        fontSize: 14,
                        fontWeight: 500,
                        background: "var(--pb-primary)",
                        color: "#fff",
                        borderColor: "var(--pb-primary)"
                      },
                      onClick: () => void handlePublish(),
                      disabled: publishing || !onPublish,
                      children: publishing ? "Publication..." : "Publier"
                    }
                  )
                ] })
              ]
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
            "div",
            {
              style: {
                ...panelStyle,
                minHeight: 600,
                overflow: "hidden",
                background: "#fff",
                borderRadius: 12
              },
              children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { style: { height: "100%", overflowY: "auto", padding: "1rem" }, children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(PageBuilderRenderer, { content: { blocks }, filterHidden: true }) })
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("aside", { style: { display: "grid", gap: "1rem", alignContent: "start" }, children: [
          selectedBlock && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { style: { ...panelStyle, display: "grid", gap: 16 }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between" }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { style: { display: "flex", alignItems: "center", gap: 10 }, children: [
                /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(BlockIcon, { type: selectedBlock.type, size: 20, color: "#0f172a" }),
                /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(SectionTitle, { children: BLOCK_LABELS[selectedBlock.type] })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { style: { display: "flex", gap: 6 }, children: [
                /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                  "button",
                  {
                    type: "button",
                    style: iconButton,
                    onClick: () => duplicateBlock(selectedBlock),
                    title: "Dupliquer",
                    children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [
                      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("rect", { x: "9", y: "9", width: "13", height: "13", rx: "2", ry: "2" }),
                      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { d: "M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" })
                    ] })
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                  "button",
                  {
                    type: "button",
                    style: iconButton,
                    onClick: () => removeBlock(selectedBlock.id),
                    title: "Supprimer",
                    children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { d: "M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" }) })
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { style: { borderTop: "1px solid #e2e8f0", paddingTop: 16 }, children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
              BlockEditor,
              {
                block: selectedBlock,
                onChange: (updated) => updateBlock(updated),
                onImageUpload
              }
            ) })
          ] }),
          !selectedBlock && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { style: { ...panelStyle, display: "grid", gap: 12, textAlign: "center", padding: "2rem 1rem" }, children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("p", { style: { margin: 0, fontSize: 14, color: "#64748b" }, children: "S\xE9lectionne un bloc pour modifier ses param\xE8tres." }) })
        ] })
      ]
    }
  );
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ComposedBlockView,
  CtaBlockView,
  DividerBlockView,
  FaqBlockView,
  GalleryBlockView,
  HeroBlockView,
  IconListBlockView,
  ImageBlockView,
  PageBuilder,
  PageBuilderRenderer,
  SpacerBlockView,
  SplitBlockView,
  StatsBlockView,
  TestimonialsBlockView,
  TextBlockView,
  TimelineBlockView,
  VideoBlockView
});
//# sourceMappingURL=index.js.map