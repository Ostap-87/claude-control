import { CalculateMetadataFunction, Composition, useCurrentFrame, interpolate, AbsoluteFill } from "remotion";

type Props = {
  title: string;
};

const calculateMetadata: CalculateMetadataFunction<Props> = () => {
  return {};
};

export const MyComposition = () => {
  return (
    <Composition
      id="MyComp"
      component={MyComponent}
      durationInFrames={90}
      fps={30}
      width={1080}
      height={1080}
      calculateMetadata={calculateMetadata}
      defaultProps={{ title: "Привет из Remotion" }}
    />
  );
};

export const MyComponent: React.FC<Props> = ({ title }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: "clamp" });
  const scale = interpolate(frame, [0, 30], [0.8, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0f172a",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1
        style={{
          opacity,
          transform: `scale(${scale})`,
          fontSize: 70,
          fontFamily: "sans-serif",
          color: "white",
          textAlign: "center",
          padding: "0 60px",
        }}
      >
        {title}
      </h1>
    </AbsoluteFill>
  );
};
