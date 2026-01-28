import * as React from "react";
import type {
  Block,
  CtaBlock,
  DividerBlock,
  FaqBlock,
  GalleryBlock,
  HeroBlock,
  IconListBlock,
  ImageBlock,
  SplitBlock,
  SpacerBlock,
  StatsBlock,
  TestimonialItem,
  TestimonialsBlock,
  TextBlock,
  TimelineBlock,
  VideoBlock,
  ComposedBlock,
  ComposedData,
} from "../types";
import { getBlockStyle } from "../utils/style";

const sectionBaseStyle: React.CSSProperties = {
  padding: "2.5rem 1rem",
};

function getHeroSectionStyle(minHeight?: number): React.CSSProperties {
  return {
    padding: "4.5rem 1rem 5rem",
    minHeight: `${minHeight ?? 55}vh`,
    display: "flex",
    alignItems: "center",
  };
}

const contentMaxWidth: React.CSSProperties = {
  maxWidth: 1200,
  margin: "0 auto",
};

const buttonStyle: React.CSSProperties = {
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
  fontSize: 14,
};

const headingStyle: React.CSSProperties = {
  margin: "0 0 0.75rem",
  fontSize: 28,
  lineHeight: 1.2,
};

const subheadingStyle: React.CSSProperties = {
  margin: 0,
  fontSize: 16,
  lineHeight: 1.7,
  opacity: 0.85,
};

const cardStyle: React.CSSProperties = {
  borderRadius: 14,
  border: "1px solid rgba(15, 23, 42, 0.08)",
  padding: "1rem",
  background: "rgba(15, 23, 42, 0.04)",
  boxShadow: "0 10px 25px rgba(15, 23, 42, 0.08)",
};

const imageStyle: React.CSSProperties = {
  width: "100%",
  borderRadius: 18,
  objectFit: "cover",
  boxShadow: "0 15px 35px rgba(15, 23, 42, 0.12)",
};

function BlockSection({
  block,
  children,
  style,
}: {
  block: Block;
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <section style={{ ...sectionBaseStyle, ...getBlockStyle(block), ...style }}>
      <div style={contentMaxWidth}>{children}</div>
    </section>
  );
}

export function HeroBlockView({ block }: { block: HeroBlock }) {
  const layout: React.CSSProperties =
    block.variant === "split"
      ? {
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "2rem",
          alignItems: "center",
        }
      : {
          display: "grid",
          gap: "1.75rem",
        };

  const textAlign = block.textAlignment ?? "start";
  const contentAlign = block.contentAlign ?? "start";
  const textMaxWidth = 680;
  const titleSize = block.titleSize ?? 42;
  const subtitleSize = block.subtitleSize ?? 18;

  const contentPlacement =
    contentAlign === "center"
      ? { marginLeft: "auto", marginRight: "auto", justifySelf: "center" as const }
      : contentAlign === "end"
      ? { marginLeft: "auto", justifySelf: "end" as const }
      : { justifySelf: "start" as const };
  const textAlignStyle: React.CSSProperties = {
    textAlign: textAlign as React.CSSProperties["textAlign"],
  };

  const showImageFirst = block.variant === "split" && block.imagePosition === "left";

  return (
    <BlockSection block={block} style={getHeroSectionStyle(block.minHeight)}>
      <div style={layout}>
        {showImageFirst && block.imageUrl && (
          <div>
            <img src={block.imageUrl} alt={block.title ?? ""} style={imageStyle} />
          </div>
        )}
        <div
          style={{
            ...textAlignStyle,
            display: "grid",
            gap: "1rem",
            width: "100%",
            maxWidth: textMaxWidth,
            ...contentPlacement,
          }}
        >
          {block.title && (
            <h1 style={{ margin: 0, fontSize: titleSize, lineHeight: 1.1, fontWeight: 700 }}>{block.title}</h1>
          )}
          {block.subtitle && (
            <p style={{ margin: 0, fontSize: subtitleSize, lineHeight: 1.7, opacity: 0.85 }}>{block.subtitle}</p>
          )}
          {block.ctaText && block.ctaLink && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
              <a href={block.ctaLink} style={buttonStyle}>
                {block.ctaText}
              </a>
            </div>
          )}
          {block.variant === "stats" && block.stats && block.stats.length > 0 && (
            <ul
              style={{
                listStyle: "none",
                margin: "0.5rem 0 0",
                padding: 0,
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                gap: "0.75rem",
              }}
            >
              {block.stats.map((stat) => (
                <li
                  key={stat.id}
                  style={{
                    borderRadius: 12,
                    border: "1px solid rgba(255, 255, 255, 0.25)",
                    padding: "0.75rem 1rem",
                    background: "rgba(255, 255, 255, 0.12)",
                    backdropFilter: "blur(4px)",
                  }}
                >
                  <div style={{ fontSize: 22, fontWeight: 700 }}>{stat.value}</div>
                  <div style={{ fontSize: 12, letterSpacing: 0.3, textTransform: "uppercase", opacity: 0.8 }}>
                    {stat.label}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        {!showImageFirst && block.imageUrl && (
          <div>
            <img src={block.imageUrl} alt={block.title ?? ""} style={imageStyle} />
          </div>
        )}
      </div>
      {block.variant === "carousel" && block.slides && block.slides.length > 0 && (
        <div style={{ marginTop: "2rem", display: "grid", gap: "0.75rem" }}>
          <h3 style={{ margin: 0, fontSize: 18 }}>Slides</h3>
          <ul style={{ margin: 0, paddingLeft: "1.25rem" }}>
            {block.slides.map((slide) => (
              <li key={slide.id}>
                {slide.title && <strong>{slide.title}</strong>}
                {slide.subtitle && <span> {slide.subtitle}</span>}
              </li>
            ))}
          </ul>
        </div>
      )}
    </BlockSection>
  );
}

export function TextBlockView({ block }: { block: TextBlock }) {
  const align = block.alignment ?? "start";
  return (
    <BlockSection block={block}>
      <div style={{ textAlign: align as React.CSSProperties["textAlign"], maxWidth: 760, margin: "0 auto" }}>
        {block.heading && <h2 style={headingStyle}>{block.heading}</h2>}
        {block.body && <p style={subheadingStyle}>{block.body}</p>}
      </div>
    </BlockSection>
  );
}

export function StatsBlockView({ block }: { block: StatsBlock }) {
  const columns = Math.max(1, block.columns ?? 3);
  return (
    <BlockSection block={block}>
      {block.heading && <h2 style={headingStyle}>{block.heading}</h2>}
      {block.description && <p style={subheadingStyle}>{block.description}</p>}
      {block.cards && block.cards.length > 0 && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
            gap: "1rem",
          }}
        >
          {block.cards.map((card) => (
            <div key={card.id} style={cardStyle}>
              <div style={{ fontSize: 24, fontWeight: 700 }}>{card.value}</div>
              <div style={{ fontSize: 13, textTransform: "uppercase", letterSpacing: 0.4, opacity: 0.7 }}>
                {card.label}
              </div>
            </div>
          ))}
        </div>
      )}
    </BlockSection>
  );
}

export function ImageBlockView({ block }: { block: ImageBlock }) {
  return (
    <BlockSection block={block}>
      {block.imageUrl && (
        <figure>
          <img src={block.imageUrl} alt={block.altText ?? ""} style={imageStyle} />
          {block.caption && <figcaption style={{ marginTop: "0.75rem", fontSize: 13, opacity: 0.75 }}>{block.caption}</figcaption>}
        </figure>
      )}
    </BlockSection>
  );
}

export function FaqBlockView({ block }: { block: FaqBlock }) {
  return (
    <BlockSection block={block}>
      {block.title && <h2 style={headingStyle}>{block.title}</h2>}
      {block.items && block.items.length > 0 && (
        <div style={{ display: "grid", gap: "0.75rem" }}>
          {block.items.map((item) => (
            <details key={item.id} style={{ ...cardStyle, padding: "0.75rem 1rem" }}>
              <summary style={{ cursor: "pointer", fontWeight: 600 }}>{item.question}</summary>
              <p style={{ marginTop: "0.5rem", marginBottom: 0 }}>{item.answer}</p>
            </details>
          ))}
        </div>
      )}
    </BlockSection>
  );
}

export function SplitBlockView({ block }: { block: SplitBlock }) {
  const imageFirst = block.imagePosition !== "right";
  return (
    <BlockSection block={block}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "2.5rem",
          alignItems: "center",
        }}
      >
        {imageFirst && block.imageUrl && (
          <img src={block.imageUrl} alt={block.title ?? ""} style={imageStyle} />
        )}
        <div>
          {block.title && <h2 style={headingStyle}>{block.title}</h2>}
          {block.text && <p style={subheadingStyle}>{block.text}</p>}
          {block.ctaText && block.ctaLink && (
            <a href={block.ctaLink} style={buttonStyle}>
              {block.ctaText}
            </a>
          )}
        </div>
        {!imageFirst && block.imageUrl && (
          <img src={block.imageUrl} alt={block.title ?? ""} style={imageStyle} />
        )}
      </div>
    </BlockSection>
  );
}

export function GalleryBlockView({ block }: { block: GalleryBlock }) {
  return (
    <BlockSection block={block}>
      {block.title && <h2 style={headingStyle}>{block.title}</h2>}
      {block.images && block.images.length > 0 && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "1rem",
          }}
        >
          {block.images.map((image) => (
            <figure key={image.id}>
              <img src={image.url} alt={image.caption ?? ""} style={{ ...imageStyle, height: 180 }} />
              {image.caption && <figcaption style={{ marginTop: "0.5rem", fontSize: 13, opacity: 0.75 }}>{image.caption}</figcaption>}
            </figure>
          ))}
        </div>
      )}
    </BlockSection>
  );
}

function TestimonialCard({ item }: { item: TestimonialItem }) {
  return (
    <figure style={cardStyle}>
      {item.quote && <blockquote style={{ margin: 0, fontSize: 16, lineHeight: 1.6 }}>{item.quote}</blockquote>}
      <figcaption style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginTop: "1rem" }}>
        {item.photo && (
          <img
            src={item.photo}
            alt={item.name ?? ""}
            style={{ width: 44, height: 44, borderRadius: "50%", objectFit: "cover" }}
          />
        )}
        <div>
          {item.name && <strong style={{ display: "block" }}>{item.name}</strong>}
          {item.role && <span style={{ fontSize: 13, opacity: 0.7 }}>{item.role}</span>}
        </div>
      </figcaption>
    </figure>
  );
}

export function TestimonialsBlockView({ block }: { block: TestimonialsBlock }) {
  return (
    <BlockSection block={block}>
      {block.title && <h2 style={headingStyle}>{block.title}</h2>}
      {block.items && block.items.length > 0 && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "1rem",
          }}
        >
          {block.items.map((item) => (
            <TestimonialCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </BlockSection>
  );
}

export function CtaBlockView({ block }: { block: CtaBlock }) {
  return (
    <BlockSection block={block}>
      {block.title && <h2 style={headingStyle}>{block.title}</h2>}
      {block.text && <p style={subheadingStyle}>{block.text}</p>}
      {block.buttonText && block.buttonLink && (
        <a href={block.buttonLink} style={buttonStyle}>
          {block.buttonText}
        </a>
      )}
    </BlockSection>
  );
}

export function IconListBlockView({ block }: { block: IconListBlock }) {
  return (
    <BlockSection block={block}>
      {block.title && <h2 style={headingStyle}>{block.title}</h2>}
      {block.items && block.items.length > 0 && (
        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "0.75rem" }}>
          {block.items.map((item) => (
            <li key={item.id} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
              {item.icon && (
                <span
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 10,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "rgba(15, 23, 42, 0.08)",
                    fontSize: 16,
                  }}
                >
                  {item.icon}
                </span>
              )}
              <div>
                {item.label && <strong style={{ display: "block" }}>{item.label}</strong>}
                {item.text && <span style={{ fontSize: 14, opacity: 0.8 }}>{item.text}</span>}
              </div>
            </li>
          ))}
        </ul>
      )}
    </BlockSection>
  );
}

export function TimelineBlockView({ block }: { block: TimelineBlock }) {
  return (
    <BlockSection block={block}>
      {block.title && <h2 style={headingStyle}>{block.title}</h2>}
      {block.steps && block.steps.length > 0 && (
        <ol style={{ margin: 0, paddingLeft: "1.25rem", display: "grid", gap: "0.75rem" }}>
          {block.steps.map((step) => (
            <li key={step.id}>
              {step.title && <strong>{step.title}</strong>}
              {step.description && <p style={{ marginTop: "0.35rem", marginBottom: 0 }}>{step.description}</p>}
            </li>
          ))}
        </ol>
      )}
    </BlockSection>
  );
}

export function VideoBlockView({ block }: { block: VideoBlock }) {
  return (
    <BlockSection block={block}>
      {block.title && <h2 style={headingStyle}>{block.title}</h2>}
      {block.videoUrl && (
        <div style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}>
          <iframe
            src={block.videoUrl}
            title={block.title ?? "video"}
            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
            allowFullScreen
          />
        </div>
      )}
      {block.caption && <p>{block.caption}</p>}
    </BlockSection>
  );
}

export function DividerBlockView({ block }: { block: DividerBlock }) {
  return (
    <div style={{ ...sectionBaseStyle, ...getBlockStyle(block) }}>
      <hr
        style={{
          borderStyle: block.style ?? "solid",
          borderWidth: block.thickness ?? 1,
          margin: 0,
        }}
      />
    </div>
  );
}

export function SpacerBlockView({ block }: { block: SpacerBlock }) {
  return <div style={{ height: block.height ?? 24 }} />;
}

function renderComposedData(data: ComposedData) {
  switch (data.preset) {
    case "introCards":
      return (
        <div>
          {data.title && <h2>{data.title}</h2>}
          {data.intro && <p>{data.intro}</p>}
          {data.cards && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
              {data.cards.map((card) => (
                <div key={card.id}>
                  {card.icon && <div>{card.icon}</div>}
                  {card.title && <strong>{card.title}</strong>}
                  {card.text && <p>{card.text}</p>}
                </div>
              ))}
            </div>
          )}
        </div>
      );
    case "imageTextCta":
      return (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "2rem",
            alignItems: "center",
          }}
        >
          {data.imagePosition !== "right" && data.imageUrl && (
            <img src={data.imageUrl} alt={data.title ?? ""} style={{ width: "100%" }} />
          )}
          <div>
            {data.title && <h2>{data.title}</h2>}
            {data.text && <p>{data.text}</p>}
            {data.ctaText && data.ctaLink && (
              <a href={data.ctaLink} style={buttonStyle}>
                {data.ctaText}
              </a>
            )}
          </div>
          {data.imagePosition === "right" && data.imageUrl && (
            <img src={data.imageUrl} alt={data.title ?? ""} style={{ width: "100%" }} />
          )}
        </div>
      );
    case "statsCta":
      return (
        <div>
          {data.title && <h2>{data.title}</h2>}
          {data.text && <p>{data.text}</p>}
          {data.stats && (
            <ul>
              {data.stats.map((stat) => (
                <li key={stat.id}>
                  <strong>{stat.value}</strong> {stat.label}
                </li>
              ))}
            </ul>
          )}
          {data.ctaText && data.ctaLink && (
            <a href={data.ctaLink} style={buttonStyle}>
              {data.ctaText}
            </a>
          )}
        </div>
      );
    case "faqCta":
      return (
        <div>
          {data.title && <h2>{data.title}</h2>}
          {data.items && (
            <div>
              {data.items.map((item) => (
                <details key={item.id}>
                  <summary>{item.question}</summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          )}
          {data.ctaText && data.ctaLink && (
            <a href={data.ctaLink} style={buttonStyle}>
              {data.ctaText}
            </a>
          )}
        </div>
      );
    case "testimonialsRating":
      return (
        <div>
          {data.title && <h2>{data.title}</h2>}
          {data.ratingLabel && data.ratingValue && (
            <p>
              {data.ratingLabel}: <strong>{data.ratingValue}</strong>
            </p>
          )}
          {data.ratingText && <p>{data.ratingText}</p>}
          {data.items && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem" }}>
              {data.items.map((item) => (
                <TestimonialCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>
      );
    case "galleryText":
      return (
        <div>
          {data.title && <h2>{data.title}</h2>}
          {data.text && <p>{data.text}</p>}
          {data.images && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1rem" }}>
              {data.images.map((image) => (
                <figure key={image.id}>
                  <img src={image.url} alt={image.caption ?? ""} style={{ width: "100%" }} />
                  {image.caption && <figcaption>{image.caption}</figcaption>}
                </figure>
              ))}
            </div>
          )}
        </div>
      );
    default:
      return null;
  }
}

export function ComposedBlockView({ block }: { block: ComposedBlock }) {
  if (!block.data) {
    return null;
  }

  return <BlockSection block={block}>{renderComposedData(block.data)}</BlockSection>;
}
