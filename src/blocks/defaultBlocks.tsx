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

// Carousel navigation button styles
const carouselNavButton: React.CSSProperties = {
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  width: 48,
  height: 48,
  borderRadius: "50%",
  border: "none",
  background: "rgba(255, 255, 255, 0.9)",
  color: "#1e293b",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
  zIndex: 10,
  transition: "background 0.2s, transform 0.2s",
};

const carouselDot: React.CSSProperties = {
  width: 10,
  height: 10,
  borderRadius: "50%",
  border: "none",
  cursor: "pointer",
  transition: "background 0.2s, transform 0.2s",
};

export function HeroBlockView({ block }: { block: HeroBlock }) {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const slides = block.slides ?? [];
  const slidesCount = slides.length;

  // Auto-advance carousel every 5 seconds
  React.useEffect(() => {
    if (block.variant !== "carousel" || slidesCount <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slidesCount);
    }, 5000);
    return () => clearInterval(interval);
  }, [block.variant, slidesCount]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToPrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slidesCount) % slidesCount);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slidesCount);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") goToPrev();
    if (e.key === "ArrowRight") goToNext();
  };

  const textAlign = block.textAlignment ?? "start";
  const contentAlign = block.contentAlign ?? "start";
  const textMaxWidth = 680;
  const titleSize = block.titleSize ?? 42;
  const subtitleSize = block.subtitleSize ?? 18;
  const minHeight = block.minHeight ?? 55;

  const contentPlacement =
    contentAlign === "center"
      ? { marginLeft: "auto", marginRight: "auto", justifySelf: "center" as const }
      : contentAlign === "end"
      ? { marginLeft: "auto", justifySelf: "end" as const }
      : { justifySelf: "start" as const };

  const textAlignStyle: React.CSSProperties = {
    textAlign: textAlign as React.CSSProperties["textAlign"],
  };

  // Render text content (reused across variants)
  const renderTextContent = (
    title?: string,
    subtitle?: string,
    ctaText?: string,
    ctaLink?: string,
    extraContent?: React.ReactNode,
  ) => (
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
      {title && (
        <h1 style={{ margin: 0, fontSize: titleSize, lineHeight: 1.1, fontWeight: 700 }}>{title}</h1>
      )}
      {subtitle && (
        <p style={{ margin: 0, fontSize: subtitleSize, lineHeight: 1.7, opacity: 0.85 }}>{subtitle}</p>
      )}
      {ctaText && ctaLink && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", justifyContent: textAlign }}>
          <a href={ctaLink} style={buttonStyle}>
            {ctaText}
          </a>
        </div>
      )}
      {extraContent}
    </div>
  );

  // CAROUSEL variant
  if (block.variant === "carousel" && slidesCount > 0) {
    const currentSlideData = slides[currentSlide];
    return (
      <section
        style={{
          position: "relative",
          minHeight: `${minHeight}vh`,
          overflow: "hidden",
          ...getBlockStyle(block),
        }}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="region"
        aria-label="Carrousel"
        aria-roledescription="carousel"
      >
        {/* Slides container */}
        <div
          style={{
            display: "flex",
            transition: "transform 0.5s ease-in-out",
            transform: `translateX(-${currentSlide * 100}%)`,
            height: "100%",
          }}
        >
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`Slide ${index + 1} sur ${slidesCount}`}
              aria-hidden={index !== currentSlide}
              style={{
                minWidth: "100%",
                minHeight: `${minHeight}vh`,
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* Background image */}
              {slide.imageUrl && (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage: `url(${slide.imageUrl})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    zIndex: 0,
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.6))",
                    }}
                  />
                </div>
              )}
              {/* Content */}
              <div style={{ position: "relative", zIndex: 1, padding: "2rem 1rem", width: "100%" }}>
                <div style={{ ...contentMaxWidth }}>
                  {renderTextContent(slide.title, slide.subtitle, slide.ctaText, slide.ctaLink)}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation arrows */}
        {slidesCount > 1 && (
          <>
            <button
              onClick={goToPrev}
              style={{ ...carouselNavButton, left: 16 }}
              aria-label="Slide précédent"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              onClick={goToNext}
              style={{ ...carouselNavButton, right: 16 }}
              aria-label="Slide suivant"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </>
        )}

        {/* Dots */}
        {slidesCount > 1 && (
          <div
            style={{
              position: "absolute",
              bottom: 24,
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              gap: 8,
              zIndex: 10,
            }}
            role="tablist"
            aria-label="Sélectionner un slide"
          >
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                onClick={() => goToSlide(index)}
                role="tab"
                aria-selected={index === currentSlide}
                aria-label={`Aller au slide ${index + 1}`}
                style={{
                  ...carouselDot,
                  background: index === currentSlide ? "#fff" : "rgba(255, 255, 255, 0.5)",
                  transform: index === currentSlide ? "scale(1.2)" : "scale(1)",
                }}
              />
            ))}
          </div>
        )}
      </section>
    );
  }

  // COVER variant - full background image
  if (block.variant === "cover") {
    return (
      <section
        style={{
          position: "relative",
          minHeight: `${minHeight}vh`,
          display: "flex",
          alignItems: "center",
          ...getBlockStyle(block),
        }}
      >
        {/* Background image */}
        {block.imageUrl && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `url(${block.imageUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              zIndex: 0,
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.5))",
              }}
            />
          </div>
        )}
        {/* Content */}
        <div style={{ position: "relative", zIndex: 1, width: "100%", padding: "4rem 1rem" }}>
          <div style={{ ...contentMaxWidth }}>
            {renderTextContent(block.title, block.subtitle, block.ctaText, block.ctaLink)}
          </div>
        </div>
      </section>
    );
  }

  // VIDEO variant - video background or embedded
  if (block.variant === "video") {
    const isYouTube = block.videoUrl?.includes("youtube") || block.videoUrl?.includes("youtu.be");
    const isVimeo = block.videoUrl?.includes("vimeo");
    const isEmbed = isYouTube || isVimeo;

    return (
      <section
        style={{
          position: "relative",
          minHeight: `${minHeight}vh`,
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
          ...getBlockStyle(block),
        }}
      >
        {/* Video background */}
        {block.videoUrl && !isEmbed && (
          <video
            autoPlay
            muted
            loop
            playsInline
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              zIndex: 0,
            }}
          >
            <source src={block.videoUrl} type="video/mp4" />
          </video>
        )}
        {/* YouTube/Vimeo embed background */}
        {block.videoUrl && isEmbed && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              overflow: "hidden",
              zIndex: 0,
            }}
          >
            <iframe
              src={`${block.videoUrl}${block.videoUrl.includes("?") ? "&" : "?"}autoplay=1&mute=1&loop=1&controls=0&showinfo=0`}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: "180%",
                height: "180%",
                transform: "translate(-50%, -50%)",
                border: "none",
                pointerEvents: "none",
              }}
              allow="autoplay; encrypted-media"
              title="Video background"
            />
          </div>
        )}
        {/* Overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.6))",
            zIndex: 1,
          }}
        />
        {/* Content */}
        <div style={{ position: "relative", zIndex: 2, width: "100%", padding: "4rem 1rem" }}>
          <div style={{ ...contentMaxWidth }}>
            {renderTextContent(block.title, block.subtitle, block.ctaText, block.ctaLink)}
          </div>
        </div>
      </section>
    );
  }

  // SPLIT variant
  if (block.variant === "split") {
    const showImageFirst = block.imagePosition === "left";
    return (
      <BlockSection block={block} style={getHeroSectionStyle(minHeight)}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "2rem",
            alignItems: "center",
          }}
        >
          {showImageFirst && block.imageUrl && (
            <div>
              <img src={block.imageUrl} alt={block.title ?? ""} style={imageStyle} />
            </div>
          )}
          {renderTextContent(block.title, block.subtitle, block.ctaText, block.ctaLink)}
          {!showImageFirst && block.imageUrl && (
            <div>
              <img src={block.imageUrl} alt={block.title ?? ""} style={imageStyle} />
            </div>
          )}
        </div>
      </BlockSection>
    );
  }

  // STATS variant
  if (block.variant === "stats") {
    const statsContent = block.stats && block.stats.length > 0 && (
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
    );

    return (
      <BlockSection block={block} style={getHeroSectionStyle(minHeight)}>
        <div style={{ display: "grid", gap: "1.75rem" }}>
          {renderTextContent(block.title, block.subtitle, block.ctaText, block.ctaLink, statsContent)}
        </div>
      </BlockSection>
    );
  }

  // SIMPLE variant (default)
  return (
    <BlockSection block={block} style={getHeroSectionStyle(minHeight)}>
      <div style={{ display: "grid", gap: "1.75rem" }}>
        {renderTextContent(block.title, block.subtitle, block.ctaText, block.ctaLink)}
        {block.imageUrl && (
          <div>
            <img src={block.imageUrl} alt={block.title ?? ""} style={imageStyle} />
          </div>
        )}
      </div>
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
