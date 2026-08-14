import {
  Composition,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  AbsoluteFill,
  Img,
  staticFile,
} from "remotion";

export type ArticleAnnounceProps = {
  eyebrow: string;
  title: string;
  excerpt: string;
  siteUrl: string;
  accentColor: string;
  /** Filename under public/logos/ (e.g. "huawei.svg"). Resolved via staticFile() internally — pass just the filename, not a path. Optional. */
  logoFile?: string;
  /** Remote https URL for a real article cover image. Optional — falls back to plain brand background. */
  coverSrc?: string;
};

export const ArticleAnnounceComposition = () => {
  return (
    <Composition
      id="ArticleAnnounce"
      component={ArticleAnnounce}
      durationInFrames={210}
      fps={30}
      width={1080}
      height={1080}
      defaultProps={{
        eyebrow: "GlobalTechTour — новая статья",
        title:
          "Huawei возвращается: как складные смартфоны и Mate 80 меняют расклад на мировом рынке",
        excerpt:
          "Huawei — единственный крупный игрок, который в 2026 году показывает рост продаж смартфонов, а не падение. Доля 20% в Китае, 48% мирового рынка складных телефонов.",
        siteUrl: "globaltechtour.ru",
        accentColor: "#2563eb",
        logoFile: "huawei.svg",
        coverSrc: undefined,
      } satisfies ArticleAnnounceProps}
    />
  );
};

// GTT brand palette (from sinotech/src/index.css):
// void #ffffff · bone-white #17171d · ash-gray #6b6b76 · silver-mist #45454e
// electric-iris #2563eb · saffron-spark #b45309 · surface #eeeef2
export const ArticleAnnounce: React.FC<ArticleAnnounceProps> = ({
  eyebrow,
  title,
  excerpt,
  siteUrl,
  accentColor,
  logoFile,
  coverSrc,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // staticFile() must be called with a literal-looking path inside the
  // component for Remotion to allow serving it — a raw path string handed
  // in via --props (even an identical one) is rejected as unsafe.
  const logoSrc = logoFile ? staticFile(`logos/${logoFile}`) : undefined;

  const logoOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const barWidth = spring({ frame, fps, config: { damping: 200 } });

  const eyebrowOpacity = interpolate(frame, [10, 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const titleProgress = spring({
    frame: frame - 20,
    fps,
    config: { damping: 200 },
  });
  const titleOpacity = interpolate(frame, [20, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const titleY = interpolate(titleProgress, [0, 1], [24, 0]);

  const excerptOpacity = interpolate(frame, [45, 65], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const ctaFrame = frame - 90;
  const ctaOpacity = interpolate(ctaFrame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const ctaScale = spring({
    frame: ctaFrame,
    fps,
    config: { damping: 12, stiffness: 140 },
  });

  const outOpacity = interpolate(
    frame,
    [durationInFrames - 20, durationInFrames],
    [1, 0.94],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const textColor = coverSrc ? "#ffffff" : "#17171d";
  const excerptColor = coverSrc ? "rgba(255,255,255,0.85)" : "#45454e";

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#ffffff",
        opacity: outOpacity,
        fontFamily:
          "Inter, ui-sans-serif, system-ui, -apple-system, sans-serif",
      }}
    >
      {coverSrc ? (
        <>
          <Img
            src={coverSrc}
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
          {/* darken the photo so white title/excerpt text stays legible */}
          <AbsoluteFill
            style={{
              background:
                "linear-gradient(180deg, rgba(15,23,42,0.35) 0%, rgba(15,23,42,0.75) 100%)",
            }}
          />
        </>
      ) : null}

      <AbsoluteFill
        style={{
          padding: "100px 90px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
      {/* accent bar, top-left — mirrors the site's single blue accent */}
      <div
        style={{
          width: 64 * barWidth,
          height: 8,
          backgroundColor: accentColor,
          borderRadius: 4,
          marginBottom: 40,
        }}
      />

      <div
        style={{
          opacity: eyebrowOpacity,
          color: accentColor,
          fontSize: 30,
          fontWeight: 600,
          letterSpacing: "-0.01em",
          marginBottom: 28,
        }}
      >
        {eyebrow}
      </div>

      <div
        style={{
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
          color: textColor,
          fontSize: 64,
          fontWeight: 600,
          letterSpacing: "-0.03em",
          lineHeight: 1.12,
          marginBottom: 36,
        }}
      >
        {title}
      </div>

      <div
        style={{
          opacity: excerptOpacity,
          color: excerptColor,
          fontSize: 32,
          lineHeight: 1.5,
          maxWidth: 820,
        }}
      >
        {excerpt}
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 90,
          left: 90,
          opacity: ctaOpacity,
          transform: `scale(${ctaScale})`,
          transformOrigin: "left center",
          display: "flex",
          alignItems: "center",
          gap: 16,
        }}
      >
        <div
          style={{
            backgroundColor: accentColor,
            color: "#ffffff",
            fontSize: 30,
            fontWeight: 600,
            padding: "18px 32px",
            borderRadius: 999,
          }}
        >
          {siteUrl}
        </div>
      </div>
      </AbsoluteFill>

      {logoSrc ? (
        <div
          style={{
            position: "absolute",
            top: 90,
            right: 90,
            opacity: logoOpacity,
            width: 96,
            height: 96,
            borderRadius: 20,
            backgroundColor: "#eeeef2",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 18,
          }}
        >
          <Img
            src={logoSrc}
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        </div>
      ) : null}
    </AbsoluteFill>
  );
};
