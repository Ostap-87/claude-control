import {
  Composition,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  AbsoluteFill,
} from "remotion";

export type ArticleAnnounceProps = {
  eyebrow: string;
  title: string;
  excerpt: string;
  siteUrl: string;
  accentColor: string;
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
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

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

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#ffffff",
        opacity: outOpacity,
        fontFamily:
          "Inter, ui-sans-serif, system-ui, -apple-system, sans-serif",
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
          color: "#17171d",
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
          color: "#45454e",
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
  );
};
