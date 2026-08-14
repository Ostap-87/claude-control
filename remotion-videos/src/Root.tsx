import "./index.css";
import { MyComposition } from "./Composition";
import { ArticleAnnounceComposition } from "./ArticleAnnounce";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <MyComposition />
      <ArticleAnnounceComposition />
    </>
  );
};
